require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectionFun = require("./database/db")
const adminSignup = require("./Admin_panel/signup/signup")
const adminLogin = require("./Admin_panel/login/login")
const instructorSignup = require("./instructor_panel/signup/signup")
const instructorLongin = require("./instructor_panel/login/login")
const all_instructor = require("./routes/all_instructor")

connectionFun();
app.use(express.json());
app.use(cors());

app.use(adminSignup)
app.use(adminLogin)
app.use(instructorSignup)
app.use(instructorLongin)
app.use(all_instructor)

const port = process.env.PORT || 8080
app.listen(port, ()=>console.log(`app is running at port ${port}`))