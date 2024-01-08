const mongoose = require("mongoose");

// Menu Schema and connect DB collection
const menuSchema = new mongoose.Schema({
    menu: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const MenuModel = mongoose.model("menus", menuSchema);

module.exports = MenuModel;