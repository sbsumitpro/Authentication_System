const express = require("express");
const app = express();
require('dotenv').config();
const port = 7000
const bodyParser = require("body-parser")
const ejsLayout = require("express-ejs-layouts")
const db = require("./config/mongoose")
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local");
const passportGoogle = require("./config/passport_google_oauth2_strategy");
const flash = require("connect-flash")
const custom_mware = require("./config/flash-middleware")

app.use(bodyParser.urlencoded({extended:false}))

app.use(ejsLayout); // This is for setting up layout in the views  

// extract styles and scripts from the subpages into the layout
app.set('layout extractStyles', true) 
app.set('layout extractScripts', true)

// setting the view engine
app.set("view engine", "ejs");
app.set("views","./views" )

// Setting up the express session for the passport authentication
app.use(session({
    name:"auth_key",
    secret:"jfadkjfb4jkd9nkd!#(dka",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*10)
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)   

app.use(flash());
app.use(custom_mware.setFlash)


// use express router
app.use("/", require("./routes/index"));

// creating a server
app.listen(port,(err)=>{
    console.log("Server started and listening to port no ", port);
})