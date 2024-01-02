const express = require("express");
const { postRegUser } = require("../controllers/user.reg.controllers");
const router = express.Router();

// Registration A User
router.route('/').post(postRegUser);

const UserRegRoutes = {
    router
};

module.exports = UserRegRoutes;