import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Container, Grid, Box, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

interface BookListProps {
  userId: number;
  addToCart: (book: Book) => void;
}
interface Book {
  id: number;
  name: string;
  price: number;
  author: string;
  stock: number;
}

const BookList: React.FC<BookListProps> = ({ userId }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(response => setBooks(response.data))
      .catch(error => console.error("There was an error fetching the books!", error));
  }, []);

  const addToCart = (book: Book) => {
    axios.post('http://localhost:8081/cart/add', {
      userId: userId, // Replace with logged-in user's ID
      bookId: book.id,
      quantity: 1,
    })
    .then(() => {
      setSnackbarOpen(true);
      console.log('Book added to cart');
    })
    .catch(error => {
      console.error('Error adding book to cart:', error);
    });
  };
  
  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false); // Close snackbar
  };


  return (
    <Box>
      <Typography variant="h4" sx={{ mt:2 }}>Books</Typography>
      <Container sx={{ mt:3 }}>
        <Grid container spacing={3} justifyContent="center">
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <Card sx={{ mb:5 }}>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {book.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: Rs{book.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" color="warning" onClick={() => addToCart(book)}>
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Automatically hide after 3 seconds
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position at top-right
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Item added to cart successfully!
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default BookList;
