const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName,lastName, email, password } = req.body;

    if(!firstName || !lastName){
        throw new Error("First name and last name are required");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is invalid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password sai dal bhadu");
    }
};

module.exports = { validateSignUpData };