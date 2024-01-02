const express = require("express");
const { getAllColor, postColor, updateColorInfo, deleteAColorInfo } = require("../controllers/color.controllers");
const router = express.Router();

// Get post deletee and update Coor Item
router.route('/').get(getAllColor).post(postColor).patch(updateColorInfo).delete(deleteAColorInfo)

const ColorRoutes = {
    router
};

module.exports = ColorRoutes;