const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    petName : {
        type: String,
        required: [true, "The Pet´s name is required"],
        minlength: [3, "The Pet´s name must be at least 3 characters or longer"]
    },
    petType : {
        type: String,
        required: [true, "The Pet´s type is required"],
        minlength: [3, "The Pet´s name must be at least 3 characters or longer"]
    },
    petDescription : {
        type: String,
        required: [true, "The Pet´s description is required"],
        minlength: [3, "The Pet´s name must be at least 3 characters or longer"]
    },
    skillOne: {
        type: String
    },
    skillTwo: {
        type: String
    },
    skillThree: {
        type: String
    },
    likes: {
        type: Number
    }

}, {timestamps:true});

const Pet = mongoose.model('Pets', PetSchema);

module.exports = Pet;