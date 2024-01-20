const express = require("express");
const { getAllDashboardInfo } = require("../controllers/dashboard.controllers");
const router = express.Router();

// get post delete and update Order Item
router.route('/').get(getAllDashboardInfo)

const DashboardRoutes = {
    router
};

module.exports = DashboardRoutes;