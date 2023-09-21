const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

passport.use(new googleStrategy({
    clientID: "109833799268-6m8ncr2152bdpec9dbt7h7on6ibje8rq.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:7000/users/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done)=>{
        try{
            const user = await User.findOne({email:profile.emails[0].value});

            if(user){
                // if found,then set the user as req.user 
                return done(null, user)
            }else{
                // if not found, then create the user and then set it as req.user
                try {
                    const user = await User.create({
                        name:profile.displayName,
                        email:profile.emails[0].value,
                        password: crypto.randomBytes(20).toString("hex")
                    })
                    return done(null, user);
                } catch (err) {
                    console.log("error in creating new user from google auth",err);
                    return
                }
            }

        }catch(err){
            console.log("error in creating google strategy -passport",err);
            return;
        }

    }

))

module.exports = passport;
