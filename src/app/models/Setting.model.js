const mongoose = require("mongoose");

// site setting Schema and connect DB collection
const settingSchema = new mongoose.Schema({
    logo: {
        type: String
    },
    favicon: {
        type: String
    },
    title: {
        type: String
    },
    video: {
        type: String
    },
    copyRight: {
        type: String
    },
    location: {
        type: String
    },
    inside_dhaka: {
        type: String
    },
    outside_dhaka: {
        type: String
    },
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
    youTube: {
        type: String
    },
    aboutUs: {
        type: String
    },
    return_exchange: {
        type: String
    },
    contact_us: {
        type: String
    },
    shipping_info: {
        type: String
    },
    material_care: {
        type: String
    },
},
{
    timestamps: true
})

const SettingModel = mongoose.model("settings", settingSchema);

module.exports = SettingModel;
