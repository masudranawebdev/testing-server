const express = require("express");
const { getAllColor, postColor, deleteAColorInfo, updateAColorInfo } = require("../controllers/color.controllers");
const router = express.Router();

// Get post deletee and update Coor Item
router.route('/').get(getAllColor).post(postColor).delete(deleteAColorInfo).patch(updateAColorInfo)

const ColorRoutes = {
    router
};

module.exports = ColorRoutes;