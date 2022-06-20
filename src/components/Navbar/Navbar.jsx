import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import myInfo from '../../queries/myInfo'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  logo_container: {
    height: '68.5px',
  },
  logo: {
    height: '100%',
    marginBottom: '10px'
  }
}));

const pages = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Profesores', href: '/teachers' },
  ];

const pagesLogOut = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Teacher Register', href: '/register/teacher' },
  { id: 3, name: 'Student Register', href: '/register/student' },
  { id: 4, name: 'Login', href: '/login' },
  ];
const teacherSettings = ['Profile', 'Logout'];

const studentSettings = ['Calendario', 'Logout'];

const ResponsiveAppBar = () => {
  const classes = useStyles()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [logged, setLogged] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(localStorage.getItem('access-token') || null);

  React.useEffect(() => {
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [token]);

  React.useEffect(() => {
    if (token) {
      myInfo().then((val) => {
        setUser(val);
      });
    } else {
      setUser(null);
    }
  }, [token]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenu = (setting) => {
    console.log(setting);
    switch (setting) {
      case 'Profile':
        window.location.href = '/teacher/' + user.id;
        break
      case 'Calendario':
        window.location.href = '/mycalendar/';
        break
      case 'Logout':
        logout()
        window.location.href = '/login'
        break
      default:
        break;
    }
  };

  const logout = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('is_student');
    setUser(null);
  };

  const handleHref = (href) => {
    window.location.href = href;
  };

  return (
    <AppBar position="static">
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <IconButton className = {classes.logo_container} onClick={() => handleHref('/')}>
              <img src={'../img/logo4.png'} alt="logo" className={classes.logo}/>
          </IconButton>
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
              {user ? (
              pages.map((page) => (
                <MenuItem key={page.id} onClick={() => handleHref(page.href) }>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))) : (
                pagesLogOut.map((page) => (
                  <MenuItem key={page.id} onClick={() => handleHref(page.href) }>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
                )))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {user ? (
              pages.map((page) => (
                <Button
                key={page.id}
                onClick={handleCloseNavMenu}
                href={page.href}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
              ))) : (
                pagesLogOut.map((page) => (
                  <Button
                key={page.id}
                onClick={handleCloseNavMenu}
                href={page.href}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
                )))}
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
            {user && (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={(!!user && user.picture) || 'http://127.0.0.1:8000/media/posts/default.png'} />
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
                  {user.is_teacher ? (
                    teacherSettings.map((setting) => (
                      <MenuItem key={setting} onClick={() => handleUserMenu(setting)}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))
                  ) : (
                    studentSettings.map((setting) => (
                      <MenuItem key={setting} onClick={() => handleUserMenu(setting)}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))
                  )}
                </Menu>
            </>)}
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
