import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, TextField, Button, Typography, Breadcrumbs, Link, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
 
import { Category } from '../interfaces/Category';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

interface AddProProps {
  category?: Partial<Category> | null ;   
  handleClose: () => void;
}


const AddCategory: React.FC<AddProProps> = ({ category, handleClose }) => {
  const [formData, setFormData] = useState<Partial<Category>>({});
  
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, [category]);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8081/categories`+id)
        .then(response => 
          setFormData(response.data.formData))
        .catch(error => console.error("There was an error fetching the Category!", error));
    }
  }, [id]);

   
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

   // console.log('id')

    if (formData.id) {
     
      axios.put(`http://localhost:8081/category/update/${formData.id}`, formData)
        .then((res) => {
          window.location.reload();
          alert('category updated successfully:');
          console.log('category updated successfully:', res);
          //navigate('/book');
          window.location.href = '/category';
          handleClose();   
        })
        .catch(error => {
          console.error("There was an error updating the category!", error);
        });
    } else {
      
      axios.post('http://localhost:8081/category/create', formData)
        .then((res) => {
          window.location.reload();
          console.log('category added successfully:', res);
          navigate('/category');
          handleClose();   
        })
        .catch(error => {
          console.error("There was an error adding the category!", error);
        });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

   

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 6 }}>
        <Grid item>
          <Typography variant="h6" gutterBottom>
            {id ? "Update Category" : "Add Category"}
          </Typography>
        </Grid>
        <Grid item>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link underline="hover" color="inherit" href="/">
              Category
            </Link>
            <Link underline="hover" color="inherit" href="/category">
              List
            </Link>
            <Typography color="text.primary">{id ? "Update" : "Create"}</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
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

export default AddCategory;
