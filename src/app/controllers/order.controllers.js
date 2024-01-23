const httpStatus = require("http-status");
const sendResponse = require("../../shared/send.response");
const ApiError = require("../../errors/ApiError");
const {getAllOrderService, getAOrderService, postOrderWithCardServices, getSearchOrderService, deleteOrderWithOutCardServices, getAllOrderInfoService, postCheckOrderWithCardServices, updateOrderService, deleteOrderWithAddQuantityServices, postInitialOrderServices, postOrderWithCODServices, updateOrderPaymentSuccessService, deleteOrderPaymentFailService, getAOrderTNXIDService } = require("../services/OrderServices");
const OrderModel = require("../models/Order.model");

const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = 'class65a7c35cefd5b'
const store_passwd = 'class65a7c35cefd5b@ssl'
const is_live = false //true for live, false for sandbox

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

    let isUnique = false;
    let uniqueOrderId;

    while (!isUnique) {
        uniqueOrderId = Math.floor(1000 + Math.random() * 6000);

        // Check if the generated ID is unique
        uniqueOrderId = Math.floor(100000 + Math.random() * 900000);

        // If no existing order found, mark the ID as unique
        if (!existingOrder) {
            isUnique = true;
        }
    }

    return uniqueOrderId;
}

// generate trnx id
const generateTRNXID = async () => {
    let isUnique = false;
    let transactionId;

    while (!isUnique) {
        transactionId = ''; // Initialize transactionId

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const length = 10;

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            transactionId += characters.charAt(randomIndex);
        }

        // Check if the generated ID is unique
        const existingOrder = await OrderModel.findOne({ transactionId: transactionId });

        // If no existing order found, mark the ID as unique
        if (!existingOrder) {
            isUnique = true;
        }
    }

    return transactionId;
};

exports.postOrder = async (req, res, next) => {
    try {
        const SSLData = req.body;
        const orderId = await generateOrderID();

        let result;
            result = await postCheckOrderWithCardServices(SSLData);

            if(result == 0){
                throw new ApiError(400, 'Not enough quantity !');
            }

            if(result == 1 && SSLData?.payment_type == 'online'){
                const transactionId = await generateTRNXID();
                const sendData = {...SSLData, orderId, transactionId}
                sendData.status = 'pending';
                sendData.type = 'unpaid';
                sendData.totalPrice = sendData.price;
                delete sendData.name;
                delete sendData.price;
                delete sendData.city;
                delete sendData.zip_code;
                delete sendData.country;
                const initialOrder = await postInitialOrderServices(sendData)
                if(initialOrder){
                const data = {
                    total_amount: SSLData?.price,
                    currency: 'BDT',
                    tran_id: transactionId, // use unique tran_id for each api call
                    success_url: `http://localhost:5000/api/v1/order/payment-success/${transactionId}`,
                    fail_url: `http://localhost:5000/api/v1/order/payment-fail/${transactionId}`,
                    cancel_url: `http://localhost:5000/api/v1/order/payment-cancel/${transactionId}`,
                    ipn_url: 'http://localhost:3030/ipn',
                    shipping_method: SSLData?.payment_type,
                    product_name: 'Default.',
                    product_category: 'Default',
                    product_profile: 'Default',
                    cus_name: SSLData?.name,
                    cus_email: SSLData?.email || "Default Email",
                    cus_add1: SSLData?.address,
                    cus_city: SSLData?.city || "Default",
                    cus_postcode: SSLData?.zip_code || "Default",
                    cus_country: SSLData?.country || "Bangladesh",
                    cus_phone: SSLData?.phone,
                    ship_name: 'Default',
                    ship_add1: 'Default',
                    ship_city: 'Default',
                    ship_postcode: "Default",
                    ship_country: 'Bangladesh',
                };
                const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
                sslcz.init(data).then(apiResponse => {
                    const GatewayPageURL = apiResponse.GatewayPageURL;
                    return sendResponse(res, {
                        statusCode: httpStatus.OK,
                        success: true,
                        message: 'Order Added successfully!',
                        data: {GatewayPageURL: GatewayPageURL},
                    });
                });

            }else{
                    throw new ApiError(400, 'Order confirm failed !');
            }
        }else{
            const transactionId = await generateTRNXID();
                const sendData = {...SSLData, orderId, transactionId}
                sendData.status = 'pending';
                sendData.type = 'unpaid';
                sendData.totalPrice = sendData.price;
                delete sendData.name;
                delete sendData.price;
                delete sendData.city;
                delete sendData.zip_code;
                delete sendData.country;
                const result2 = await postOrderWithCODServices(sendData);
            if(result2){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Order Confirm successfully !',
                data: result2
            });
            }else{
                throw new ApiError(400, 'Order confirm failed !');
            }
        }
        
    } catch (error) {
        next(error);
    }
};

// Payment success
exports.postPaymentSuccessOrderInfo = async (req, res, next) => {
    try {
        const transactionId = req.params.transactionId;
        const findOrder = await getAOrderTNXIDService(transactionId);
        const result2 = await postOrderWithCardServices(findOrder);
            if(result2){
                const result = await updateOrderPaymentSuccessService(transactionId);
                if (result?.modifiedCount > 0) {
                    return res.redirect(`http://localhost:3000/payment-success/${transactionId}`)
                } else {
                    throw new ApiError(400, 'Order Update failed !');
                }
            }else{
                throw new ApiError(400, 'Order confirm failed !');
            } 
    } catch (error) {
        next(error);
    }
}

// Payment fail
exports.postPaymentFailOrderInfo = async (req, res, next) => {
    try {
        const transactionId = req.params.transactionId
        const result = await deleteOrderPaymentFailService(transactionId);
        if (result?.deletedCount > 0) {
            return res.redirect(`http://localhost:3000/payment-fail/${transactionId}`)
        } else {
            throw new ApiError(400, 'Order delete failed !');
        }
    } catch (error) {
        next(error);
    }
}

// Payment Cancel
exports.postPaymentCancelOrderInfo = async (req, res, next) => {
    try {
        const transactionId = req.params.transactionId
        const result = await deleteOrderPaymentFailService(transactionId);
        if (result?.deletedCount > 0) {
            return res.redirect(`http://localhost:3000/checkout`)
        } else {
            throw new ApiError(400, 'Order delete Canceled !');
        }
    } catch (error) {
        next(error);
    }
}

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
            totalPrice += (orderItem.price * orderItem.quantity) + order.shipping_price;
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
