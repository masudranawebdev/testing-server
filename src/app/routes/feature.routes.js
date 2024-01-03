const express = require("express");
const { getAllFeature, postFeature, updateFeatureInfo, deleteAFeatureInfo } = require("../controllers/feature.controllers");
const router = express.Router();

// get post delete and update Feature Item
router.route('/').get(getAllFeature).post(postFeature).patch(updateFeatureInfo).delete(deleteAFeatureInfo)

const FeatureRoutes = {
    router
};

module.exports = FeatureRoutes;
