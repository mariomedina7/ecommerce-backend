import CartDAO from "./dao/cart.dao.js";

const cartDAO = new CartDAO();

export default class CartRepository {
    async getCartById(id) {
        return await cartDAO.getCartById(id);
    }

    async createCart(cartData) {
        return await cartDAO.createCart(cartData);
    }

    async updateCart(cartId, cartData) {
        return await cartDAO.updateCart(cartId, cartData);
    }

    async deleteCart(cartId) {
        return await cartDAO.deleteCart(cartId);
    }

    async saveCart(cart) {
        return await cartDAO.saveCart(cart);
    }
} 