import { Router } from 'express';
import { validateBody,  validateRequiredFields, validateObjectId, authorization, passportCall } from '../middlewares/index.js';
import ProductController from '../controllers/product.controller.js';

const productController = new ProductController();
const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', validateObjectId, productController.getProductById);
router.post('/', passportCall('jwt'), authorization('ADMIN'), validateBody, validateRequiredFields(['title', 'description', 'code', 'price', 'stock', 'category', 'thumbnails']), productController.createProduct);
router.put('/:id', passportCall('jwt'), authorization('ADMIN'), validateObjectId, validateBody, productController.updateProduct);
router.delete('/:id', passportCall('jwt'), authorization('ADMIN'), validateObjectId, productController.deleteProduct);

export default router;