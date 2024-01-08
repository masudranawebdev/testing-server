const mongoose = require("mongoose");

// Product Schema and connect DB Product
const productSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;