import React, { useEffect, useState } from 'react';
import {
  Button, Typography, List, ListItem, ListItemText, Grid, Box, Divider, IconButton, TextField
} from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  author: string; // Assuming you have author data
  image: string;  // Assuming you have an image URL
  discount: number; // Assuming you have a discount percentage
}

interface CartProps {
  userId: number;
  proceedToCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ userId, proceedToCheckout }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8081/cart/${userId}`)
      .then((response) => {
        setItems(response.data.cartItems);
        setTotalAmount(response.data.totalAmount);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  const handleRemove = (id: number) => {
    // Logic to remove item from cart
  };

  const handleWishlist = (id: number) => {
    // Logic to move item to wishlist
  };

  //const handleQuantityChange = (id: number, quantity: number) => {
    // Logic to handle quantity change
 // };
  const handleQuantityChange = (id: number, newQuantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(newQuantity, 1) } : item
      )
    );
    axios.post('http://localhost:8081/cart/update', {
      bookId: id,
      quantity: Math.max(newQuantity, 1),
    })
    .then((response) => {
      console.log('Quantity updated successfully:', response.data);
    })
    .catch((error) => {
      console.error('Error updating quantity in the database:', error);
    });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>Cart</Typography>
      {items.length === 0 ? (
        <Typography>No items in cart.</Typography>
      ) : (
        <List>
          {items.map((item) => (
            <ListItem key={item.id} divider>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <img src={item.image} alt={item.name} style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="textSecondary">By: {item.author}</Typography>
                  <Typography variant="body2" color="error">
                    ₹{item.price} <span style={{ textDecoration: 'line-through' }}>₹{item.price + (item.price * (item.discount / 100))}</span> 
                    <span style={{ color: 'green', marginLeft: '10px' }}>{item.discount}% OFF</span>
                  </Typography>
                  <Typography variant="body2">Total Price: ₹{item.price * item.quantity}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Box display="flex" alignItems="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <TextField
                      value={item.quantity}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { textAlign: 'center' } }}
                      style={{ width: '50px', margin: '0 10px' }}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => handleWishlist(item.id)}>
                    <FavoriteBorderIcon color="secondary" />
                    <Typography>Move to Wishlist</Typography>
                  </IconButton>
                  <IconButton onClick={() => handleRemove(item.id)}>
                    <DeleteIcon color="error" />
                    <Typography>Remove</Typography>
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      )}
      <Divider />
      <Grid container justifyContent="space-between" style={{ marginTop: '20px' }}>
        <Grid item xs={8}>
          <Typography>Total Items: {items.length}</Typography>
          <Typography variant="h6">Total Gross: ₹{totalAmount}</Typography>
          <Typography variant="h6">Amount Payable: ₹{totalAmount}</Typography>
        </Grid>
        <Grid item xs={4} style={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={proceedToCheckout}
          >
            Buy
          </Button>
        </Grid>
      </Grid>
      <Typography variant="body2" color="textSecondary" align="right" style={{ marginTop: '10px' }}>
        Shipping (India): Free | Ships within 18-20 days.
      </Typography>
    </Box>
  );
};

export default Cart;
