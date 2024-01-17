const express = require("express");
const { getFilterDataControllers } = require("../controllers/filters.controllers");
const router = express.Router();

// Filter data and show
router.route('/').get(getFilterDataControllers);

const FilterRoutes = {
    router
};

module.exports = FilterRoutes;