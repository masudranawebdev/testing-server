const express = require("express");
const { getAllProduct, postProduct, updateProductInfo, deleteAProductInfo, getAProduct, getSearchProductInfo, getRelatedProductInfo } = require("../controllers/product.controllers");
const verifyToken = require("../../middleware/verify.token");
const router = express.Router();

// get post delete and update Product Item
router.route('/').get(getAllProduct).post(verifyToken, postProduct).patch(verifyToken, updateProductInfo).delete(verifyToken, deleteAProductInfo)

// get related product
router.route('/relatedProduct/same/:related').get(getRelatedProductInfo)

// get search product
router.route('/searchProduct/:term').get(getSearchProductInfo)

// get single product
router.route('/:slug').get(getAProduct)

const ProductRoutes = {
    router
};

module.exports = ProductRoutes;