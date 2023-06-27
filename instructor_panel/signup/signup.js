const route = require("express").Router();
const {instructor, validation} = require("../../model/instructor_model")
const bcrypt = require('bcrypt');

route.post("/instructor/Signup", async(req, res)=>{
    try {
        const {error} = validation(req.body);
        if(error)
           return res.status(400).send({message : error.details[0].message});
        
        const user = await instructor.findOne({
            email : req.body.email
        });
        if(user)
           return res.status(409).send({message : "This Email_id already exist"});
        

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new instructor({...req.body, password:hashPassword}).save();
            res.status(201).send({
            message : "User created successfully"
        })
        
    } catch (error) {
       res.status(500).send({
        message : "Internal server error"
       }) 
    }
})

module.exports = route