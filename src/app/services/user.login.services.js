const UserModel = require("../models/User.model");


// Check a user is exists?
exports.findUser = async (email) => {
    const users = await UserModel.findOne({ email: email });
    return users;
}

// update new password
exports.updateLogUsersChangeNewPasswordService = async (email, password) => {
    const findUser = await UserModel.findOne({email:email})
    if(findUser){
        const users = await UserModel.updateOne(findUser, {password: password}, {
            runValidators: true
        });
        return users;
    }
}

// update new password
exports.updateLogUsersNewPasswordService = async (email, password) => {
    const findUser = await UserModel.findOne({email:email})
    if(findUser){
        const users = await UserModel.updateOne(findUser, {password: password}, {
            runValidators: true
        });
        return users;
    }
}
