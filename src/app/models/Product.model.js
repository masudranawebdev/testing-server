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
        required: true,
        unique: true
    },
    related: {
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
    colorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'colors',
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
    thumbnail_image: {
        type: String,
        required: true
    },
    hover_image: {
        type: String,
        required: true
    },
    images: [
        {
            image: String
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
    subCategoryId: {
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
    }
},
{
    timestamps: true
})

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;