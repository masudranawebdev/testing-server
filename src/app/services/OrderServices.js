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
exports.postOrderWithCardServices = async (data) => {

    const createOrder = await OrderModel.create(data);
    
    if(!createOrder){
        throw new ApiError(400, 'Order Added Failed !')
    }

    const { productId, order } = data;

    const updatePromises = order.map(async (orderItem) => {
        const updatedSizeVariation = await ProductModel.findOneAndUpdate(
            {
                _id: productId,
                'size_variation._id': orderItem.size_variation,
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

    // Return the result
    return createOrder;
};

// delete Order
exports.deleteOrderWithOutCardServices = async (id) => {
    const order = await OrderModel.deleteOne({ _id: id });
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
