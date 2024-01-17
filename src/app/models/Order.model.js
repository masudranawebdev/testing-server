const mongoose = require("mongoose");

// Order Schema and connect DB collection
const orderSchema = new mongoose.Schema({
    userInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        type: String
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    payment_type: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
    },
    orderId: {
        type: String,
        required: true
    },
    order: [
        {
            productId: {
                type: String,
                required: true
            },
            size_variationId: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            color: {
                type: String,
                required: true
            },
            size: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            thumbnail_image:  {
                type: String,
                required: true
            },
        }
    ]
},
{
    timestamps: true
})

const OrderModel = mongoose.model("orders", orderSchema);

module.exports = OrderModel;

// type= paid, unpaid
// status: pending, success initially pending
// payment type = online, cash on delivery