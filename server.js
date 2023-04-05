const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const public = path.join(__dirname, "./public");
app.use(express.static(public));
// Using a body parser 
app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json())

// Basic routing
app.get("/", (req, res) => {
    res.send("Welcome To the landing page");
})
app.get("/ems", (req, res) => {
    res.render("index");
})

app.use("/emp", require("./routes/employee"))
app.use("/admin", require("./routes/admin"))

// app.set('view engine', 'hbs');

//Setting up a server
const port = 3000;

app.listen(port, (err) => {
    if(err) console.log(err);
    console.log(`Server running on port ${port}...`);
})
