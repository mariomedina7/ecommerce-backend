import cartModel from "../../models/cartModel.js";

export default class CartDAO {
    async getCartById(id) {
        return await cartModel.findById(id).populate('products.product');
    }

    async createCart(cartData) {
        return await cartModel.create(cartData);
    }

    async updateCart(cartId, cartData) {
        return await cartModel.findByIdAndUpdate(cartId, cartData, { new: true });
    }

    async deleteCart(cartId) {
        return await cartModel.findByIdAndDelete(cartId);
    }

    async saveCart(cart) {
        return await cart.save();
    }
} 