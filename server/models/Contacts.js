const bcrypt = require("bcryptjs");
const { model, Schema } = require("mongoose");


const contactSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

module.exports = model("contact", contactSchema);