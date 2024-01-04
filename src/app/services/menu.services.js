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

// Delete a Menu
exports.deleteMenuServices = async (id) => {
    const Menu = await MenuModel.deleteOne({ _id: id }, {
        runValidators: true
    });
    return Menu;
};
