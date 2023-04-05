const mysql = require("mysql");
const bcrypt = require("bcryptjs");

//Creating connection
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login_signup"
})

// Connecting to database
conn.connect((err) => {
    if(err) console.log(err, "Connection failed...");
    console.log("Conneted to database successfully...");
});

// Endpoints functions after /emp
const home = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    // let user = {username: `${username}`, password: `${password}`};
    conn.query(`SELECT * FROM users WHERE username= '${username}' AND password= '${password}'`, (err, result) => {
        if (err){
            console.log(err)
            res.status(200).send("User not found");
        }else{
            console.log(result)
            // console.log(req.body);
            res.status(200).send(`Welcome ${req.body.username} This is Employee home page`)
        }
    })
}
const notifications = (req, res) => {
    res.status(200).send("Welcome to notifications")
}
const participants = (req, res) => {
    res.status(200).send("Welcome to participants")
}
const settings = (req, res) => {
    res.status(200).send("Welcome to settings")
}

// Exporting the function variables
module.exports = {
    home, notifications, participants, settings
};