const express = require("express");
const { postLogUser, postForgotPasswordUser, postNewPasswordUser, updateChangePasswordUser } = require("../controllers/user.login.controllers");
const router = express.Router();

// Registration A User
router.route('/').post(postLogUser).patch(updateChangePasswordUser);
router.route('/forgetPassword').post(postForgotPasswordUser);
router.route('/setNewPassword').post(postNewPasswordUser);

const UserLoginRoutes = {
    router
};

module.exports = UserLoginRoutes;