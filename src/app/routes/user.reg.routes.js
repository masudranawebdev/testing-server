const express = require("express");
const { postRegUser, postRegUserAccountVerify, postRegUserResendCode } = require("../controllers/user.reg.controllers");
const router = express.Router();

// Registration A User
router.route('/').post(postRegUser);
router.route('/otpVerify').post(postRegUserAccountVerify);
router.route('/resendOTP').post(postRegUserResendCode);

const UserRegRoutes = {
    router
};

module.exports = UserRegRoutes;