const express = require("express");
const { getAllProduct, postProduct, updateProductInfo, deleteAProductInfo, getAProduct } = require("../controllers/product.controllers");
const { ProductImageUpload } = require("../../helpers/product.image");
const router = express.Router();

// get post delete and update Product Item
router.route('/').get(getAllProduct).post(ProductImageUpload.fields([{ name: 'product', maxCount: 1 }]), postProduct).patch(ProductImageUpload.fields([{ name: 'product', maxCount: 1 }]), updateProductInfo).delete(deleteAProductInfo)

router.route('/:id').get(getAProduct)

const ProductRoutes = {
    router
};

module.exports = ProductRoutes;