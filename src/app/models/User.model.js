const mongoose = require("mongoose");

// User Schema and connect DB collection
const usersRegSchema = new mongoose.Schema({
    password: {
        type: String
    },
    name: {
        type: String
    },
    role: {
        type: String,
        default: "customer",
    },
    phone: {
        required: true,
        unique: true,
        type: String
    },
    otp: {
        type: String
    },
    zip_code: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    country: {
        type: String
    },
    verify: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

const UserModel = mongoose.model("users", usersRegSchema);

module.exports = UserModel;