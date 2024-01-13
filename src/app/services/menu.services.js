const CategoryModel = require("../models/Category.model");
const MenuModel = require("../models/Menu.model");
const ProductModel = require("../models/Product.model");
const Sub_CategoryModel = require("../models/Sub.category.model");

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

// Find A Menu is Exist in a category ?
exports.checkAMenuExitsInCategory = async (id) => {
    const findMenu = await CategoryModel.find({ menuId: id }); 
    return findMenu;
}

// Find A Menu is Exist in a sub category ?
exports.checkAMenuExitsInSubCategory = async (id) => {
    const FindMenu = await Sub_CategoryModel.find({ menuId: id });
    return FindMenu;
}

// Find A Menu is Exist in a products ?
exports.checkAMenuExitsInProducts = async (id) => {
    const FindMenu = await ProductModel.find({ menuId: id });
    return FindMenu;
}

// Delete a Menu
exports.deleteMenuServices = async (id) => {
    const Menu = await MenuModel.deleteOne({ _id: id }, {
        runValidators: true
    });
    return Menu;
};

// Find A Menu is Exist when update ?
exports.checkAMenuExitsInMenu = async (menu) => {
    const findMenu = await MenuModel.findOne({ menu: menu }); 
    return findMenu;
}

// Edit a Menu
exports.updateMenuServices = async (data) => {
    const Menu = await MenuModel.updateOne({ _id: data?._id }, data, {
        runValidators: true
    });
    return Menu;
};

// Find All Category and subcategory for hover
exports.getAllCategoryAndSubcategoryServices = async (menuId) => {
    const FindCategory = await CategoryModel.find({ menuId: menuId });

        if (FindCategory.length === 0) {
            // No categories found for the given menuId
            return null;
        }

        const categoryAndSubcategories = [];

        for (const category of FindCategory) {
            const categoryId = category._id;

            const subcategories = await Sub_CategoryModel.find({
                menuId: menuId,
                categoryId: categoryId
            });

            categoryAndSubcategories.push({
                category: category,
                subcategories: subcategories
            });
        }

        return categoryAndSubcategories;
}