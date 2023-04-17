const express = require("express");
const app = express();
const cors = require("cors")
const path = require("path");
const bodyParser = require("body-parser");
const { Console } = require("console");

// Using a body parser 
app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json())
app.use(cors())

const dotenv = require("dotenv")
dotenv.config()
// console.log(process.env)

// Basic routing
app.get("/", (req, res) => {
    res.status(200).sendFile("index.html");
})

app.use("/ems", require("./routes/employee"))

app.use("/auth", require("./routes/auth_route"));
app.use("/emp", require("./routes/employee"))
app.use("/admin", require("./routes/admin"))
app.use("/test", require("./routes/auth"))

//Setting up a server
const port = process.env.PORT;

app.listen(port, (err) => {
    if(err) console.log(err);
    console.log(`Server running on port ${port}...`);
})
