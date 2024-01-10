const express = require("express");
const { getAllFeature, postFeature, deleteAFeatureInfo, updateAFeatureInfo } = require("../controllers/feature.controllers");
const router = express.Router();

// get post delete and update Feature Item
router.route('/').get(getAllFeature).post(postFeature).delete(deleteAFeatureInfo).patch(updateAFeatureInfo)

const FeatureRoutes = {
    router
};

module.exports = FeatureRoutes;
