const express = require("express");
const { postLogUser, postForgotPasswordUser, postNewPasswordUser } = require("../controllers/user.login.controllers");
const router = express.Router();

// Registration A User
router.route('/').post(postLogUser);
router.route('/forgetPassword').post(postForgotPasswordUser);
router.route('/setNewPassword').post(postNewPasswordUser);

const UserLoginRoutes = {
    router
};

module.exports = UserLoginRoutes;