const mysql = require("mysql");

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

 

const getUserDetails = (req, res) => {
    const sql = "SELECT * FROM book";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
};

const createUser = (req, res) => {
    const sql = "INSERT INTO book (`name`, `author` ,`price` ,`stock`,`category_id`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.author,
        req.body.price,
        req.body.stock,
        req.body.category_id
    ];
    db.query(sql, [values], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });   
};

const updateUser = (req, res) => {
    const sql = "update book set `name` = ?, `author` = ?, `price` =?, `stock`= ?, `category_id`=?  WHERE ID = ?";
    const values = [
        req.body.name,
        req.body.author,
        req.body.price,
        req.body.stock,
        req.body.category_id
         
    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
 };
 
 const deleteuser = (req, res) => {
    const sql = "DELETE FROM book WHERE id = ?";
  
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
 };

 const getCategories = (req, res) => {
    const sql = "SELECT * FROM category";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ message: "Error fetching categories." });
        return res.status(200).json(data);
    });
};


module.exports = { getUserDetails ,createUser, updateUser, deleteuser,getCategories};