import CartRepository from "../repositories/cart.repository.js";
import ProductService from "./product.service.js";
import { ApiError } from "../utils/apiError.js";

const cartRepository = new CartRepository();
const productService = new ProductService();

export default class CartService {
    async getCartById(id) {
        const cart = await cartRepository.getCartById(id);
        if (!cart) throw new ApiError(404, 'Carrito no encontrado');
        return cart;
    }

    async createCart(cartData) {
        return await cartRepository.createCart(cartData);
    }

    async addProductToCart(cartId, productId) {
        const cart = await this.getCartById(cartId);
        await productService.getProductById(productId);
        const existingProduct = cart.products.find(p => {
            const prodId = p.product._id ? p.product._id.toString() : p.product.toString();
            return prodId === productId;
        });
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }
        await cartRepository.saveCart(cart);
        return cart;
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await this.getCartById(cartId);
        const index = cart.products.findIndex(p => p.product.toString() === productId);
        if (index === -1) throw new ApiError(404, 'Producto no está en el carrito');
        cart.products.splice(index, 1);
        await cartRepository.saveCart(cart);
        return cart;
    }

    async updateCart(cartId, cartData) {
        await this.getCartById(cartId);
        return await cartRepository.updateCart(cartId, cartData);
    }

    async updateProductQuantity(cartId, productId, quantity) {
        if (quantity < 1) throw new ApiError(400, 'La cantidad debe ser mayor o igual a 1');
        const cart = await this.getCartById(cartId);
        const product = cart.products.find(p => p.product.toString() === productId);
        if (!product) throw new ApiError(404, 'Producto no está en el carrito');
        product.quantity = quantity;
        await cartRepository.saveCart(cart);
        return cart;
    }

    async deleteCart(cartId) {
        await this.getCartById(cartId);
        return await cartRepository.deleteCart(cartId);
    }
} 