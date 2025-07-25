import { Router } from "express";
import CartController from "../controllers/cart.controller.js";
import { validateBody, validateObjectId } from "../middlewares/index.js";

const cartController = new CartController();
const router = Router();

router.get('/:id', validateObjectId, cartController.getCartById);
router.post('/', validateBody, cartController.createCart);
router.post('/:id/product/:pid', validateObjectId, cartController.addProductToCart);
router.delete('/:id/product/:pid', validateObjectId, cartController.removeProductFromCart);
router.put('/:id', validateObjectId, validateBody, cartController.updateCart);
router.put('/:id/product/:pid', validateObjectId, validateBody, cartController.updateProductQuantity);
router.delete('/:id', validateObjectId, cartController.deleteCart);

export default router; 