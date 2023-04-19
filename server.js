const express = require("express");
const app = express();
const cors = require("cors")
const path = require("path");
const bodyParser = require("body-parser");
const { Console } = require("console");
// const validate_token = require("./middleware/validate_token");

// Using a body parser 
app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json())
app.use(cors())
// app.use(validate_token)

const dotenv = require("dotenv");
dotenv.config()
// console.log(process.env)

// Basic routing
app.get("/", (req, res) => {
    try {
        res.status(200).send("Home route")
    }catch (err){
        console.log(err)
    }
})
//NO middleware
app.use("/ems", require("./routes/employee"))

app.use("/auth", require("./routes/auth_route"));
app.use("/emp", require("./routes/employee"))
app.use("/admin", require("./routes/admin"))


//Setting up a server
const port = process.env.PORT;

app.listen(port, (err) => {
    if(err) console.log(err);
    console.log(`Server running on port ${port}...`);
})
