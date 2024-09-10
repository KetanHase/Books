import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
 
import BookList from '../components/BookList';
import Cart from '../components/Cart';

interface User {
  id: number;
  username: string;
}

const LandingPage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get('http://localhost:8081/check-session', { withCredentials: true })
      .then(response => {
        setLoggedIn(response.data.loggedIn);
        if (response.data.user) {
          setUser(response.data.user as User);
        }
      })
      .catch(() => {
        setLoggedIn(false);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);  // Once the session is checked, stop loading
      });
  }, []);

  // Only proceed if the user is logged in
  if (loading) {
    return <div>Loading...</div>;  // Or any loading spinner
  }

  if (!loggedIn) {
    return <div>Please log in to access this page.</div>;
  }

  // Ensure user data is available before using it
  const userId = user ? user.id : 1;  // Replace 1 with a fallback if necessary

  const addToCart = (book: any) => {
    axios.post('http://localhost:8081/cart/add', {
      userId: userId,  // Pass the actual userId
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
       <HeroSection />
        {/* Book card Section */}
        <BookList userId={userId} addToCart={addToCart}  />
         
     {/* Footer Section */}
    <Footer />
   
    </>
  );
};

export default LandingPage;