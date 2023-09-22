const nodeMailer = require("../config/nodemailer");

exports.signUpGreeting= (password_reset_link, email)=>{
    // console.log("Inside nodemailer", comment);

    nodeMailer.transporter.sendMail({
        from:"sbsumitpro@gmail.com",
        to:email,
        subject:"Sign-up successful!",
        html: password_reset_link
    },(err,info)=>{
        if(err){
            console.log("Error in sending email", err);
            return;
        }
        console.log("Sign-up greeting msg Sent!");
        return;

    })
}