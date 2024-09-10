import React, { useState } from 'react';
import axios from 'axios';
import { Typography, Button, CircularProgress, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

const Checkout = () => {
  const [isOrdering, setIsOrdering] = useState<boolean>(false);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const userId = 1; // Replace this with the actual logged-in user's ID

  const handleOrder = async () => {
    setIsOrdering(true);
    setOrderStatus(null);

    try {
      // Step 1: Place the order
      await axios.post('http://localhost:8081/order/place', { userId });

      // Step 2: Clear the cart
      await axios.post(`http://localhost:8081/cart/clear/${userId}`);

      setOrderStatus('Order placed and cart cleared successfully.');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error placing order or clearing cart:', error);
      setOrderStatus('Error placing order or clearing cart.');
      setOpenSnackbar(true);
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Button 
        variant="contained" 
        onClick={handleOrder} 
        disabled={isOrdering}
      >
        {isOrdering ? <CircularProgress size={24} /> : 'Place Order'}
      </Button>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={orderStatus?.includes('Error') ? 'error' : 'success'}
        >
          {orderStatus}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Checkout;
