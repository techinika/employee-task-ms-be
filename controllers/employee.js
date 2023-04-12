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
    let {id} = req.params;
    console.log(id)
    // let password = req.body.password;
    // let user = {username: `${username}`, password: `${password}`};
    let tasks = `SELECT * FROM tasks WHERE tasks.user_id = '${id}' AND tasks.status_id = 1`
    // let finished = `SELECT * FROM tasks WHERE tasks.user_id = '${id}' AND tasks.status_id = 2`
    conn.query(tasks, (err, result) => {
        if (err){
            console.log(err)
        }else{
            // console.log(req.body);
            res.status(200).json(result);
            console.log(result)
        }
    })
    // res.json("index");
}
const notifications = (req, res) => {
    res.status(200).json({
        notifications: "notifications"
    })
}
const participants = (req, res) => {
    res.status(200).json({
        participants: "Participants"
    })
}
const settings = (req, res) => {
    res.status(200).json({
        settings: "Settings"
    })
}

// Exporting the function variables
module.exports = {
    home, notifications, participants, settings
};