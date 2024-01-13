const express = require("express");
const { getAllSub_Category, postSub_Category, updateSub_CategoryInfo, deleteASub_CategoryInfo, getAllCategoryMatchMenuAndCategory } = require("../controllers/sub.category.controllers");
const { Sub_CategoryImageUpload } = require("../../helpers/sub_category.image.upload");
const router = express.Router();

// get post delete and update Sub_Category Item
router.route('/').get(getAllSub_Category).post(Sub_CategoryImageUpload.fields([{ name: 'sub_category_image', maxCount: 1 }]), postSub_Category).patch(Sub_CategoryImageUpload.fields([{ name: 'sub_category_image', maxCount: 1 }]), updateSub_CategoryInfo).delete(deleteASub_CategoryInfo)

router.route('/menuIdAndCategoryId').get(getAllCategoryMatchMenuAndCategory)

const Sub_CategoryRoutes = {
    router
};

module.exports = Sub_CategoryRoutes;