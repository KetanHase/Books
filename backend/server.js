const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
 
const { getUserDetails, createUser ,updateUser ,deleteuser,getCategories} = require('./model/user');

const {UsersFetch,UserRegister,UserLogin,UserLogout,UserSession} = require('./model/login');
const {createCategory,updateCategory,deleteCategory} = require('./model/category');
const cartRoutes = require('./model/cart');


const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "book_store"
});

db.connect(err => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the MySQL database.");
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'admin',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,
        maxAge: 1000 * 60 * 30   // 1 hour
     }  // Set to true if using HTTPS
}));

//app.use('/api', cartRoutes);
//Book Route
app.get("/", getUserDetails);
app.post('/create',createUser); 
app.put('/update/:id',updateUser);
app.delete('/delete/:id',deleteuser);
app.get('/categories', getCategories);

//Login Route
app.get("/user", UsersFetch); 
app.post('/register',UserRegister);  
app.post('/login',UserLogin);
app.post('/logout',UserLogout);
app.get("/check-session", UserSession);


//Category Route
app.post('/category/create',createCategory); 
app.put('/category/update/:id',updateCategory);
app.delete('/category/delete/:id',deleteCategory);

app.post('/cart/add', (req, res) => {
    const { userId, bookId, quantity } = req.body;
    const query = `
      INSERT INTO cart (user_id, book_id, quantity)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + ?`;
  
    db.query(query, [userId, bookId, quantity, quantity], (err, result) => {
      if (err) {
        console.error('Error adding book to cart:', err);
        res.status(500).send('Error adding book to cart');
      } else {
        res.status(200).send('Book added to cart');
      }
    });
  });
  
  // Get cart details for a user
  app.get('/cart/:userId', (req, res) => {
    const userId = req.params.userId;
    
    const query = `
      SELECT c.user_id, b.id, b.name, b.price, c.quantity
      FROM cart c
      JOIN book b ON c.book_id = b.id
      WHERE c.user_id = ?`; 
  
    db.query(query, [userId], (err, results) => {
        if (err) {
          console.error('Error fetching cart data:', err);
          return res.status(500).json({ error: 'Error fetching cart data' });
        }

        if (results.length === 0) {
          return res.status(404).json({ cartItems: [], totalAmount: 0 });
        }

        const totalAmount = results.reduce((sum, item) => {
          const price = parseFloat(item.price);
          const quantity = parseInt(item.quantity, 10);
          if (isNaN(price) || isNaN(quantity)) {
            console.error(`Invalid price or quantity in cart: ${item}`);
            return sum; // Skip the item if price or quantity is invalid
          }
          return sum + price * quantity;
        }, 0);

        res.status(200).json({ cartItems: results, totalAmount });
    });
});

app.post('/cart/clear/:userId', (req, res) => {
    const userId = req.params.userId;
    
    // Define the SQL query to delete all items in the cart for the given user
    const query = 'DELETE FROM cart WHERE user_id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error clearing cart:', err);
            return res.status(500).json({ error: 'Error clearing cart' });
        }

        // Send a success response
        res.status(200).json({ message: 'Cart cleared successfully' });
    });
});

app.post('/cart/update', (req, res) => {
    const { bookId, quantity } = req.body;
  
    // Assuming you have a MySQL or similar query setup
    const sql = 'UPDATE cart SET quantity = ? WHERE book_id = ?';
    db.query(sql, [quantity, bookId], (err, result) => {
      if (err) {
        console.error('Error updating cart item:', err);
        return res.status(500).send('Error updating cart item');
      }
      res.send({ message: 'Quantity updated successfully' });
    });
  });

app.get('/books/:id', (req, res) => {
    const sql = "SELECT * FROM book WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data[0]);
    });
 });

app.listen(8081, () => {
    console.log("Server running on port 8081");
});
