import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
            min: 1
        }
    }],
    total: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

export default cartModel; 