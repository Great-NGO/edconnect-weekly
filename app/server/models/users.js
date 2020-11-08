const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
        //Implement the user class with the properties specified in the argument (i.e firstname, lastname, email, password, matricNumber, program & graduationYear)
        // we implemented the user class by assigning (=) the values of the paramaters to the class
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.matricNumber = matricNumber;
        this.program = program;
        this.graduationYear = graduationYear;
    }

    getFullName() {
        //Returns a combination of the user's first name and last name. i.e Concatenation of strings
        let fullName = this.firstname + " " + this.lastname;
        return fullName;
    }
}

//Data model is the Super class; class User is the sub class inheriting (extending) from the Data Model class
class Users extends DataModel {
    authenticate(email, password) {

        var user = this.getByEmail(email);

        if(user != null){
            if(user.password === password ){
                return true;
            }
            return false;
        }
        return false;
    }

    getByEmail(email) {

        var user = this.data.find(function (user) {
            if (user.email === email) {
                return true;
            }
            return false;
        })
        return user ? user : null
        //Arrow functions (es6) .. This function compares if the email is the same as the objects email property
        /*const checkEmail = obj => obj.email == email;

        let emailResult = this.data.find(checkEmail);

        if (emailResult == undefined) {
            return null;
        }
        else
            return emailResult;*/
    }

    getByMatricNumber(matricNumber) {

        //This function compares if the matric no is the same as the objects matric no property
        const checkMatNo = function (obj) {
            return (obj.matricNumber == matricNumber);
        }
        // we find the matric no from the this.data array and store the result in a variable
        let matResult = this.data.find(checkMatNo);

        //we return the result if found and return null if not found
        if (matResult == undefined) {
            return null;
        }
        else
            return matResult;

    }

    validate(obj) {
        //Validate that none of the provided properties are empty
        let valid = true;
        if (typeof obj.id != "string") {
          
            valid = false;
        }

        if (typeof obj.firstname != "string" || obj.firstname.length < 1) {
           
            valid = false;
        }

        if (typeof obj.lastname != "string" || obj.lastname.length < 1) {
           
            valid = false;
        }

        if (typeof obj.email != "string" || obj.email.length < 1) {
           
            valid = false;
        }

        if (typeof obj.password != "string" || obj.password.length < 1) {
            
            valid = false;
        }

        if (typeof obj.matricNumber != "string" || obj.matricNumber.length < 1) {
            
            valid = false;
        }

        if (typeof obj.program != "string" || obj.program.length < 1) {
            
            valid = false;
        }
        if (obj.graduationYear == "") {
            
            valid = false;
        }

        //Validate that no user in the data array already has the specified email address

        let result = this.getByEmail(obj.email);
        if (result != null) {
           
            valid = false;
        }

        //Validate that no user in the data array already has the specified matric number
        let result2 = this.getByMatricNumber(obj.matricNumber);
        if (result2 != null) {
            
            valid = false;
        }

        //Validate that the password is atleast 7 characters in length
        if (obj.password.length < 7) {
            
            valid = false;
        }

        //The method should return true if all of the tests pass and false otherwise
   
        return valid;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};