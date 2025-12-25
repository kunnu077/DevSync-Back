const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    lastName: {
        type: String,

    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 0
    },
    gender:{
        type: String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("gender data is not valid");
            }
        },
    },
    photoUrl:{
        type: String,
        default: "",
    },
    about:{
        type: String,
        maxlength: 500,
        default:"kohli goes down the groud, kohli out of the ground"
    },
    skills:{
        type: [String],
        default: [] 
    }
});

module.exports = mongoose.model('User', userSchema);



