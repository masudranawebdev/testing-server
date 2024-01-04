const express = require("express");
const { getAllMenu, postMenu, updateMenuInfo, deleteAMenuInfo } = require("../controllers/menu.controllers");
const router = express.Router();

// get post delete and update Menu Item
router.route('/').get(getAllMenu).post(postMenu).delete(deleteAMenuInfo)

const MenuRoutes = {
    router
};

module.exports = MenuRoutes;