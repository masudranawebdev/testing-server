const express = require("express");
const { updateSiteSettingInfo, getSiteSettingInfo } = require("../controllers/setting.controllers");
const verifyToken = require("../../middleware/verify.token");
const router = express.Router();

// seeting data show
router.route('/').get(getSiteSettingInfo).patch(verifyToken, updateSiteSettingInfo);

const SettingRoutes = {
    router
};

module.exports = SettingRoutes;