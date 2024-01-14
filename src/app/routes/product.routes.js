const express = require("express");
const { getAllProduct, postProduct, updateProductInfo, deleteAProductInfo, getAProduct, getSearchProductInfo } = require("../controllers/product.controllers");
const { ProductImageUpload } = require("../../helpers/product.image");
const router = express.Router();

// get post delete and update Product Item
router.route('/').get(getAllProduct).post(postProduct).patch(ProductImageUpload.fields([{ name: 'product', maxCount: 1 }]), updateProductInfo).delete(deleteAProductInfo)

// get search product
router.route('/searchProduct/:term').get(getSearchProductInfo)

// get single product
router.route('/:id').get(getAProduct)

const ProductRoutes = {
    router
};

module.exports = ProductRoutes;