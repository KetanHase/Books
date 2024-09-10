import React, { useState }  from 'react';
 
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
 
import BookList from '../components/BookList';
import BookDetail from '../components/BookDetail';
import axios from 'axios';

 

const Book: React.FC = () => {
  const userId = 1;  // Replace this with the actual logged-in user's ID

  const addToCart = (book: any) => {
    axios.post('http://localhost:8081/cart/add', {
      userId: userId,   // Pass the actual userId
      bookId: book.id,
      quantity: 1,
    })
    .then(() => {
      console.log('Book added to cart');
    })
    .catch((error) => {
      console.error('Error adding book to cart:', error);
    });
  };
  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
     
     {/* Book Card Section */}
     
     {/* Footer Section */}

     <BookList userId={userId} addToCart={addToCart}  />
     <BookDetail />
    <Footer />
   
    </>
  );
};

export default Book;
