const mongoose = require("mongoose");

// User Schema and connect DB collection
const usersRegSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true,
        validate: {
            validator: (value) => {
                const emailRegex = /@/
                return emailRegex.test(value);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
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
        type: String
    },
    otp: {
        type: String
    },
    address: {
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