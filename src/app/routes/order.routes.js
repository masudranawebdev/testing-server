const express = require("express");
const { postOrder, getAllOrder, getAOrder, deleteAOrderInfo, getSearchOrderInfo, getTotalOrderInfo } = require("../controllers/order.controllers");
const router = express.Router();

// get post delete and update Order Item
router.route('/').get(getAllOrder).post(postOrder).delete(deleteAOrderInfo);

// get search Order
router.route('/totalOrder').get(getTotalOrderInfo)

// get search Order
router.route('/searchOrder/:term').get(getSearchOrderInfo)

// get single Order
router.route('/:email').get(getAOrder)

const OrderRoutes = {
    router
};

module.exports = OrderRoutes;