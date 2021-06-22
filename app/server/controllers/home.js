const express = require('express');
const router = express.Router();
const project = require('../services/project');

router.get('/', (req, res) => {

    // add code to render the Home Component, and pass in the projects
    //as a props
    const allProjects = project.getAll();
    //The user
    const user = req.session.user;
    console.log("xx")
    console.log(user);
    console.log(allProjects);
    res.render('Home', {allProjects, user});      //res.render('Home', {allProjects: allProjects});
    
})

router.get('/logout', (req, res) => {
    //Destroys the session and redirects to the home page
    req.session.destroy();
    res.status(200).redirect('/');
})


module.exports = router;