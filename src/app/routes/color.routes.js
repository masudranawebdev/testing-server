const express = require("express");
const { getAllColor, postColor, deleteAColorInfo, updateAColorInfo } = require("../controllers/color.controllers");
const verifyToken = require("../../middleware/verify.token");
const router = express.Router();

// Get post deletee and update Coor Item
router.route('/').get(getAllColor).post(verifyToken, postColor).delete(verifyToken, deleteAColorInfo).patch(verifyToken, updateAColorInfo)

const ColorRoutes = {
    router
};

module.exports = ColorRoutes;