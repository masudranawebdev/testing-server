const express = require("express");
const { getAllSlider, postSlider, updateSliderInfo, deleteASliderInfo } = require("../controllers/slider.controllers");
const { SliderImageUpload } = require("../../helpers/slider.image.upload");
const verifyToken = require("../../middleware/verify.token");
const router = express.Router();

// get post delete and update Slider Item
router.route('/').get(getAllSlider).post(verifyToken, SliderImageUpload.fields([{ name: 'slider', maxCount: 1 }]), postSlider).patch(verifyToken, SliderImageUpload.fields([{ name: 'slider', maxCount: 1 }]), updateSliderInfo).delete(verifyToken, deleteASliderInfo)

const SliderRoutes = {
    router
};

module.exports = SliderRoutes;