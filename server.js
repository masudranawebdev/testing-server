const mongoose = require("mongoose");
const dotenv = require("dotenv").config();


const uri = `mongodb+srv://masudranadev:MasudRanaQuee@cluster0.1pmqj8u.mongodb.net/ecommerce?retryWrites=true&w=majority`;

const connectDB = async() =>{
  try {
    await mongoose.connect(uri);
    console.log(`Database connection Successfully`)
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;