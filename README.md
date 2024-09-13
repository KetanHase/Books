# Book
Book Store


//BookList page after login at add to cart

export default BookList;

import React, { useEffect, useState } from 'react';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCartData } from './hooks'; // Assume useCartData is a custom hook

const CartButton: React.FC<{ userId: number }> = ({ userId }) => {
  const [cartCount, setCartCount] = useState<number>(0);
  const { cartItems } = useCartData(userId);

  useEffect(() => {
    if (userId) {
      // Fetch cart items from the server if user is logged in
      setCartCount(cartItems.length);
    } else {
      // Get cart items from local storage if user is not logged in
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    }
  }, [userId, cartItems]);

  return (
    <IconButton href='/cart'>
      <Badge badgeContent={cartCount} color="secondary">
        <ShoppingCartOutlinedIcon />
      </Badge>
    </IconButton>
  );
};

export default CartButton;