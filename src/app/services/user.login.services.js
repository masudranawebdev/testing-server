const UserModel = require("../models/User.model");


// Check a user is exists?
exports.findUser = async (phone) => {
    const users = await UserModel.findOne({ phone: phone });
    return users;
}

// update new password
exports.updateLogUsersChangeNewPasswordService = async (phone, password) => {
    const findUser = await UserModel.findOne({phone:phone})
    if(findUser){
        const users = await UserModel.updateOne(findUser, {password: password}, {
            runValidators: true
        });
        return users;
    }
}

// update new password
exports.updateLogUsersNewPasswordService = async (phone, password) => {
    const findUser = await UserModel.findOne({phone:phone})
    if(findUser){
        const users = await UserModel.updateOne(findUser, {password: password}, {
            runValidators: true
        });
        return users;
    }
}
