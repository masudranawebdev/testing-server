const express = require("express");
const { getAllStyle, postStyle, deleteAStyleInfo, updateAStyleInfo } = require("../controllers/style.controllers");
const verifyToken = require("../../middleware/verify.token");
const router = express.Router();

// get post delete and update Style Item
router.route('/').get(getAllStyle).post(verifyToken, postStyle).delete(verifyToken, deleteAStyleInfo).patch(verifyToken, updateAStyleInfo)

const StyleRoutes = {
    router
};

module.exports = StyleRoutes;