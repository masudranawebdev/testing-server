const express = require("express");
const { postOrder, getAllOrder, getAOrder, deleteAOrderInfo, getSearchOrderInfo, getTotalOrderInfo, UpdateAOrderInfo, postPaymentSuccessOrderInfo, postPaymentFailOrderInfo, postPaymentCancelOrderInfo } = require("../controllers/order.controllers");
const router = express.Router();

// get post delete and update Order Item
router.route('/').get(getAllOrder).post(postOrder).delete(deleteAOrderInfo).patch(UpdateAOrderInfo)

// get search Order
router.route('/totalOrder').get(getTotalOrderInfo)

// payment success route
router.route('/payment-success/:transactionId').post(postPaymentSuccessOrderInfo)

// payment fail route
router.route('/payment-fail/:transactionId').post(postPaymentFailOrderInfo)

// payment cancel route
router.route('/payment-cancel/:transactionId').post(postPaymentCancelOrderInfo)

// get search Order
router.route('/searchOrder/:term').get(getSearchOrderInfo)

// get single Order
router.route('/:email').get(getAOrder)

const OrderRoutes = {
    router
};

module.exports = OrderRoutes;