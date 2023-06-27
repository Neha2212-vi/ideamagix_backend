const route = require("express").Router();
const {instructor} = require("../model/instructor_model");

route.get("/all_instructor", async(req, res)=>{
    try {
        const data = await instructor.find()
        res.send(data)
    } catch (error) {
       console.log(error) 
    }
})
module.exports = route