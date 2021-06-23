const express = require('express');
const router = express.Router()
const school = require('../services/school');
const userService = require('../services/user');


router.get('/signup', (req, res) => {

    const programs = school.getPrograms();
    const gradYears = school.getGradYears();
    const error = req.flash("error");
    const retainedDetails = req.flash("retainedDetails");
    console.log(retainedDetails);
    // console.log(JSON.parse(retainedDetails));

    res.render('Signup', { programs, gradYears, error, retainedDetails });

});

router.post('/signup', (req, res) => {
    // console.log(req.body); what is inside the req.body is an object { firstname, lastname, email, password, program, matricNumber, graduationYear}
    let newUser = { firstname: req.body.firstName, lastname: req.body.lastName, email: req.body.email, password: req.body.password, matricNumber: req.body.matricNumber, program: req.body.program, graduationYear: req.body.graduationYear }
    // console.log(newUser);
    console.log(req.body);
    req.flash("retainedDetails", req.body);
    //SignupSuccessful is an array with two values. The first value is a boolean of either true/false, the second value is the user object
    let signupSuccessful = userService.create(newUser)  // let signupSuccessful = userService.create(req.body);
    console.log(signupSuccessful);

    if (signupSuccessful[0] == true) {
        console.log('true');
        req.session.user = signupSuccessful[1]; //req.session.user = user; i.e. user (user object) is represented by signupsuccessful[1]
        res.redirect('/');
    }
    else {
        console.log('false');
        req.flash("error", signupSuccessful[1]);
        res.status(303).redirect('/signup');
    }
})

router.get('/login', (req, res) => {
    const user = req.session.user;
   const logErr =  req.flash("logErr");  //'Invalid email/password';
    console.log(logErr); 

    const retainedDetails = req.flash("retainedDetails");
    console.log(retainedDetails);
   res.render('Login', {user, logErr, retainedDetails });
})

router.post('/login', (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    //To retain the details after submission

    let loginSuccessful = userService.authenticate(email, password);
    req.flash("retainedDetails", [email, password]);

    console.log('mannn');
    console.log(loginSuccessful);

    if( loginSuccessful[0] == true) {
        console.log('Login trueee');
        req.session.user = loginSuccessful[1]; //Save the user to the session
        res.redirect('/');
    }
    else {
        console.log("false");
        const error = loginSuccessful[1];
        console.log(error);
        req.flash("logErr", loginSuccessful[1]);
        
        //Error 401 - unauthorized client error status
        res.status(301).redirect('/login');
    }
 
})

module.exports = router;

