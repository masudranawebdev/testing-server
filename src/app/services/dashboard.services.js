const OrderModel = require("../models/Order.model");
const UserModel = require("../models/User.model");

// Find today sell Dashboard Services
exports.getTodaySellDataService = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to the beginning of the day
    const getTodaySellData = await OrderModel.countDocuments({
        createdAt: { $gte: today }
    });
    return getTodaySellData;
}

// Find this month sell Dashboard Services
exports.getThisMonthSellDataService = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const thisMonthSellCount = await OrderModel.countDocuments({
        createdAt: { $gte: firstDayOfMonth }
    });
    return thisMonthSellCount;
}

// Find this Week sell Dashboard Services
exports.getThisWeekSellDataService = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    const getThisWeekSellData = await OrderModel.find({
        createdAt: { $gte: firstDayOfWeek }
    });
    return getThisWeekSellData;
}

// Find this Year sell Dashboard Services
exports.getThisYearSellDataService = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

    const getThisYearSellData = await OrderModel.find({
        createdAt: { $gte: firstDayOfYear }
    });
    return getThisYearSellData;
}

// Find All user Services
exports.getAllUserInfoService = async () => {
    const getAllUserData = await UserModel.find({})
    return getAllUserData;
}