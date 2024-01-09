const mongoose = require("mongoose");

// Category Schema and connect DB collection
const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    category_image: {
        type: String,
        required: true,
    },
    menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menus',
    },
    slug: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const CategoryModel = mongoose.model("categories", categorySchema);

module.exports = CategoryModel;