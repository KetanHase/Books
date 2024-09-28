import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Box,
  Link,
  TextField,
  Container,
} from '@mui/material';
import axios from 'axios'; // Import axios for making HTTP requests

const HeroSection: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // State to hold the email input
  const [error, setError] = useState<string | null>(null); // State for error message
  const [success, setSuccess] = useState<string | null>(null); // State for success message

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value); // Update the email state
  };

  const handleSubmit = async () => {
    setError(null); // Reset error state
    setSuccess(null); // Reset success state

    try {
      const response = await axios.post(`http://localhost:8081/contacts`, { email });
      console.log('response.data.message',response.data.message);
      setSuccess(response.data.message); // Set success message
      setEmail(''); // Clear the email input
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.error); // Set error message from the response
      } else {
        setError('Failed to submit message.'); // General error message
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#f0f7ff',
          py: { xs: 4, md: 8 },
          px: { xs: 2, md: 0 },
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', color: '#343a40', mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}
        >
          Our latest <span style={{ color: '#007bff' }}>Books</span>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#6c757d',
            mb: 4,
            maxWidth: '600px',
            fontSize: { xs: '14px', sm: '16px', md: '18px' },
          }}
        >
          Explore our Book, delivering high-quality  to your needs. R:18No:20.16e4.19c2.8mate:5xa:3.2,8..2. Elevate your
          experience with top-tier features and services 
        </Typography>

        {/* Email Input and Button */}
        <Container maxWidth="sm">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={8} md={8}>
              <TextField
                fullWidth
                placeholder="Your email address"
                variant="outlined"
                size="small"
                name='email'
                value={email} // Set the value of the TextField to the state
                onChange={handleEmailChange} // Update state on change
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit} // Call handleSubmit on button click
                sx={{
                  backgroundColor: '#007bff',
                  color: '#fff',
                  height: '100%',
                  fontSize: { xs: '12px', md: '16px' },
                }}
              >
                START NOW
              </Button>
            </Grid>
          </Grid>

          {/* Error and Success Messages */}
          {error && (
            <Typography variant="caption" sx={{ color: 'red', mt: 2, display: 'block' }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography variant="caption" sx={{ color: 'green', mt: 2, display: 'block' }}>
              {success}
            </Typography>
          )}

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
    </>
  );
};

export default HeroSection;
