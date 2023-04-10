// const express = require("express");
const bcrypt = require("bcryptjs");
const mysql = require("mysql");

//Creating connection
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login_signup"
});

// Connecting function
conn.connect((err) => {
    if (err) console.log("Connection made successfully");
})

// Retrieving Data from database
const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let sql = `SELECT * FROM users WHERE username= '${username}' AND password= '${password}'`;
    conn.query(sql, async (err, result) => {
        if(err){
            res.status(200).render("index", {
                message: "User not found"
            })
        }else if(result < 1){
            console.log("Invalid username or password");
            res.status(200).render("index", {
                message: "Invalid username or password"
            });
        }else{
            let returned = await result[0];
            let returned_username = returned.username;
            console.log("Welcome", returned_username)
            return res.status(200).render("employee/emp_home", {returned});
        }
    })
}
module.exports = {
    login
}