const {Schema, model } = require("mongoose");
const { email } = require("zod");

const contactSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true}

});


// create a collection or model 
const Contact = new model("Contact", contactSchema);

module.exports = Contact;
