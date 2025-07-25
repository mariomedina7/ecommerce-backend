import CartService from "../services/cart.service.js";

const cartService = new CartService();

export default class CartController {
    async getCartById(req, res, next) {
        try {
            const { id } = req.params;
            const cart = await cartService.getCartById(id);
            res.json({ status: 'success', cart });
        } catch (error) {
            next(error);
        }
    }

    async createCart(req, res, next) {
        try {
            const cartData = req.body;
            const newCart = await cartService.createCart(cartData);
            res.status(201).json({ status: 'success', payload: newCart, message: 'Carrito creado exitosamente' });
        } catch (error) {
            next(error);
        }
    }

    async addProductToCart(req, res, next) {
        try {
            const { id, pid } = req.params;
            const updatedCart = await cartService.addProductToCart(id, pid);
            res.json({ status: 'success', payload: updatedCart, message: 'Producto agregado al carrito' });
        } catch (error) {
            next(error);
        }
    }

    async removeProductFromCart(req, res, next) {
        try {
            const { id, pid } = req.params;
            const updatedCart = await cartService.removeProductFromCart(id, pid);
            res.json({ status: 'success', payload: updatedCart, message: 'Producto eliminado del carrito' });
        } catch (error) {
            next(error);
        }
    }

    async updateCart(req, res, next) {
        try {
            const { id } = req.params;
            const cartData = req.body;
            const updatedCart = await cartService.updateCart(id, cartData);
            res.json({ status: 'success', payload: updatedCart, message: 'Carrito actualizado' });
        } catch (error) {
            next(error);
        }
    }

    async updateProductQuantity(req, res, next) {
        try {
            const { id, pid } = req.params;
            const { quantity } = req.body;
            const updatedCart = await cartService.updateProductQuantity(id, pid, quantity);
            res.json({ status: 'success', payload: updatedCart, message: 'Cantidad actualizada' });
        } catch (error) {
            next(error);
        }
    }

    async deleteCart(req, res, next) {
        try {
            const { id } = req.params;
            await cartService.deleteCart(id);
            res.json({ status: 'success', message: 'Carrito eliminado exitosamente' });
        } catch (error) {
            next(error);
        }
    }
} 