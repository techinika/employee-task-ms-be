const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const { literal } = require("sequelize");

//Creating connection
const conn = mysql.createConnection({
    host: process.env.LOCAL_HOST,
    user: process.env.ROOT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

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
            res.status(200).json({
                user_details: req.user,
                unfinished: result
            });
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
            res.status(200).json({user_details: req.user, finished: result});
        }
    })
}

const update = (req,res) => {
    let task_id = req.params.id;
    console.log(task_id)
    let status_id = req.body.status_id
    if(status_id == 1){
        conn.query(`UPDATE tasks SET status_id='2' WHERE task_id = ${task_id}`, (err, result) => {
            if (err){
                res.status(200).json({ error: err})
            }else{
                res.status(200).json({ new_id: '2'})
            }
        })
    }else{
        conn.query(`UPDATE tasks SET status_id='1' WHERE task_id = ${task_id}`, (err, result) => {
            if (err){
                res.status(200).json({ error: err})
            }else{
                res.status(200).json({ new_id: '1'})
            }
        })
    }
}

const notifications = (req, res) => {
    res.status(200).json({
        user_details: req.user,
        notifications: "notifications"
    })
}

const all_participants = (req, res) => {
    // console.log(req.user)
    console.log("All participants")
    let all_part = `SELECT users.*, department.name FROM users INNER JOIN department ON users.dep_id = department.id;`
    conn.query(all_part, (err, result) => {
        if (err){
            console.log(err)
        }else{
            res.status(200).json({user_details: req.user, participants: result});
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
            res.status(200).json({user_details: req.user, dep_participants: result});
            console.log(result)
        }
    })
}

const settings = (req, res) => {
    res.status(200).json({
        user_details: req.user,
        settings: "Settings"
    })
}

// Exporting the function variables
module.exports = {
    unfinished, finished, update, notifications, all_participants, dep_participants, settings
};