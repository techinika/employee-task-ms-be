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
    res.send("Welcome to tasks");
}
const settings = (req,res) => {
    res.send("Welcome to settings");
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
            res.render("admin/adm_home")
        }else if(result < 1){
            console.log("User not found");
            res.render("admin/adm_home", {
                message: "user not found"
            })
        }else{
            let user_id = result[0]
            console.log(user_id.id);
            let sql = `INSERT INTO tasks (title, description, deadline, status, user_id) values ('${title}', '${description}', '${deadline}', '${status}', '${dep_id.id}')`
            conn.query(sql, (err, result) => {
                if(err){
                    console.log(err);
                    console.log(req.body);
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
    settings,
    add_task
}