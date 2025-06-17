import React, { useEffect, useState } from 'react';
import '@/app/ui/Assets/Css/student/Navbar.css';
import {Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import logo from "@/app/ui/Assets/Css/BOSSLA.png";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Avatar } from '@mui/material';
import { useAuth } from '@/app/context/auth-context';
import { BaseUrl } from '@/app/lib/definitions';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Axios from '@/app/lib/axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SearchSt from './StudentSearch';
import NotificationMenu from '../Teacher/NotifecationsMenu';


function NavbarSt() {
    const {image , points} = useAuth();
    // const imageUrl = BaseUrl + image;
    const [hasMounted, setHasMounted] = useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const router = useRouter();
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
      };

      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleLogout = async ()=>{
        try{
          await Axios.get('/student/logout' ).then(response =>{
            console.log(response)
            router.push("/login");
        })}catch(error){
          console.log(error)
        }
  
      }

    return ( 
        <>       
            <Row className='mx-0 NavbarSt '>
                <Col lg='4' md='4' xs='6' className='logo-containerSt'>
                    <Image className="icon-outerNavSt " src={logo} alt='campess'/>
                    <h3 className='navbar-logoSt '> <span className='span1St'>Gen</span>Scan</h3>
                </Col>
                <Col lg='4' md='4' xs='6' className='search-containerSt '>
                    <SearchSt />
                </Col>
                <Col lg='4' md='4' xs='12' className='buttons-containerSt'>
                    <p className='pointsSt'>{hasMounted ?points : ""}</p>
                    <button title='points' className="button-navbarSt">
                        <AutoAwesomeIcon className="icon-navSt"/>
                    </button>
                    {/* <button title='notifacations' className="button-navbarSt">  
                        <NotificationsNoneIcon className="icon-navSt"/>
                    </button> */}
                    <Box sx={{ flexGrow: 0 }}>
                        <NotificationMenu role='student' />
                    </Box>
                    {/* <Avatar className='user-avatar'>OP</Avatar> */}
                       {/* <Avatar className='user-avatar' alt="T" src={ image ?String(imageUrl):""} /> */}
                
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            {hasMounted &&<Avatar className='user-avatarSt' alt="Remy Sharp" src={ image ?image:""} />}
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
                            <Link href={`student/profile`} className='logout_buttonSt' title='Profile'>
                                Profile
                            </Link>
                        </MenuItem>
                        <MenuItem  onClick={handleLogout}>
                            <button className='logout_buttonSt' title='Logout'>
                                Logout
                            </button>
                        </MenuItem>

                        </Menu>
                    </Box>


                </Col>
            </Row>
        </> 
     );
}

export default NavbarSt;