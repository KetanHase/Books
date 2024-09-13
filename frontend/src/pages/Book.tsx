import React, { useEffect, useState }  from 'react';
 
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
 
import BookList from '../components/BookList';
import BookDetail from '../components/BookDetail';
import axios from 'axios';

interface User {
  id: number;
  username: string;
}

const Book: React.FC = () => {
  //const userId = 1;  // Replace this with the actual logged-in user's ID
  //const username = "";
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios
      .get('http://localhost:8081/check-session', { withCredentials: true })
      .then((response) => {
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
        setLoading(false); // Once the session is checked, stop loading
      });
  }, []);
  const addToCart = (book: any) => {
    if (user) {
    axios.post('http://localhost:8081/cart/add', {
      userId: user.id,   // Pass the actual userId
      bookId: book.id,
      quantity: 1,
    })
    .then(() => {
      console.log('Book added to cart');
    })
    .catch((error) => {
      console.error('Error adding book to cart:', error);
    });
  }
  };
  if (!user) {
    return <div>Loading...</div>; // Show loading state while user data is fetched
  }
  return (
    <>
      {/* Navbar */}
      <Navbar userId={user.id}  username={user.username} loggedIn={loggedIn} />
      {/* Hero Section */}
     
     {/* Book Card Section */}
     
     {/* Footer Section */}

     <BookList userId={user.id} addToCart={addToCart}  />
     <BookDetail />
    <Footer />
   
    </>
  );
};

export default Book;
