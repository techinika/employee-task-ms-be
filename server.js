const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");


const public = path.join(__dirname, "./public");
app.use(express.static(public));

// app.use(express.json())
app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json())


app.set('view engine', 'hbs');

// app.listen(port, () => {z
//     console.log("Server runniing on port", port);
// })
app.get("/", (req, res) => {
    res.send("Welcome");
})
app.get("/ems", (req, res) => {
    res.render("index")
})
// app.get("/login", (req, res) => {
//     console.log(req.body);
//     res.json(req.body)
// })

app.use("/auth", require("./routes/landing"))
app.set('view engine', 'hbs');

//Setting up a server
const port = 3000;

app.listen(port, (err) => {
    if(err) console.log(err);
    console.log(`Server running on port ${port}...`);
})

//Confuguring routes
