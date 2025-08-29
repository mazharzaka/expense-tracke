require("dotenv").config();
const mongoose = require('mongoose');
const DBconfig=async()=>{
    try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the database");
}catch(err){
    console.log(err);
}}
module.exports=DBconfig;