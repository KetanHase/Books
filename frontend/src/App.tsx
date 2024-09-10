import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import LandingPage from './pages/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Book from './pages/Book';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Orders from './components/Order';

interface User {
  id: number;
  username: string;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);  // Add loading state to wait for session check

  const navigate = useNavigate();

  // Check if user is logged in when app loads
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

  // Function to handle checkout
  const handleProceedToCheckout = () => {
    if (!loggedIn) {
      navigate('/login'); // Redirect to login if not logged in
    } else {
      navigate('/checkout'); // Proceed to checkout if logged in
    }
  };

  if (loading) {
    return <div>Loading...</div>;  // Render a loading state while checking session
  }

  return (
    <Routes>
      <Route path="/" element={ <LandingPage />} />
      <Route path="/login" element={loggedIn ? <Navigate to="/orders" /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/book" element={<Book />} />
      <Route path="/book/:id" element={<Book />} />
      
      {/* Pass the userId to the Cart component */}
      <Route
        path="/cart"
        element={loggedIn && user ? (
          <Cart userId={user.id} proceedToCheckout={handleProceedToCheckout} />
        ) : (
          <Navigate to="/login" />
        )}
      />

      <Route path="/checkout" element={loggedIn ? <Checkout /> : <Navigate to="/login" />} />
      <Route path="/orders" element={loggedIn ? <Orders user={user} /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
