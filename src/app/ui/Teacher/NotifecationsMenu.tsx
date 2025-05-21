// NotificationMenu.tsx
import { useEffect, useState } from 'react';
import { Menu, MenuItem, Badge, IconButton, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000/teacher.1'); // استبدل بالرابط الصحيح

export default function NotificationMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // تحميل البيانات من localStorage عند البدء
  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    const storedUnreadCount = localStorage.getItem('unreadCount');

    if (storedNotifications) setNotifications(JSON.parse(storedNotifications));
    if (storedUnreadCount) setUnreadCount(Number(storedUnreadCount));
  }, []);

  useEffect(() => {
    // const audio = new Audio('/sounds/notification.mp3');

    socket.on('new-notification', (message: string) => {
      const updatedNotifications = [message, ...notifications];
      const updatedUnreadCount = unreadCount + 1;

      setNotifications(updatedNotifications);
      setUnreadCount(updatedUnreadCount);
    //   audio.play();

      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      localStorage.setItem('unreadCount', String(updatedUnreadCount));
    });

    return () => {
      socket.off('new-notification');
      socket.disconnect();
    };
  }, [notifications, unreadCount]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    // جعل كل الإشعارات مقروءة
    setUnreadCount(0);
    localStorage.setItem('unreadCount', '0');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: '45px' }}
      >
        {notifications.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2" color="textSecondary">لا توجد إشعارات</Typography>
          </MenuItem>
        ) : (
          notifications.slice(0, 5).map((notif, idx) => (
            <MenuItem key={idx}>
              <Typography variant="body2">{notif}</Typography>
            </MenuItem>
          ))
        )}
        {notifications.length > 5 && (
          <MenuItem onClick={() => alert("عرض المزيد من الإشعارات")}>
            <Typography color="primary">عرض الكل</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
