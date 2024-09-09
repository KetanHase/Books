import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import axios from 'axios';
 
 
import './index.css';
 
import Book from './pages/Book';

 
import Register from './pages/Registeruser';
import  Login  from './pages/LoginPage';
import  Category  from './pages/Category';


interface User {
    id: number;
    username: string;
}

const App: React.FC = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        axios.get('http://localhost:8081/check-session', { withCredentials: true })
            .then(response => {
                setLoggedIn(response.data.loggedIn);
                if (response.data.user) {
                    setUser(response.data.user as User);
                }
            })
            .catch(() => {
                // Session check failed; consider the user as not logged in
                setLoggedIn(false);
                setUser(null);
            });
    }, []);

    return (
        <Router>
            <Routes>
                
                <Route path="/" element={loggedIn ? <Navigate to="/dashboard" /> : <Login />} />
               {/* <Route path="/register" element={<Register />} /> */} 
                <Route path="/dashboard" element={loggedIn ? <Dashboard   /> : <Navigate to="/" />} />

                <Route path="/book" element={<Book /> } />
                <Route path="/category" element={<Category /> } />
                 
                 
            </Routes>
        </Router>
    );
};

export default App;
