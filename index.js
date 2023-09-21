const express = require("express");
const app = express();
const port = 4000
const bodyParser = require("body-parser")
const ejsLayout = require("express-ejs-layouts")
const db = require("./config/mongoose")

app.use(bodyParser.urlencoded({extended:false}))

app.use(ejsLayout); // This is for setting up layout in the views


// setting the view engine
app.set("view engine", "ejs");
app.set("views","./views" )

// use express router
app.use("/", require("./routes/index"));

// creating a server
app.listen(port,(err)=>{
    console.log("Server started and listening to port no ", port);
})