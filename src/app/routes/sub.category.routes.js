const express = require("express");
const { getAllSub_Category, postSub_Category, updateSub_CategoryInfo, deleteASub_CategoryInfo, getAllCategoryMatchMenuAndCategory } = require("../controllers/sub.category.controllers");
const verifyToken = require("../../middleware/verify.token");
const { FileUploadHelper } = require("../../helpers/image.upload");
const router = express.Router();

// get post delete and update Sub_Category Item
router.route('/').get(getAllSub_Category).post(verifyToken, FileUploadHelper.ImageUpload.fields([{ name: 'sub_category_image', maxCount: 1 }]), postSub_Category).patch(verifyToken, FileUploadHelper.ImageUpload.fields([{ name: 'sub_category_image', maxCount: 1 }]), updateSub_CategoryInfo).delete(verifyToken, deleteASub_CategoryInfo)

router.route('/menuIdAndCategoryId').get(getAllCategoryMatchMenuAndCategory)

const Sub_CategoryRoutes = {
    router
};

module.exports = Sub_CategoryRoutes;