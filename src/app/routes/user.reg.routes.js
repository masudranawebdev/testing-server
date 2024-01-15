const express = require("express");
const { postRegUser, postRegUserAccountVerify, postRegUserResendCode, getAllUser, deleteAUser } = require("../controllers/user.reg.controllers");
const verifyToken = require("../../middleware/verify.token");
const router = express.Router();

// Registration A User
router.route('/').post(postRegUser).get(verifyToken, getAllUser).delete(deleteAUser);
router.route('/otpVerify').post(postRegUserAccountVerify);
router.route('/resendOTP').post(postRegUserResendCode);

const UserRegRoutes = {
    router
};

module.exports = UserRegRoutes;