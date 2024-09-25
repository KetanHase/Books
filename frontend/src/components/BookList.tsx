import React, { useEffect, useState } from 'react';
import { Card, CardContent, SelectChangeEvent, CardActions, Button, Typography, Container, Grid, Box, Snackbar, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
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
  price_category: string;  
  category_id: number;
  language: string;
}

interface Category {
  id: number;
  name: string;
}
const languages = ['English', 'Spanish', 'French', 'German']; // Example languages
const BookList: React.FC<BookListProps> = ({ userId }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | string>('all');
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  useEffect(() => {
    axios.get('http://localhost:8081/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error("Error fetching categories", error));
    fetchBooks();
  }, []);

  const fetchBooks = (categoryId: number | string = 'all',language: string = '') => {
    let url = 'http://localhost:8081/';
    if (categoryId !== 'all') {
      url = `http://localhost:8081/book/category/${categoryId}`;
    }
    if (language) {
      url += `?language=${language}`; // Assuming you have a query parameter for language
    }
    axios.get(url)
      .then(response => setBooks(response.data))
      .catch(error => console.error("Error fetching books", error));
  };

  const handleCategoryChange = (event: SelectChangeEvent<number | string>) => {
    const categoryId = event.target.value as number | string;
    setSelectedCategory(categoryId);
    fetchBooks(categoryId);
  };

  const addToCart = (book: Book) => {
    if (userId === 0) {
      alert("Please log in to add items to your cart.");
      return;
    }
    axios.post('http://localhost:8081/cart/add', {
      userId: userId,
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
    setSnackbarOpen(false);
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    fetchBooks(selectedCategory, language);
  };

  const filteredBooks = books.filter(book => {
    const categoryMatch = selectedCategory === 'all' || book.category_id === selectedCategory;
    const priceMatch = filterCategory ? book.price_category === filterCategory : true;
    const languageMatch = selectedLanguage ? book.language === selectedLanguage : true;
    return categoryMatch && priceMatch && languageMatch;
  });
  const formControlStyles = {
    mt: { xs: 2, sm: 3 },
    mb: { xs: 3, sm: 5 },
    mr: { xs: 3, sm: 5 },
    width: { xs: '100%', sm: '60%', md: '25%' },
    mx: 'auto',
     
  };
  
  return (
    <Box sx={{ mt: 5, mb: 5, px: { xs: 2, sm: 4, md: 6 } }}>
      <Typography variant="h4" sx={{ mt: 2, mb: 3, textAlign: 'center' }}>
        Books
      </Typography>

      
<FormControl size="small" sx={formControlStyles}>
  <Typography variant='h6'>Select Category</Typography>
  <Select value={selectedCategory} onChange={handleCategoryChange}>
    <MenuItem value="all">All Categories</MenuItem>
    {categories.map((category) => (
      <MenuItem key={category.id} value={category.id}>
        {category.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

<FormControl size="small" sx={formControlStyles}>
  <Typography variant='h6'>Sort By Price</Typography>
  <Select
    value={filterCategory}
    onChange={(e) => setFilterCategory(e.target.value)}
    displayEmpty
  >
    <MenuItem value="">All Prices</MenuItem>
    <MenuItem value="Low">Low</MenuItem>
    <MenuItem value="Medium">Medium</MenuItem>
    <MenuItem value="High">High</MenuItem>
  </Select>
</FormControl>

<FormControl size="small" sx={formControlStyles}>
  <Typography variant='h6'>Select Language</Typography>
  <Select value={selectedLanguage} onChange={handleLanguageChange}>
    <MenuItem value="">All Languages</MenuItem>
    {languages.map((language, index) => (
      <MenuItem key={index} value={language}>
        {language}
      </MenuItem>
    ))}
  </Select>
</FormControl>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4} justifyContent="center">
          {filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'transform 0.1s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <img
                  src={`http://localhost:8081/uploads/${book.imageFile}`}
                  alt={book.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px',
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {book.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: Rs {book.price}
                  </Typography>
                  <Typography variant="h6" component="div" gutterBottom>
                    {book.author}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" color="warning" sx={{mr: 2}} onClick={() => addToCart(book)}  >
                    Add to cart
                  </Button>
                  <Button size="small" variant="contained" color="info"  onClick={() => addToCart(book)}  >
                       Quick View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Item added to cart successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookList;
