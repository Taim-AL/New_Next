import { useEffect, useState } from 'react';
import { Menu, MenuItem, Badge, IconButton, Typography } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useAuth } from '@/app/context/auth-context';
import Axios from '@/app/lib/axios';
import '@/app/ui/Assets/Css/teacher/Navbar.css';
import { NotificationType } from '@/app/lib/definitions';

declare global {
  interface Window {
    Pusher: any;
  }
}

if (typeof window !== 'undefined') {
  window.Pusher = Pusher;
}

const echo = typeof window !== 'undefined'
  ? new Echo({
      broadcaster: 'reverb',
      key: 'ekirn3ywd4clcyuvklgr',
      wsHost: 'localhost',
      wsPort: 8080,
      wssPort: 8080,
      forceTLS: false,
      disableStats: true,
      enabledTransports: ['ws'],
    })
  : null;

export default function NotificationMenu({role} : {role : string}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const { id } = useAuth();

  useEffect(() => {
    Axios.get(`/${role}/notifications`).then((response) => {
      if (response.data.success) {
        setNotifications(response.data.data);
      }
    });
    const storedUnreadCount = localStorage.getItem('unreadCount');
    if (storedUnreadCount) setUnreadCount(Number(storedUnreadCount));
  }, []);

  useEffect(() => {
    if (!echo || !id) return;

    const channel = echo.channel(`${role}.${id}`);

    channel.listen(`.${role}.message`, (e: any) => {
      console.log("New Event:", e);
      const message = e.message;
      const updatedNotifications = [message, ...notifications];
      const updatedUnreadCount = unreadCount + 1;

      setNotifications(updatedNotifications);
      setUnreadCount(updatedUnreadCount);

      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      localStorage.setItem('unreadCount', String(updatedUnreadCount));
    });

    return () => {
      echo.leave(`${role}.${id}`);
    };
  }, [id, notifications, unreadCount]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setUnreadCount(0);
    localStorage.setItem('unreadCount', '0');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" style={{marginRight:"1rem"}} onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsNoneIcon className="icon-nav" />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: '45px' }}
      >
        {notifications.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2" color="textSecondary">
              لا توجد إشعارات
            </Typography>
          </MenuItem>
        ) : (
          notifications.slice(0, 5).map((notif, idx) => (
            <MenuItem key={idx}>
              <Typography variant="body2" color="primary">{notif.title}</Typography>
              <Typography variant="body2">{notif.body}</Typography>
            </MenuItem>
          ))
        )}
        {notifications.length > 5 && (
          <MenuItem onClick={() => alert('عرض المزيد من الإشعارات')}>
            <Typography color="primary">عرض الكل</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
