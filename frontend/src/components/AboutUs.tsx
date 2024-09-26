import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import BookStore from '../assets/book-store-1.jpg';

const AboutUs: React.FC = () => {
  return (
    <Container maxWidth="lg">
      {/* About Us Image */}
      <Box 
        sx={{ 
          mt:3,
          height: { xs: '200px', md: '400px' }, // Responsive height
          backgroundImage: `url(${BookStore})`,
          backgroundSize: 'cover', // Cover the entire box
          backgroundPosition: 'center',
          borderRadius: 1, // Rounded corners
          boxShadow: 2 // Add some shadow for depth
         
        }} 
      />
      
      {/* About Us Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to Our Bookstore! We are passionate about books and are dedicated to providing our
          customers with a wide selection of literary treasures. Our bookstore features a carefully
          curated collection of fiction, non-fiction, and specialty genres, ensuring there is something
          for everyone.
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          About Store
        </Typography>

        

        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
          Our knowledgeable staff is always on hand to assist you in finding your next great read and
          to provide recommendations based on your interests. We believe in fostering a love for reading
          within our community, and we frequently host events, author signings, and book clubs to engage
          with fellow book lovers.
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for supporting our local bookstore. We hope you enjoy your visit and find
          the perfect book to take home!
        </Typography>

        {/* Store Information Grid */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">Address:</Typography>
            <Typography variant="body2">Store Address</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">Phone:</Typography>
            <Typography variant="body2">9876544321</Typography>
          </Grid>
        </Grid>

      </Box>
    </Container>
  );
};

export default AboutUs;
