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
const unfinished = (req, res) => {
    let {id} = req.params;
    let tasks = `SELECT * FROM tasks WHERE tasks.user_id = '${id}' AND tasks.status_id = 1`
    conn.query(tasks, (err, result) => {
        if (err){
            console.log(err)
        }else{
            res.status(200).json(result);
        }
    })
}

const finished = (req, res) => {
    let {id} = req.params;
    console.log(id)
    let tasks = `SELECT * FROM tasks WHERE tasks.user_id = '${id}' AND tasks.status_id = 2`
    conn.query(tasks, (err, result) => {
        if (err){
            console.log(err)
        }else{
            res.status(200).json(result);
        }
    })
}
const notifications = (req, res) => {
    res.status(200).json({
        notifications: "notifications"
    })
}

const all_participants = (req, res) => {
    let all_part = `SELECT users.*, department.name FROM users INNER JOIN department ON users.dep_id = department.id;`
    conn.query(all_part, (err, result) => {
        if (err){
            console.log(err)
        }else{
            res.status(200).json(result);
        }
    })
}

const dep_participants = (req, res) => {
    let dep_id = req.params.id
    console.log(dep_id)
    let dep_part = `SELECT * FROM users WHERE users.dep_id = ${dep_id};`
    conn.query(dep_part, (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.status(200).json(result);
            console.log(result)
        }
    })
}

const settings = (req, res) => {
    res.status(200).json({
        settings: "Settings"
    })
}

// Exporting the function variables
module.exports = {
    unfinished, finished, notifications, all_participants, dep_participants, settings
};