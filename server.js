const express = require("express");
const app = express();
const cors = require("cors")
const path = require("path");
const bodyParser = require("body-parser");

// Using a body parser 
app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json())
app.use(cors())

// Basic routing
app.get("/", (req, res) => {
    res.status(200).sendFile("index.html");
})

app.use("/ems", require("./routes/employee"))

app.use("/auth", require("./routes/auth_route"));
app.use("/emp", require("./routes/employee"))
app.use("/admin", require("./routes/admin"))

//Setting up a server
const port = 3000;

app.listen(port, (err) => {
    if(err) console.log(err);
    console.log(`Server running on port ${port}...`);
})
