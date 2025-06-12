import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import SchoolIcon from '@mui/icons-material/School';
import "@/app/ui/Assets/Css/admin/AppBar.css"
import React from 'react';  
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import NotificationMenu from '../Teacher/NotifecationsMenu';
// import logo from "@/app/ui/Assets/Css/BOSSLA.png"


function ResponsiveAppBar() {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const data =[
      {title : "Categories" , href : "/dashboard/admin/categories" },
      {title : "Students" , href : "/dashboard/admin/students" },
      {title : "Teachers" , href : "/dashboard/admin/teachers"},
      {title : "Courses" , href : "/dashboard/admin/courses"},
      {title : "Specilizations" , href : "/dashboard/admin/specilizations"},
      {title : "Support" , href : "/dashboard/admin/support"},
    ]
  
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  
  // const [image , setImage] =React.useState("");

  return (
    <AppBar position="static" className='app-bar'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                {data.map((e , i)=>{
                  return(
                    <MenuItem key={i}>
                        <Link  href={e.href} className={clsx(
                          'not-active-item',
                          {
                            'active-item': pathname.match(e.href),
                          })}>{e.title}</Link>
                    </MenuItem>
                  )
                })}
            </Menu>
          </Box>
          <SchoolIcon sx={{ display: { xs: 'flex' }, mr: 1 }} style={{ color: "#ef6603" }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            className='title-appBar'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CAMPESS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
              <NotificationMenu role='admin' />
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Admin" src={"http://localhost:3000/Admin.png"} />
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
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;