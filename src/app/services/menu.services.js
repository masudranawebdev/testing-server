const MenuModel = require("../models/Menu.model");

// Find A Menu is Exist ?
exports.checkAMenuExits = async (menu) => {
    const FindMenu = await MenuModel.findOne({ menu: menu });
    return FindMenu;
}

// Find All Menu
exports.getAllMenuService = async () => {
    const FindMenu = await MenuModel.find({});
    return FindMenu;
}

// Add A Menu
exports.postMenuServices = async (data) => {
    const createMenu = await MenuModel.create(data);
    return createMenu;
}

// Update a Menu
exports.updateMenuServices = async(data) =>{
    const updateMenuInfo = await MenuModel.findOne({_id: data?._id})
    const Menu = await MenuModel.updateOne(updateMenuInfo, data, {
    runValidators: true });
    return Menu;
}

// Delete a Menu
exports.deleteMenuServices = async (id) => {
    const Menu = await MenuModel.deleteOne({ _id: id }, {
        runValidators: true
    });
    return Menu;
};
