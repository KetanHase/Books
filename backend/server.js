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
