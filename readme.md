(C)
Sumit Biswas

This is basically a template of authentication system in node js. This can easily be used as a template for creating any website which requires authentication.

Features:- 

1. Home page - Sign-up / Sign-In 
// Every user data has been stored into the local MongoDB

2. All the users will first create their account using sign-up page where name, email id and password will be asked.
3. While sign-up their password will be hashed and then saved into the DB for added security. (Used package-bcrypt)
4. A sign-up success email will be sent to every user on their registered email Id.
5. For Sign-in, I created a session and authenticated the user using passport local strategy
6. Implemented Social authentication using Google.
7. Implement google recaptcha for verifying the user is not a robot while signing in.
8. After signing in - there is two option
            - Sign-out
            - Reset password
9. For the reset password it will take the user to a new page, where there has been kept few check like
   - the old password should be correct
   - the new password and confirm new password must match
   - only then the new password will be updated in the DB

10. For all the notification we used Flash message and Noty for showing beautiful notification.
11. All the front end has been designed using Bootstap


To start the project:-

1. First pull all the code into your local
2. Then create a .env file into your local and create and give your own value to the following keys which has been used in my whole code

SENDER_EMAIL=
EMAIL_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACKURL= 

3. After that in the root directory of the project simply type "npm start"
4. Then goto localhost:7000 and enjoy the whole website.

N.B- For the Database install mongoDB in your local system as all the user data has been stored locally, otherwise the project will not run.


I wish you all the best!


contact id: sbsumitpro@gmail.com