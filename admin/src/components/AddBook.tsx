import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, TextField, Button, Typography, Breadcrumbs, Link, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import { Book } from '../interfaces/Book';
import { Category } from '../interfaces/Category';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

interface AddProProps {
  book?: Partial<Book> | null ;   
  handleClose: () => void;
}


const AddPro: React.FC<AddProProps> = ({ book, handleClose }) => {
  const [formData, setFormData] = useState<Partial<Book>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8081/books`+id)
        .then(response => 
          setFormData(response.data.formData))
        .catch(error => console.error("There was an error fetching the book!", error));
    }
  }, [id]);

  useEffect(() => {
    axios.get('http://localhost:8081/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error("There was an error fetching categories!", error));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

   // console.log('id')

    if (formData.id) {
     
      axios.put(`http://localhost:8081/update/${formData.id}`, formData)
        .then((res) => {
          window.location.reload();
          alert('Book updated successfully:');
          console.log('Book updated successfully:', res);
          //navigate('/book');
          window.location.href = '/book';
          handleClose();   
        })
        .catch(error => {
          console.error("There was an error updating the book!", error);
        });
    } else {
      
      axios.post('http://localhost:8081/create', formData)
        .then((res) => {
          window.location.reload();
          console.log('Book added successfully:', res);
          navigate('/book');
          handleClose();   
        })
        .catch(error => {
          console.error("There was an error adding the book!", error);
        });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCategoryChange = (event: SelectChangeEvent<number>) => {
    setFormData({
      ...formData,
      category_id: Number(event.target.value),
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 6 }}>
        <Grid item>
          <Typography variant="h6" gutterBottom>
            {id ? "Update Book" : "Add Book"}
          </Typography>
        </Grid>
        <Grid item>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link underline="hover" color="inherit" href="/">
              Book
            </Link>
            <Link underline="hover" color="inherit" href="/book">
              List
            </Link>
            <Typography color="text.primary">{id ? "Update" : "Create"}</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="name"
                label="Name"
                name="name"
                variant="outlined"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="author"
                label="Author"
                name="author"
                variant="outlined"
                value={formData.author || ''}
                onChange={handleChange}
                placeholder="Enter Author name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="stock"
                name="stock"
                label="Stock"
                variant="outlined"
                value={formData.stock || ''}
                onChange={handleChange}
                placeholder="Stock"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="price"
                name="price"
                label="Price"
                variant="outlined"
                value={formData.price || ''}
                onChange={handleChange}
                placeholder="Price"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={formData.category_id || ''}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                {formData.id ? "Update" : "Add"}
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
}

export default AddPro;
