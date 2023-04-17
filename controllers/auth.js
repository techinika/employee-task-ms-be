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


    function checkPassword(userPassword, hashedPassword) {
        bcrypt.compare(userPassword, hashedPassword.toString, function(err, res) {
          if (err) {
            console.error('Error comparing passwords:', err);
            return false;
          }
          if (res) {
            console.log('Passwords match');
            return true;
          } else {
            console.log('Passwords do not match');
            return false;
          }
        });
      }
      
      // Test the function with sample data
      const userPassword = '12345';
      const hashedPassword = bcrypt.hash('12345', 8); // Replace with your hashed password
      const new_password = toString(hashedPassword)
      console.log(new_password)
      
      checkPassword(userPassword, new_password);

    // conn.query(`SELECT password FROM users WHERE username = ${username}`, function (error, results, fields){
    //     if(error) throw error;
    //     const hashed_password = bcrypt.hash("12345", 8);
    //     // console.log(hashed_password)

    //     bcrypt.compare("12345", hashed_password, function (err,res){

    //         if(res){
    //             console.log("Password match");
    //         }else{
    //             console.log("password doesn't match");
    //         }
    //     })
    // })
//     const username = req.body.username;
//     const password = req.body.password;

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
    const hashed_password = await bcrypt.hash(password, 8)

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

    // conn.query(`SELECT username FROM users WHERE username= '${username}'`, (err, result) => {
    //     if(err){
    //         console.log(err)
    //     }else if(result.length > 0){
    //         res.status(400).json({
    //             message: "Username already in use"
    //         });
    //     }
    // });

    // conn.query(`SELECT id FROM department WHERE name= '${department}'`, (err, result) => {
    //     if(err){
    //         console.log(err)
    //     }else if(result){
    //         console.log(result[0].id)
    //         const dep_id = result[0].id
    //         conn.query(`INSERT INTO users (firstname, lastname, username, email, password, dep_id) VALUES ('${firstname}', '${lastname}', '${username}', '${email}', '${hashed_password}', '${dep_id}')`, (err, result) => {
    //             if(err){
    //                 console.log(err)
    //             }else{
    //                 res.status(200).json({
    //                     message: "User registered"
    //                 })
    //             }
    //         })
    //     }else{
    //         res.status(400).json({
    //             error: "No such department in database"
    //         })
    //     }
    //     // const dep_id = result[0].id;
    //     // module.exports = dep_id;
    //     // return(result[0].id)
    // })
    
    // conn.query(`INSERT INTO users (firstname, lastname, username, email, password, dep_id) VALUES ('${firstname}', '${lastname}', '${username}', '${email}', '${hashed_password}', '${dep_id}')`, (err, result) => {
    //     if(err){
    //         console.log(err)
    //     }else{
    //         res.status(200).json({
    //             message: "User registered"
    //         })
    //     }
    // })

    // const username_exists = await conn.query(`SELECT username FROM users WHERE username= '${username}'`, (err,result) => {
    //     if(result){
    //         console.log(result[0].username);
    //     }
    //     return (result[0].username)
    // })
    // const {dep_exists} = await conn.query(`SELECT id FROM department WHERE name= '${department}'`, (err, result) => {
    //     if(err){
    //         console.log(err)
    //     }
    //     if(result[0].id < 1){
    //         res.status(400).json({
    //             error: "No such department found"
    //         })
    //         return
    //     }else{
    //         console.log(result[0].id)
    //         return result[0].id
    //     }
        
    // })
    // // const dep_id = department_id[0];
    // // const dep_id = dep_exists
    // console.log(dep_exists)
    // const new_user = {
    //     firstname: firstname, 
    //     lastname: lastname, 
    //     username: username, 
    //     email: email, 
    //     password: hashed_password, 
    //     dep_id: department
    // }
    // // console.log()
    // if(!firstname || !lastname || !username || !email || !password || !department){
    //     res.status(400).json({error: "All fields must be filled"})
    // }else if(email_exists > 0){
    //     res.status(400).json({error: "Email already exists"})
    // }else if(username_exists > 0){
    //     res.status(400).json({error: "Username already exists"})
    // }else{
    //     conn.query(`SELECT id FROM department WHERE name= '${department}'`, (err, result) => {
    //         if(err){
    //             console.log(err)
    //         }else if(result < 1){
    //             console.log("User not found");
    //             res.json({
    //                 message: "Department not found"
    //             })
    //         }else{
    //             // let dep_id = result[0]
    //             const dep_id = result[0].id
    //             console.log(dep_id);
    //             let sql = `INSERT INTO users (firstname, lastname, username, email, password, dep_id) VALUES ('${firstname}', '${lastname}', '${username}', '${email}', '${hashed_password}', '${dep_id}')`
    //             conn.query(sql, (err, result) => {
    //                 if(err){
    //                     console.log(err);
    //                     // console.log(req.body);
    //                 }else{
    //                     res.status(200).json({
    //                         message: "User registered successfully"
    //                     })
    //                 }
    //             })
    //         }
    //     })
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
    // }
}
module.exports = {
    login,
    register
}