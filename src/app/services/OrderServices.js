const ApiError = require("../../errors/ApiError");
const OrderModel = require("../models/Order.model");
const ProductModel = require("../models/Product.model");

// Find All Order
exports.getAllOrderService = async (limit, skip) => {
    const getAllOrderData = await OrderModel.find({}).sort({ "_id": -1 }).skip(skip).limit(limit).populate('userInfo')
    return getAllOrderData;
}

// Find A Order
exports.getAOrderService = async (email) => {
    const getAOrderData = await OrderModel.find({email: email}).sort({ "_id": -1 }).populate('userInfo')
    return getAOrderData;
}

// Add A Order
exports.postOrderServices = async (data) => {
    const createOrder = await OrderModel.create(data);
    return createOrder;
}

// Add A Order by card

exports.postCheckOrderWithCardServices = async (data) => {
    const { order } = data;

    // Start the transaction for the update
    let updateCheck = 1;

    // Execute the updates
    const updatePromises2 = order.map(async (orderItem) => {
        const product = await ProductModel.findOne({
            _id: orderItem.productId,
            'size_variation._id': orderItem.size_variationId,
        });

        if (!product) {
            throw new ApiError(400, 'Product not found!');
        }

        const updatedQuantity = product.size_variation.find(
            (variation) => variation._id.toString() === orderItem.size_variationId
        ).quantity - orderItem.quantity;

        if (updatedQuantity < 0) {
            updateCheck = 0;
        }
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises2);

    return updateCheck;
};


exports.postOrderWithCardServices = async (data) => {

    const createOrder = await OrderModel.create(data);
    
    if(!createOrder){
        throw new ApiError(400, 'Order Added Failed !')
    }

    const { order } = data;

    const updatePromises = order.map(async (orderItem) => {
        const updatedSizeVariation = await ProductModel.findOneAndUpdate(
            {
                _id: orderItem.productId,
                'size_variation._id': orderItem.size_variationId,
            },
            {
                $inc: {
                    'size_variation.$.quantity': -1 * orderItem.quantity,
                },
            },
            {
                new: true,
            }
        );

        return updatedSizeVariation;
    });

    // Wait for all updates to complete
    const updatedSizeVariations = await Promise.all(updatePromises);

    return updatedSizeVariations;
}

// delete Order
exports.deleteOrderWithOutCardServices = async (id) => {
    const order = await OrderModel.deleteOne({ _id: id });
    return order;
}

// get all Order
exports.getAllOrderInfoService = async () => {
    const order = await OrderModel.find({ });
    return order;
}

// search Order
exports.getSearchOrderService = async (searchData) => {
    const order = await OrderModel.find({ email: searchData }).populate('userInfo');
    return order;
}

// Delete a Order
// exports.deleteOrderWithOutCardServices = async (data) => {

//     const { productId, order } = data;

//     const deletePromises = order.map(async (orderItem) => {
//         const deletedSizeVariation = await ProductModel.findOneAndUpdate(
//             {
//                 _id: productId,
//             },
//             {
//                 $pull: {
//                     'size_variation': { _id: orderItem.size_variation },
//                 },
//             },
//             {
//                 new: true,
//             }
//         );

//         return deletedSizeVariation;
//     });

//     // Wait for all deletions to complete
//     const deletedSizeVariations = await Promise.all(deletePromises);

//     // Return the result
//     return deletedSizeVariations;
// };
