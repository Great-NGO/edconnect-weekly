const express = require('express');
const router = express.Router();
const projectService = require('../services/project');
const { getById } = require('../services/user');

router.get('/projects/submit', (req, res) => {

    const user = req.session.user;

    if(user == undefined){
        res.status(301).redirect('/login');
    }

    const retainedDetails = req.flash("retainedDetails");
    const subErr = req.flash("subErr");
    res.render('CreateProject', {user, subErr, retainedDetails })
})

router.post('/projects/submit', (req, res) => {
    console.log(req.body);
    const user = req.session.user;
    let name = req.body.name;
    let abstract = req.body.abstract;
    let authors = req.body.authors.split(",");
    let tags = req.body.tags.split(" " || ",");
    
    console.log("LASTTTT");
    console.log(user.firstname, user.lastname);
    const createdBy = user.id;

    
    console.log(authors);
    console.log(tags);

    req.flash("retainedDetails", [name, abstract, authors, tags]);

    const submissionSuccessful = projectService.create({name, abstract, authors, tags, createdBy } );
    console.log(submissionSuccessful);

    if(submissionSuccessful[0] == true) {
        console.log('Submission successful');
        res.status(200).redirect('/');
    }
    else {
        console.log('err');
        console.log(submissionSuccessful[1]);
        req.flash("subErr", submissionSuccessful[1]);
        res.status(400).redirect('/projects/submit');
    }
})

    router.get('/project/:id', (req, res) => {
        const user = req.session.user;
        const id =req.params.id;
        console.log(`The project id gotten from the request parameters (req.params.id) is ${id}`);
       
        const project = projectService.getById(id);
        console.log(project);

        const userId = project.createdBy;
        console.log(userId);

        const masterUser = getById(userId);
      
        console.log(masterUser);
        const {firstname, lastname} = masterUser;
        const createdBy = `${firstname} ${lastname}`;
        console.log(createdBy);

        res.render('Project', {user, projName:project.name, projAbstract:project.abstract, projAuthors:project.authors, projTags:project.tags, createdBy });
    
    })

module.exports = router