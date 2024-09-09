import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Link } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#f8f9fa', color: '#343a40', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 'bold', fontSize: '24px', display: 'inline-block', color: '#007bff' }}
          >
            Sitemark
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link href="#" underline="none" color="inherit" sx={{ fontSize: '16px' }}>
            Features
          </Link>
          <Link href="#" underline="none" color="inherit" sx={{ fontSize: '16px' }}>
            Testimonials
          </Link>
          <Link href="#" underline="none" color="inherit" sx={{ fontSize: '16px' }}>
            Highlights
          </Link>
          <Link href="#" underline="none" color="inherit" sx={{ fontSize: '16px' }}>
            Pricing
          </Link>
          <Link href="#" underline="none" color="inherit" sx={{ fontSize: '16px' }}>
            FAQ
          </Link>
          <Link href="#" underline="none" color="inherit" sx={{ fontSize: '16px' }}>
            Blog
          </Link>
        </Box>

        {/* Sign In and Sign Up buttons */}
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Button variant="text" sx={{ color: '#007bff', fontSize: '16px' }}>
            Sign In
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#007bff', color: '#fff', fontSize: '16px' }}>
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
