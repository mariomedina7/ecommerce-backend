import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    stock: Number,
    category: String,
    thumbnails: [{
        type: String,
        default: []
    }],
    status: Boolean
})

const productModel = mongoose.model(productsCollection, productSchema);

export default productModel;