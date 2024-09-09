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

const createCategory = (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)";
    const values = [
        req.body.name
      
    ];
    db.query(sql, [values], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });   
};

const updateCategory = (req, res) => {
    const sql = "update category set `name` = ?  WHERE ID = ?";
    const values = [
        req.body.name
       
    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
 };

 const deleteCategory = (req, res) => {
    const sql = "DELETE FROM category WHERE id = ?";
  
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
 };

module.exports = { createCategory ,updateCategory,deleteCategory};