const mongoose = require("mongoose");

// Product Schema and connect DB Product
const productSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount_price: {
        type: Number
    },
    color: {
        type: String,
        required: true
    },
    size_variation: [
        {
            size: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: Number,
            discount_price: Number
        }
    ],
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menus',
        required: true
    },
    SubCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategories',
        required: true
    },
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'collections',
    },
    styleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'styles',
    },
    featureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'features',
    },
    galleryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'galleries',
    },
},
{
    timestamps: true
})

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;