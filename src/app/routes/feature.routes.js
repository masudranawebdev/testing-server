const express = require("express");
const { getAllFeature, postFeature, deleteAFeatureInfo, updateAFeatureInfo } = require("../controllers/feature.controllers");
const verifyToken = require("../../middleware/verify.token");
const router = express.Router();

// get post delete and update Feature Item
router.route('/').get(getAllFeature).post(verifyToken, postFeature).delete(verifyToken, deleteAFeatureInfo).patch(verifyToken, updateAFeatureInfo)

const FeatureRoutes = {
    router
};

module.exports = FeatureRoutes;
