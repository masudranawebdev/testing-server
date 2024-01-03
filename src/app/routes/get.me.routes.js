const express = require("express");
const { getMeUser, updateUserInfo, getUserInformation } = require("../controllers/get.me.controllers");
const router = express.Router();

// Get A User information and update information
router.route('/').get(getMeUser).patch(updateUserInfo);
router.route('/:email').get(getUserInformation);

const GetMeRoutes = {
    router
};

module.exports = GetMeRoutes;