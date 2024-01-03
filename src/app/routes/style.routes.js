const express = require("express");
const { getAllStyle, postStyle, updateStyleInfo, deleteAStyleInfo } = require("../controllers/style.controllers");
const router = express.Router();

// get post delete and update Style Item
router.route('/').get(getAllStyle).post(postStyle).patch(updateStyleInfo).delete(deleteAStyleInfo)

const StyleRoutes = {
    router
};

module.exports = StyleRoutes;