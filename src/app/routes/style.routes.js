const express = require("express");
const { getAllStyle, postStyle, updateStyleInfo, deleteAStyleInfo, updateAStyleInfo } = require("../controllers/style.controllers");
const router = express.Router();

// get post delete and update Style Item
router.route('/').get(getAllStyle).post(postStyle).delete(deleteAStyleInfo).patch(updateAStyleInfo)

const StyleRoutes = {
    router
};

module.exports = StyleRoutes;