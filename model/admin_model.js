const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passCom = require("joi-password-complexity");

const AdminSchema = new mongoose.Schema({
    full_name : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
})
AdminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id}.process.env.privatekey,{expiresIn:"30m"})
    return token;
}

const admin = mongoose.model("admin", AdminSchema)

const validation = (data)=>{
    const schema = joi.object({
        full_name:joi.string().required().label("Full Name"),
        email : joi.string().email().required().label("Email"),
        password : passCom().required().label("Password")
    })
    return schema.validate(data)
}
module.exports = {admin, validation}