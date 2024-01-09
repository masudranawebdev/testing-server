const express = require("express");
const { getAllCategory, postCategory, updateCategoryInfo, deleteACategoryInfo } = require("../controllers/category.controllers");
const { CategoryImageUpload } = require("../../helpers/category.image.upload");
const router = express.Router();

// get post delete and update Category Item
router.route('/').get(getAllCategory).post(CategoryImageUpload.fields([{ name: 'category_image', maxCount: 1 }]), postCategory).patch(CategoryImageUpload.fields([{ name: 'category_image', maxCount: 1 }]),updateCategoryInfo).delete(deleteACategoryInfo)

const CategoryRoutes = {
    router
};


module.exports = CategoryRoutes;