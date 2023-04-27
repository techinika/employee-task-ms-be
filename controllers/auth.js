const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const path = require("path")
const mysql = require("mysql");
const requser = require("../middleware/validate_token");


//Creating connection
const conn = mysql.createConnection({
    host: process.env.LOCAL_HOST,
    user: process.env.ROOT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// Connecting function
conn.connect((err) => {
    if (err) console.log("Connection made successfully");
})

// Retrieving Data from database
// 
//NEW LOGIN AND CHECK PASSWORD MATCH USING BCRYPTJS
const login = (req, res) => {
    // My codes
    const username = req.body.username;
    const password = req.body.password;

    let sql = `SELECT * FROM users WHERE username= '${username}'`;
    conn.query(sql, async (err, result) => {
        const user_details = result.user
        console.log(result)
        if (err) {
            res.status(200).json({
                error: "User not found"
            });
        } else if (!username || !password) {
            res.status(400).json({
                error: "All fields must be filled"
            });
        } else if (result.length === 0) {
            console.log("No such user found in database");
            res.status(200).json({
                error: "No such user found in database"
            });
        } else {
            const { id, firstname, lastname, username, email, password: hashedPassword, dep_id } = result[0];
            bcrypt.compare(password, hashedPassword, function(err, result) {
                if(result === true) {
                    console.log("Welcome", username);
                    
                    const access_token = jwt.sign({
                        user: {
                            id,
                            firstname,
                            lastname,
                            username,
                            email,
                            dep_id
                        },
                    }, process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "200m"
                    });
                    // console.log(req.user)
                    conn.query(`SELECT name FROM department WHERE id = ${dep_id}`, (err, results) => {
                        const returned = results[0]
                        const returned_department = returned.name
                        if(err){
                            console.log(err)
                        }else{
                            res.status(200).json({ 
                                token: access_token,
                                id: dep_id,
                                user_id: id,
                                department: returned_department 
                            })
                        }
                    })
                } else {
                    console.log("Invalid password");
                    res.status(200).json({
                        error: "Invalid password"
                    });
                }
            });
        }
    })
}

//END OF NEW LOGIN AND START OF REGISTER
const register = async (req, res) => {
    const {firstname, lastname, username, email, password, department} = await req.body;
    const hashed_password = await bcrypt.hash(password, 8)
    console.log(hashed_password)
    console.log(firstname, lastname, username, email, password, department)
    conn.query(`SELECT email FROM users WHERE email= '${email}'`, (err, result) => {
        const returned = result;
        if(err){
            console.log(err);
        }else if(!firstname || !lastname || !username || !email || !password || !department){
            res.status(400).json({
                error: "All fields must be filled"
            })
        }else if(returned.length > 0){
            res.status(400).json({
                error: "Email already in use"
            })
            process.exit()
        }
    })

    conn.query(`SELECT username FROM users WHERE username= '${username}'`, (err, result) => {
        if(err){
            console.log(err)
        }else if(result.length > 0){
            res.status(400).json({
                message: "Username already in use"
            });
            process.exit()
        }
    });

    conn.query(`SELECT id FROM department WHERE name= '${department}'`, (err, result) => {
        if(err){
            console.log(err)
        }else if(result){
            console.log(result[0])
            const returned = result[0]
            const dep_id = returned.id
            conn.query(`INSERT INTO users (firstname, lastname, username, email, password, dep_id) VALUES ('${firstname}', '${lastname}', '${username}', '${email}', '${hashed_password}', '${dep_id}')`, (err, result) => {
                if(err){
                    console.log(err)
                }else{
                    res.status(200).json({
                        message: "User registered"
                    })
                }
            })
        }else{
            res.status(400).json({
                error: "No such department in database"
            })
        }
    })
}
module.exports = {
    login,
    register
}