const DataModel = require('./data_model');

class Project {
    constructor(id, name, abstract, authors, tags, createdBy) {
        this.id = id;
        this.name = name;
        this.abstract = abstract;
        this.authors = authors;
        this.tags = tags;
        this.createdBy = createdBy;
    }
}

class Projects extends DataModel {
    validate(obj) {
        //If authors and tags are arrays
        if(!Array.isArray(obj.authors)){
            return false;
        }

        if(!Array.isArray(obj.tags)){
            return false;
        } 

        //Validate that none of the properties are empty
        if(obj.id == "" || obj.name == "" || obj.abstract == "" || obj.authors == "" || obj.tags == "" || obj.createdBy == "") {
            return false;
        }
        // method should return true if all passes
        else {
            return true;
        }

    }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};