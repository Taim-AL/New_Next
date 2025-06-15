import React, { useEffect, useState } from 'react';
import '@/app/ui/Assets/Css/teacher/Navbar.css';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import logo from "@/app/ui/Assets/Css/BOSSLA.png";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Avatar } from '@mui/material';
import { useAuth } from '@/app/context/auth-context';
import { ProfileUrl } from '@/app/lib/definitions';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Axios from '@/app/lib/axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NotificationMenu from './NotifecationsMenu';



function Navbar() {
    const {image} = useAuth();
    const imageUrl = ProfileUrl + image;
    const [hasMounted, setHasMounted] = useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [anchorElNoti, setAnchorElNoti] = React.useState<null | HTMLElement>(null);
    const router = useRouter();
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
      };
      const handleOpenNotiMenue = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNoti(event.currentTarget);
      };

      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
      const handleCloseNotiMenue = () => {
        setAnchorElNoti(null);
      };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleLogout = async ()=>{
        try{
          await Axios.get('/teacher/logout' ).then(response =>{
            console.log(response)
            router.push("/login");
        })}catch(error){
          console.log(error)
        }
  
      }

    return ( 
        <>       
        {/* <div className="shadow "> */}
            <Row className='mx-0 NavbarTh fixed-top'>
                <Col lg='6' md='6' xs='6' className='logo-container'>
                    <Image className="icon-outerNav " src={logo} alt='campess'/>
                    <h3 className='navbar-logo '> <span className='span1'>Gen</span>Scan</h3>
                </Col>
                
                <Col lg='6' md='6' xs='6' className='buttons-container'>
                    <Box sx={{ flexGrow: 0 }}>
                        <NotificationMenu role='teacher'/>
                        {/* <Tooltip title="Open Notifications">
                        <IconButton onClick={handleOpenNotiMenue} sx={{ p: 0 , marginRight: '1rem' }}>
                            <NotificationsNoneIcon className="icon-nav"/>
                        </IconButton>
                        </Tooltip> */}
                        
                    </Box>
                    {/* <Avatar className='user-avatar'>OP</Avatar> */}
                       {/* <Avatar className='user-avatar' alt="T" src={ image ?String(imageUrl):""} /> */}
                
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            {hasMounted &&<Avatar className='user-avatar' alt="Remy Sharp" src={ image ?String(imageUrl):""} />}
                        </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        <MenuItem >
                            <Link href={`teacher/profile`} className='logout_button' title='Profile'>
                                Profile
                            </Link>
                        </MenuItem>
                        <MenuItem  onClick={handleLogout}>
                            <button className='logout_button' title='Logout'>
                                Logout
                            </button>
                        </MenuItem>

                        </Menu>
                    </Box>


                </Col>
            </Row>
            {/* </div> */}
            <div className="h-40 mb-5">..</div>
        </> 
     );
}

export default Navbar;