const httpStatus = require("http-status");
const sendResponse = require("../../shared/send.response");
const ApiError = require("../../errors/ApiError");
const {getAllOrderService, getAOrderService, postOrderWithCardServices, getSearchOrderService, deleteOrderWithOutCardServices, getAllOrderInfoService, postCheckOrderWithCardServices, updateOrderService, deleteOrderWithAddQuantityServices } = require("../services/OrderServices");
const OrderModel = require("../models/Order.model");
const { default: mongoose } = require("mongoose");

// get all Order
exports.getAllOrder = async (req, res, next) => {
    try {
        const {page, limit} = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const result = await getAllOrderService(limitNumber, skip);
        const total = await OrderModel.countDocuments();
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Order Found successfully !',
                data: result,
                totalData: total
            });
        }
        throw new ApiError(400, 'Order Found Failed !')
    } catch (error) {
        next(error)
    }
}

// get a Order
exports.getAOrder = async (req, res, next) => {
    try {
        const email = req.params.email;
        const result = await getAOrderService(email);
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Order Found successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Order Found Failed !')
    } catch (error) {
        next(error)
    }
}

// generate order id
const generateOrderID = async() => {
    const prefix = 0; // You can use any prefix you like

    let isUnique = false;
    let uniqueOrderId;

    while (!isUnique) {
        const total = await OrderModel.countDocuments();
        const orderId = total + 1;

        // Convert orderId to a 6-character string
        const paddedOrderId = orderId.toString().padStart(4, 0);

        // Combine the prefix and paddedOrderId
        uniqueOrderId = `${prefix}${paddedOrderId}`;

        // Check if the generated ID is unique
        const existingOrder = await OrderModel.findOne({ orderId: uniqueOrderId });

        // If no existing order found, mark the ID as unique
        if (!existingOrder) {
            isUnique = true;
        }
    }

    return uniqueOrderId;
}

exports.postOrder = async (req, res, next) => {
    let session;
    try {
        // Start a MongoDB transaction
        session = await mongoose.startSession();
        session.startTransaction();

        const data = req.body;
        const orderId = await generateOrderID();
        const sendData = { ...data, orderId };

        let result;
            result = await postCheckOrderWithCardServices(sendData);
            console.log(result)
            if(result == 1){

            const result2 = await postOrderWithCardServices(sendData);
            if(result2){
                await session.commitTransaction();

            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Order Added successfully!',
                data: result,
            });
            }else{
                throw new ApiError(400, 'Order confirm failed !');
            } 
        }else{
            throw new ApiError(400, 'Not enough quantity !');
        }
        
    } catch (error) {
        // Rollback the transaction in case of an error
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }

        next(error);
    }
};

// delete A Order item
exports.deleteAOrderInfo = async (req, res, next) => {
    try {
            const type = req.body.type;
            const status = req.body.status;
            if(type === 'unpaid' && status == 'pending'){
                const order = req.body.allData?.order;
                const orderQuantityUpdate = deleteOrderWithAddQuantityServices(order)
                if(orderQuantityUpdate){
                    const id = req.body._id;
                    const result = await deleteOrderWithOutCardServices(id);
                    if (result?.deletedCount > 0) {
                        return sendResponse(res, {
                        statusCode: httpStatus.OK,
                        success: true,
                        message: 'Order Delete successfully !'
                        });
                    } else {
                        throw new ApiError(400, 'Order delete failed !');
                    }
                }else{
                    throw new ApiError(400, 'Something went wrong !');
                }
            }else{
                throw new ApiError(400, 'You have no access to delete this order !');
            }
        
    } catch (error) {
        next(error);
    }
};

// get total Order info item
exports.getTotalOrderInfo = async (req, res, next) => {
    try {
        const data = await getAllOrderInfoService();
        const totalOrder = await OrderModel.countDocuments();
        const pendingData = data.filter(item => item.status === 'pending');
        const pendingOrder = pendingData.length;
        const successData = data.filter(item => item.status === 'complete');
        const successOrder = successData.length;

        // Initialize total price
        let totalPrice = 0;

        // Iterate through 'success' data and sum up the prices
        if(successData?.length > 0){
            successData.forEach(order => {
            order?.order?.forEach(orderItem => {
            totalPrice += orderItem.price * orderItem.quantity;
                });
            });
        }
        const sendData = {
            totalOrder,
            pendingOrder,
            successOrder,
            totalPrice
        }

        if (data) {
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Order get successfully !',
                data: sendData
            });
        }
        throw new ApiError(400, 'Order get failed !');
    } catch (error) {
        next(error);
    }
};


// search Order item
exports.getSearchOrderInfo = async (req, res, next) => {
    try {
        const searchTerm = req.params.term;
        const searchData = { $regex: searchTerm, $options: 'i' }
        const data = await getSearchOrderService(searchData);
        if (data) {
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Order get successfully !',
                data: data
            });
        }
        throw new ApiError(400, 'Order get failed !');
    } catch (error) {
        next(error);
    }
};

// update a order
exports.UpdateAOrderInfo = async (req, res, next) => {
    try {
        const id = req.body._id;
        const result = await updateOrderService(id);
        if (result?.modifiedCount > 0) {
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Order Update successfully !'
            });
        } else {
            throw new ApiError(400, 'Order Update failed !');
        }
    } catch (error) {
        next(error);
    }
};
