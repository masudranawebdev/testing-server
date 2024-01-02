const express = require("express");
const { getAllCategory, postCategory, updateCategoryInfo, deleteACategoryInfo } = require("../controllers/category.controllers");
const router = express.Router();

// get post delete and update Category Item
router.route('/').get(getAllCategory).post(postCategory).patch(updateCategoryInfo).delete(deleteACategoryInfo)

const CategoryRoutes = {
    router
};

module.exports = CategoryRoutes;