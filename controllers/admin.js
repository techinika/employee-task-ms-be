const home = (req,res) => {
    res.send("Welcome admin this will contain all lists of employees");
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

module.exports = {
    home,
    projects,
    reports,
    tasks,
    settings
}