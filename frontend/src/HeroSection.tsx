import React from 'react';
import {
  Grid,
  Typography,
  Button,
  Box,
  Link,
  TextField,
  Container,
} from '@mui/material';
 

const HeroSection: React.FC = () => {
    return (
      <>
            <Box
            sx={{
            backgroundColor: '#f0f7ff',
            py: { xs: 4, md: 8 }, // Adjust padding for different devices
            px: { xs: 2, md: 0 }, // Padding for small devices
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            }}
            >
            <Typography
            variant="h4" // Adjust font size
            sx={{ fontWeight: 'bold', color: '#343a40', mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}
            >
            Our latest <span style={{ color: '#007bff' }}>products</span>
            </Typography>
            <Typography
            variant="body1"
            sx={{
                color: '#6c757d',
                mb: 4,
                maxWidth: '600px', // Max width for text on larger screens
                fontSize: { xs: '14px', sm: '16px', md: '18px' }, // Responsive font size
            }}
            >
            Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your needs. Elevate your
            experience with top-tier features and services.
            </Typography>

            {/* Email Input and Button */}
            <Container maxWidth="sm">
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={8} md={8}>
                <TextField fullWidth placeholder="Your email address" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    height: '100%',
                    fontSize: { xs: '12px', md: '16px' }, // Responsive button text size
                    }}
                >
                    START NOW
                </Button>
                </Grid>
            </Grid>
            <Typography variant="caption" sx={{ color: '#6c757d', mt: 2, display: 'block' }}>
                By clicking "Start now" you agree to our{' '}
                <Link href="#" sx={{ textDecoration: 'underline' }}>
                Terms & Conditions
                </Link>
                .
            </Typography>
            </Container>
            </Box>

            {/* Modal Data */} 
             
            <Box
            sx={{
            backgroundColor: '#f0f7ff',
            py: { xs: 4, md: 8 }, // Adjust padding for different devices
            px: { xs: 2, md: 0 }, // Padding for small devices
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            }}
            >
            <Typography
            variant="h4" // Adjust font size
            sx={{ fontWeight: 'bold', color: '#343a40', mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}
            >
            Our latest <span style={{ color: '#007bff' }}>products</span>
            </Typography>
            <Typography
            variant="body1"
            sx={{
                color: '#6c757d',
                mb: 4,
                maxWidth: '600px', // Max width for text on larger screens
                fontSize: { xs: '14px', sm: '16px', md: '18px' }, // Responsive font size
            }}
            >
            Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your needs. Elevate your
            experience with top-tier features and services.
            </Typography>

            {/* Email Input and Button */}
            <Container maxWidth="sm">
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={8} md={8}>
                <TextField fullWidth placeholder="Your email address" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    height: '100%',
                    fontSize: { xs: '12px', md: '16px' }, // Responsive button text size
                    }}
                >
                    START NOW
                </Button>
                </Grid>
            </Grid>
            <Typography variant="caption" sx={{ color: '#6c757d', mt: 2, display: 'block' }}>
                By clicking "Start now" you agree to our{' '}
                <Link href="#" sx={{ textDecoration: 'underline' }}>
                Terms & Conditions
                </Link>
                .
            </Typography>
            </Container>
            </Box>

            <Box
            sx={{
            backgroundColor: '#f0f7ff',
            py: { xs: 4, md: 8 }, // Adjust padding for different devices
            px: { xs: 2, md: 0 }, // Padding for small devices
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            }}
            >
            <Typography
            variant="h4" // Adjust font size
            sx={{ fontWeight: 'bold', color: '#343a40', mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}
            >
            Our latest <span style={{ color: '#007bff' }}>products</span>
            </Typography>
            <Typography
            variant="body1"
            sx={{
                color: '#6c757d',
                mb: 4,
                maxWidth: '600px', // Max width for text on larger screens
                fontSize: { xs: '14px', sm: '16px', md: '18px' }, // Responsive font size
            }}
            >
            Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your needs. Elevate your
            experience with top-tier features and services.
            </Typography>

            {/* Email Input and Button */}
            <Container maxWidth="sm">
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={8} md={8}>
                <TextField fullWidth placeholder="Your email address" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    height: '100%',
                    fontSize: { xs: '12px', md: '16px' }, // Responsive button text size
                    }}
                >
                    START NOW
                </Button>
                </Grid>
            </Grid>
            <Typography variant="caption" sx={{ color: '#6c757d', mt: 2, display: 'block' }}>
                By clicking "Start now" you agree to our{' '}
                <Link href="#" sx={{ textDecoration: 'underline' }}>
                Terms & Conditions
                </Link>
                .
            </Typography>
            </Container>
            </Box>

      </>
  );
};

export default HeroSection;
