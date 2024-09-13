import React, { useEffect, useState } from 'react';
 
import { Card, CardContent,SelectChangeEvent , CardActions, Button, Typography, Container, Grid, Box, Snackbar, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
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
  imageFile: string;
}
interface Category {
  id: number;
  name: string;
}

const BookList: React.FC<BookListProps> = ({ userId }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | string>('all');

 {/*  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(response => setBooks(response.data))
      .catch(error => console.error("There was an error fetching the books!", error));
  }, []);*/}

  useEffect(() => {
    // Fetch all categories on component mount
    axios.get('http://localhost:8081/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error("Error fetching categories", error));

    // Initially fetch all books
    fetchBooks();
  }, []);

  const fetchBooks = (categoryId: number | string = 'all') => {
    let url = 'http://localhost:8081/';
    if (categoryId !== 'all') {
      url = `http://localhost:8081/book/category/${categoryId}`;
    }
    axios.get(url)
      .then(response => setBooks(response.data))
      .catch(error => console.error("Error fetching books", error));
  };

  const handleCategoryChange = (event: SelectChangeEvent<number | string>) => {
    const categoryId = event.target.value as number | string;
    setSelectedCategory(categoryId);
    fetchBooks(categoryId);  // Fetch books for the selected category
  };

  const addToCart = (book: Book) => {
    if (userId === 0) {
      alert("Please log in to add items to your cart.");
      return;
    }
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
      
      <FormControl fullWidth sx={{ mt: 3, mb: 3 }}>
        <InputLabel>Category</InputLabel>
        <Select value={selectedCategory} onChange={handleCategoryChange}>
          <MenuItem value="all">All Categories</MenuItem>
          {categories.map(category => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>


      <Container sx={{ mt:3 }}>
        <Grid container spacing={3} justifyContent="center">
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <Card sx={{ mb: 5, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <img
                  src={`http://localhost:8081/uploads/${book.imageFile}`} // Display the image
                  alt={book.name}
                  style={{
                    width: '100%',
                    height: '200px', // Set a fixed height or use `auto` to maintain aspect ratio
                    objectFit: 'fill', // Adjust to 'contain' or 'fill' if needed
                    borderRadius: '4px' // Optional: Adds rounded corners
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {book.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: Rs{book.price}
                  </Typography>
                  <Typography variant="h6" component="div" gutterBottom>
                    {book.author}
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
