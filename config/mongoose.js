const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/authentication_project");

const db = mongoose.connection;

db.on("error", console.log.bind(console, "error connecting to DB"));
db.once("open",()=>{
    console.log("Successfully connected to DB");
})