const { json } = require("body-parser");
const mysql = require("mysql");

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

const home = (req,res) => {
    res.render("admin/adm_home");
}
const projects = (req,res) => {
    res.send("Welcome to projects");
}
const reports = (req,res) => {
    res.send("Welcome to reports");
}
const tasks = (req,res) => {
    let tasks = `SELECT * FROM tasks`
    conn.query(tasks, (err, result) => {
        if (err){
            console.log(err)
        }else{
            res.status(200).json({
                user_details: req.user,
                all_tasks: result
            });
        }
    })
}
const update = (req, res) => {
    var id = req.params.id
    var {title, description, deadline, status} = req.body
    if(!status){
        res.status(400).json({ error: "All fields must be filled"})
    }
    conn.query(`SELECT id FROM status WHERE name = '${status}'`, async (err, result) => {
        const returned = await result[0].id
        console.log(returned)
        if(err){
            console.log(err)
        }else if(!title || !description || !deadline || !status){
            res.status(400).json({ error: "All fields must be filled"})
        }else if(result.length === 0){
            res.status(400).json({ error: "Status not found"})
        }else{
            let update = `UPDATE tasks SET title ='${title}', description='${description}', deadline='${deadline}', status_id='${returned}' WHERE task_id='${id}'`
            conn.query(update, (err, results) => {
                if(err){
                    throw err
                }else{
                    res.status(200).json({ message: "Task updated"})
                }
            })
        }
    })
}
const settings = (req,res) => {
    res.send("Welcome to settings");
}
const departments = (req, res) => {
    let sql = `SELECT name FROM department`
    conn.query(sql, (err, result) => {
        const all_departments = result
        if (err){
            console.log(err)
        }else{
            res.status(200).json({
                all_departments: all_departments
            });
        }
    })
}

const all_users = (req, res) => {
    // console.log("You are here")
    // let sql = `SELECT username FROM users`
    conn.query(`SELECT username FROM users`, (err, result) => {
        console.log(result)
    //     const returned = result
    //     if(err){
    //         console.log(err)
    //     }
        res.status(200).json({all: result})
    })
}

const dep_users = (req, res) => {
    const department_name = req.params.dep
    let sql = `SELECT id FROM department WHERE name = '${department_name}'`
    conn.query(sql, (err, result) => {
        const returned_id = result[0].id

        if(err){
            console.log(err)
        }else{
            conn.query(`SELECT username FROM users WHERE dep_id = '${returned_id}'`, (err, results) => {
                console.log(results)
                if(err){
                    console.log(err)
                }else{
                    res.status(200).json({
                        all_users: results
                    })
                }
            })
        }
    })
}

const add_task = (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let deadline = req.body.deadline;
    let status = req.body.status;
    let assignee = req.body.assignee;
    conn.query(`SELECT id FROM users WHERE username= '${assignee}'`, (err, result) => {
        if(err){
            console.log(err)
        }else if(result < 1){
            console.log("User not found");
            res.status(400).json({
                error: "user not found"
            })
        }else{
            let user_id = result[0]
            let sql = `INSERT INTO tasks (title, description, deadline, status, user_id) values ('${title}', '${description}', '${deadline}', '${status}', '${dep_id.id}')`
            conn.query(sql, (err, result) => {
                if(err){
                    console.log(err);
                }else{
                    res.send("Task added");
                }
            })
        }
    })
}

module.exports = {
    home,
    projects,
    reports,
    tasks,
    update,
    departments,
    dep_users,
    all_users,
    settings,
    add_task
}