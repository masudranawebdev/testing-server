const express = require("express");
const { getAllSlider, postSlider, updateSliderInfo, deleteASliderInfo } = require("../controllers/slider.controllers");
const { SliderImageUpload } = require("../../helpers/slider.image.upload");
const router = express.Router();

// get post delete and update Slider Item
router.route('/').get(getAllSlider).post(SliderImageUpload.fields([{ name: 'slider', maxCount: 1 }]), postSlider).patch(SliderImageUpload.fields([{ name: 'slider', maxCount: 1 }]), updateSliderInfo).delete(deleteASliderInfo)

const SliderRoutes = {
    router
};

module.exports = SliderRoutes;