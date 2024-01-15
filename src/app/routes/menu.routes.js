const express = require("express");
const { getAllMenu, postMenu, deleteAMenuInfo, updateAMenuInfo, getAllCategoryAndSubCategory } = require("../controllers/menu.controllers");
const verifyToken = require("../../middleware/verify.token");
const router = express.Router();

// get post delete and update Menu Item
router.route('/').get(getAllMenu).post(verifyToken, postMenu).delete(verifyToken, deleteAMenuInfo).patch(verifyToken, updateAMenuInfo)

router.route('/:menuId').get(getAllCategoryAndSubCategory)

const MenuRoutes = {
    router
};

module.exports = MenuRoutes;