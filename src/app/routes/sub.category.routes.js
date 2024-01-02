const express = require("express");
const { getAllSub_Category, postSub_Category, updateSub_CategoryInfo, deleteASub_CategoryInfo } = require("../controllers/sub.category.controllers");
const router = express.Router();

// get post delete and update Sub_Category Item
router.route('/').get(getAllSub_Category).post(postSub_Category).patch(updateSub_CategoryInfo).delete(deleteASub_CategoryInfo)

const Sub_CategoryRoutes = {
    router
};

module.exports = Sub_CategoryRoutes;