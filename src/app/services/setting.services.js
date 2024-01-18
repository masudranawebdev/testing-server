const SettingModel = require("../models/Setting.model");

// get site setting
exports.getSiteSettingServices = async () => {
    const setting = await SettingModel.find({});
    return setting;
}

// post site setting
exports.postSiteSettingServices = async (data) => {
    const setting = await SettingModel.create(data);
    return setting;
}

// update site setting
exports.updateSiteSettingServices = async (data) => {
    const setting = await SettingModel.findOne({_id: data?._id});
    const updateSetting = await SettingModel.updateOne(setting, data, {
    runValidators: true });
    return updateSetting;
}