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
    // let username = req.body.username;
    // let password = req.body.password;
    // // let user = {username: `${username}`, password: `${password}`};
    // conn.query(`SELECT * FROM users WHERE username= '${username}' AND password= '${password}'`, (err, result) => {
    //     if (err){
    //         console.log(err)
    //     }else{
    //         // console.log(req.body);
    //         res.status(200).render(result);
    //         console.log(result)
    //     }
    // })
    res.render("index");
}
const notifications = (req, res) => {
    res.status(200).render("employee/emp_notif")
}
const participants = (req, res) => {
    res.status(200).render("employee/emp_part")
}
const settings = (req, res) => {
    res.status(200).render("employee/emp_setting")
}

// Exporting the function variables
module.exports = {
    home, notifications, participants, settings
};