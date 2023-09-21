const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");


// Authentication using passport
passport.use(new LocalStrategy({
    usernameField: "email" 
}, async function(email, password, done) {
    try{
        let user = await User.findOne({email:email})
        let isMatched = await bcrypt.compare(password, user.password)
        console.log("----",isMatched)
        if(!user || !isMatched){
            // req.flash("success","Invalid Username/Password")
            console.log("Invalid Username/Password")
            return done(null, false)
        }
        return done(null, user)
    }catch(err){
        // req.flash("Error",err)
        console.log("Error in finding user--->passport",err)
        return done(err)
    }
}));


// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id)
})

// Desrialize the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id)
    .then(function(user){
        return done(null, user);
    })
    .catch((err)=>{
        console.log("Error in finding user--->passport",err)
        return done(err);
    })
})

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect("/users/sign-in");
}

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie & we are sending this to locals for the views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;