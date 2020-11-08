class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        //create a function which accepts a parameter of obj and returns the id if it exists (matches the obj.id) and assign it to a variable checkID
        const checkId = (obj) => obj.id === id;
        let result = this.data.find(checkId); //find the id from the array and store the result in a variable
        //if no result is found, return null
        if (result == undefined) {
            return null;
        }
        else
            return result;
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        //update the id found in the object
        var index = this.data.findIndex( user => user.id === id ) //findIndex is a method to find the index of an element

        if (index < 0) {
            return false;
        }
        
        //check 
        var temp = this.data[index];

        for (const key in obj) {
            temp[key] = obj[key];
        }
        return true;
    }

    delete(id) {
        //if ID is found, delete it by filtering the specified id.
        if(this.getById(id)) {
            this.data = this.data.filter( obj => obj.id !== id )
            return true;
        }
        return false;
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;