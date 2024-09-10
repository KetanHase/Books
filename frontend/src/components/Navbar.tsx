import React,{useState} from 'react';
import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  Button,
  Drawer,
  Box,
  Link,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
 
 

const LandingPage: React.FC = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
      };

  return (
    <>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ backgroundColor: '#DDE1E5', 
                                    color: '#343a40', 
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 'bold', fontSize: '24px', color: '#007bff', display: 'inline-block' }}
          >
            Book Store
          </Typography>

          {/* Navigation Links */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' }, // Hide links on small screens, show on medium and above
              gap: '20px',
              alignItems: 'center',
            }}
          >
            <Link href="/" underline="none" color="inherit" sx={{ fontSize: '16px' }}>
              Home
            </Link>
            <Link href="/book" underline="none" color="inherit" sx={{ fontSize: '16px' }}>
              Book
            </Link>
            <Link href="#" underline="none" color="inherit" sx={{ fontSize: '16px' }}>
              About
            </Link>
            <Link href="#" underline="none" color="inherit" sx={{ fontSize: '16px' }}>
              Contact
            </Link>
            <Link href="#" underline="none" color="inherit" sx={{ fontSize: '16px' }}>
              FAQ
            </Link>
            <Link href="#" underline="none" color="inherit" sx={{ fontSize: '16px' }}>
              Blog
            </Link>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }} // Show menu icon on mobile screens only
          >
            <MenuIcon />
          </IconButton>

          {/* Sign In and Sign Up buttons */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '10px' }}>
             <IconButton href='/cart'>
             <Badge badgeContent={2} color="secondary">
              <ShoppingCartOutlinedIcon />
              </Badge>
              </IconButton>
            <Button variant="outlined" href="/login" size="small" sx={{ backgroundColor: '#', color: '#', fontSize: '12px' ,'&:hover': {
                    backgroundColor: '#0056b3',  
                    color: '#fff'  
                } }}>
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
       
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton href="/">
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href="/book">
                <ListItemText primary="Book" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="About" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="FAQ" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Blog" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      {/* Hero Section */}
    
    </>
  );
};

export default LandingPage;
