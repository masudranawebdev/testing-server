const express = require("express");
const { getAllCategory, postCategory, updateCategoryInfo, deleteACategoryInfo, getAllCategoryMatchMenu } = require("../controllers/category.controllers");
const { CategoryImageUpload } = require("../../helpers/category.image.upload");
const verifyToken = require("../../middleware/verify.token");
const router = express.Router();

// get post delete and update Category Item
router.route('/').get(getAllCategory).post(verifyToken, CategoryImageUpload.fields([{ name: 'category_image', maxCount: 1 }]), postCategory).patch(verifyToken, CategoryImageUpload.fields([{ name: 'category_image', maxCount: 1 }]),updateCategoryInfo).delete(verifyToken, deleteACategoryInfo)

router.route('/menuId').get(getAllCategoryMatchMenu)

const CategoryRoutes = {
    router
};


module.exports = CategoryRoutes;