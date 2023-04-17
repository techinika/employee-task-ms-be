const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const path = require("path")
const mysql = require("mysql");


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
const login = (req, res) => {
    // const hashedPassword = '$2a$10$abc123...';
    // const userPassword = "12345"


const username = req.body.username;
const password = req.body.password;

const user_pass_hashed = bcrypt.hashSync(password,10)
console.log(user_pass_hashed)

const sql = 'SELECT password FROM users WHERE username = ?';
conn.query(sql, [username], (err, result) => {
    if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    } else if (result.length === 0) {
        res.status(401).send('Username not found');
    } else {
        const hashedPassword = result[0].password;
        console.log(hashedPassword)
        const passwordMatch = bcrypt.compareSync(password.trim(), hashedPassword);    
        if (passwordMatch) {
            res.send('Login successful');
        } else {
            res.status(401).send('Incorrect password');
        }
    }
});

  // Compare the user input password to the hashed password
  

//     let sql = `SELECT password FROM users WHERE username= '${username}'`;
//     conn.query(sql, async (err, result) => {
//         let returned = await result[0];
//         console.log(returned)
//         // const match = await bcrypt.compare(password, returned.password)
//         // const pass = "12345"
//         // const hashedpass = await bcrypt.hash(pass, 8)
//         // if(await bcrypt.compare("12345", hashedpass)){
//         //     console.log("Valid password")
//         // }else{
//         //     console.log("Invalid password")
//         // }
//         if(err){
//             res.status(200).json({
//                 error: "User not found"
//             })
//         }else if(!username || !password){
//             res.status(400).json({
//                 error: "All fields must be filled"
//             })
//         }else if(!returned){
//             console.log("No such user found in database");
//             res.status(200).json({
//                 error: "No such user found in database"
//             });
//         }else if(await bcrypt.compare(password, returned.password)){
//             console.log("Welcome", returned.username)
//             const access_token = jwt.sign({
//                 user: {
//                     firstname: returned.firstname,
//                     lastname: returned.lastname,
//                     username: returned.username,
//                     email: returned.email,
//                     dep_id: returned.dep_id
//                 },
//             }, process.env.ACCESS_TOKEN_SECRET,
//             {
//                 expiresIn: "20m"
//             }
//             )
//             res.status(200).json({ access_token })
//         }else{
//             res.status(200).json({
//                 error: "Invalid passord"
//             })
//         }
//     })
}

const register = async (req, res) => {
    const {firstname, lastname, username, email, password, department} = await req.body;
    const hashed_password = await bcrypt.hashSync(password, 10)

    console.log(firstname, lastname, username, email, password, department)
    conn.query(`SELECT email, username FROM users WHERE username='${username}'`, async (err, result) => {
        const returned = await result[0];
        // console.log(returned.email)
        if(err){
            console.log(err);
        }else if(!firstname || !lastname || !username || !email || !password || !department){
            res.status(200).json({
                error: "All fields must be filled"
            })
        }else if(!returned){
            conn.query(`SELECT id FROM department WHERE name= '${department}'`, (err, result) => {
            if(err){
                console.log(err)
            }else if(result){
                console.log(result[0].id)
                const dep_id = result[0].id
                conn.query(`INSERT INTO users (firstname, lastname, username, email, password, dep_id) VALUES ('${firstname}', '${lastname}', '${username}', '${email}', '${hashed_password}', '${dep_id}')`, (err, result) => {
                    if(err){
                        console.log(err)
                    }else if(result){
                        res.status(200).json({
                            message: "User registered"
                        })
                        console.log(result)
                    }
                })
            }else{
                    res.status(400).json({
                        error: "No such department in database"
                    })
                }
                // const dep_id = result[0].id;
                // module.exports = dep_id;
                // return(result[0].id)
            })
        }else if(returned.username.length > 0){
            res.status(400).json({
                message: "Username already in use"
            });
            console.log(returned.username)
        }
    })

}
module.exports = {
    login,
    register
}