const httpStatus = require("http-status");
const sendResponse = require("../../shared/send.response");
const ApiError = require("../../errors/ApiError");
const { postOrderServices, getAllOrderService, getAOrderService, postOrderWithCardServices, getSearchOrderService, deleteOrderWithOutCardServices, getAllOrderInfoService, postCheckOrderWithCardServices } = require("../services/OrderServices");
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
    const prefix = 'O'; // You can use any prefix you like

    let isUnique = false;
    let uniqueOrderId;

    while (!isUnique) {
        const total = await OrderModel.countDocuments();
        const orderId = total + 1;

        // Convert orderId to a 6-character string
        const paddedOrderId = orderId.toString().padStart(4, '0');

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


// post a Order
// exports.postOrder = async (req, res, next) => {
//     try {
//         const data = req.body;
//         const orderId = await generateOrderID();
//         const sendData = { ...data, orderId }
//         if(data.transactionId){
//             const result = await postOrderWithCardServices(sendData);
//         if(result){
//             return sendResponse(res, {
//                 statusCode: httpStatus.OK,
//                 success: true,
//                 message: 'Order Added successfully !',
//                 data: result,
//             });
//         }
//         throw new ApiError(400, 'Order Added Failed !')
//         }else{
//             const result = await postOrderServices(sendData);
//         if(result){
//             return sendResponse(res, {
//                 statusCode: httpStatus.OK,
//                 success: true,
//                 message: 'Order Added successfully !',
//                 data: result,
//             });
//         }
//         throw new ApiError(400, 'Order Added Failed !')
//         }
//     } catch (error) {
//         next(error)
//     }
// }

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

        if (data.transactionId) {
            result = await postCheckOrderWithCardServices(sendData);
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
        } else {
            result = await postCheckOrderWithCardServices(sendData);
            if(result == 1){
            const result2 = await postOrderWithCardServices(sendData);
            if(result2){
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
        const transactionId = req.body.transactionId;
        const type = req.body.type;
        const status = req.body.status;
        if(transactionId && type === 'paid' && status == 'pending'){
            throw new ApiError(400, 'You have no access to delete this order !');
        }
        const id = req.body._id;
        const result = await deleteOrderWithOutCardServices(id);
        if (result?.deletedCount > 0) {
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Order Delete successfully !'
            });
        } else {
            throw new ApiError(400, 'Order delete failed !');
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
        const successData = data.filter(item => item.status === 'success');
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
