const httpStatus = require("http-status");
const ApiError = require("../../errors/ApiError");
const sendResponse = require("../../shared/send.response");
const ProductModel = require("../models/Product.model");
const UserModel = require("../models/User.model");
const { getAllDashboardInfoService, getTodaySellDataService, getThisMonthSellDataService, getThisWeekSellDataService, getThisYearSellDataService, getAllUserInfoService } = require("../services/dashboard.services");


// get all Dashboard Information
exports.getAllDashboardInfo = async (req, res, next) => {
    try {
        const allCustomerCount = await UserModel.countDocuments();
        const allProductCount = await ProductModel.countDocuments();
        const todaySellCount = await getTodaySellDataService();
        const thisMonthSellCount = await getThisMonthSellDataService();
        const thisWeekSellData = await getThisWeekSellDataService();
        const thisYearSellData = await getThisYearSellDataService();
        const allUserData = await getAllUserInfoService();
        const sendData = {
            allCustomerCount,
            allProductCount,
            todaySellCount,
            thisMonthSellCount,
            thisWeekSellData,
            thisYearSellData,
            allUserData
        }
        if(sendData){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Order Found successfully !',
                data: sendData,
            });
        }
        throw new ApiError(400, 'Order Found Failed !')
    } catch (error) {
        next(error)
    }
}