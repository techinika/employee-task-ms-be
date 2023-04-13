const bcrypt = require("bcryptjs");
const path = require("path")
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
            res.status(200).json({
                message: "User not found"
            })
        }else if(result < 1){
            console.log("Invalid username or password");
            res.status(200).json({
                message: "Invalid username or password"
            });
        }else{
            let returned = await result[0];
            let returned_username = await returned.username;
            console.log("Welcome", returned_username)
            res.status(200).json({
                returned
            })
        }
    })
}

const register = async (req, res) => {
    const {firstname, lastname, username, email, password, department} = await req.body;
    const hashed_password = await bcrypt.hash(password, 8)
    console.log(hashed_password)
    const email_exists = await conn.query(`SELECT email FROM users WHERE email= '${email}'`, (err,result) => {
        if(result){
            console.log(result[0].email);
        }
        return(result[0].email)
    })
    const username_exists = await conn.query(`SELECT username FROM users WHERE username= '${username}'`, (err,result) => {
        if(result){
            console.log(result[0].username);
        }
        return (result[0].username)
    })
    const {dep_exists} = await conn.query(`SELECT id FROM department WHERE name= '${department}'`, (err, result) => {
        if(err){
            console.log(err)
        }
        if(result[0].id < 1){
            res.status(400).json({
                error: "No such department found"
            })
            return
        }else{
            console.log(result[0].id)
            return result[0].id
        }
        
    })
    // const dep_id = department_id[0];
    // const dep_id = dep_exists
    console.log(dep_exists)
    const new_user = {
        firstname: firstname, 
        lastname: lastname, 
        username: username, 
        email: email, 
        password: hashed_password, 
        dep_id: department
    }
    // console.log()
    if(!firstname || !lastname || !username || !email || !password || !department){
        res.status(400).json({error: "All fields must be filled"})
    }else if(email_exists > 0){
        res.status(400).json({error: "Email already exists"})
    }else if(username_exists > 0){
        res.status(400).json({error: "Username already exists"})
    }else{
        conn.query(`SELECT id FROM department WHERE name= '${department}'`, (err, result) => {
            if(err){
                console.log(err)
            }else if(result < 1){
                console.log("User not found");
                res.json({
                    message: "Department not found"
                })
            }else{
                // let dep_id = result[0]
                const dep_id = result[0].id
                console.log(dep_id);
                let sql = `INSERT INTO users (firstname, lastname, username, email, password, dep_id) VALUES ('${firstname}', '${lastname}', '${username}', '${email}', '${hashed_password}', '${dep_id}')`
                conn.query(sql, (err, result) => {
                    if(err){
                        console.log(err);
                        // console.log(req.body);
                    }else{
                        res.status(200).json({
                            message: "User registered successfully"
                        })
                    }
                })
            }
        })
        // conn.query(`INSERT INTO users (firstname, lastname, username, email, password, dep_id) VALUES ('${firstname}', '${lastname}', '${username}', '${email}', '${hashed_password}', '${dep_id}'`, (err, result) => {
        //     if(err){
        //         console.log(err)
        //     }else{
        //         res.status(200).json({
        //             message: "User registered successfully"
        //         })
        //     }
        // })
        // res.status(200).json({message: "User registered dsuccessfully"})
    }
}
module.exports = {
    login,
    register
}