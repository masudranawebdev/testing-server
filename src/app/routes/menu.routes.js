const express = require("express");
const { getAllMenu, postMenu, deleteAMenuInfo, updateAMenuInfo, getAllCategoryAndSubCategory } = require("../controllers/menu.controllers");
const router = express.Router();

// get post delete and update Menu Item
router.route('/').get(getAllMenu).post(postMenu).delete(deleteAMenuInfo).patch(updateAMenuInfo)

router.route('/:menuId').get(getAllCategoryAndSubCategory)

const MenuRoutes = {
    router
};

module.exports = MenuRoutes;