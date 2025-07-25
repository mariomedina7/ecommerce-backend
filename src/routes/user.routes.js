import { Router } from 'express';
import { validateBody,  validateRequiredFields, validateEmail, validateObjectId, validateAge } from '../middlewares/index.js';

import UserController  from '../controllers/user.controller.js';

const userController = new UserController();
const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', validateObjectId, userController.getUserById);
router.post('/', validateBody, validateEmail, validateAge, validateRequiredFields(['first_name', 'last_name', 'age', 'email', 'password']), userController.createUser);
router.put('/:id', validateObjectId, validateBody, validateAge, userController.updateUser);
router.delete('/:id', validateObjectId, userController.deleteUser);
router.post('/forgot-password', validateBody, validateRequiredFields(['email']), validateEmail, userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);

export default router;