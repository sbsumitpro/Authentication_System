const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports.signUp = (req, res)=>{
    return res.render("sign-up",{
        title:"User Sign Up"
    })
}

module.exports.signIn = (Req,res)=>{
    return res.render("sign-in",{
        title:"User Sign In"
    })
}

module.exports.create = async (req,res)=>{
    try{
        if(req.body.password!=req.body.confirm_password){
            console.log("Password doesn't match!")
            return res.redirect("back");
        }
        let user = await User.findOne({email:req.body.email});
    
        if(!user){
            // hashing the password before saving it to the DB
            const salt = await bcrypt.genSalt(10);
            secPass = await bcrypt.hash(req.body.password,salt)
            await User.create({
                name:req.body.name,
                email: req.body.email,
                password:secPass
            })
            console.log("User created successfully");
            res.redirect("/users/sign-in")
        }else{
            console.log("User with this email id already exists!");
            return res.redirect("back")
        }
    }catch(error){
        console.log("Error while creating a new user", error);
        return;
    }
}

module.exports.createSession =async(req,res)=>{
    return res.redirect("/");
}

module.exports.destroySession  =(req,res)=>{
    req.logout((err)=>{
        if(err){
            console.log("Error in logging out", err);
            return;
        }
        console.log("Logged out");
        return res.redirect("/");
    })
}