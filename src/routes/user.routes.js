import { Router } from 'express';
import userModel from '../models/userModel.js';
import cartModel from '../models/cartModel.js';
import {
    validateBody, 
    validateRequiredFields,
    validateEmail,
    asyncHandler 
} from '../middlewares/index.js';
import { createHash } from '../utils/auth.js';

const router = Router();

router.get('/',
    asyncHandler(async (req, res) => {
        const users = await userModel.find();
        
        res.json({
            status: 'success',
            payload: users
        });
    })
);

router.get('/:id', 
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                status: 'error',
                message: 'ID de usuario inválido'
            });
        }

        const user = await userModel.findById(id);
        
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        res.json({
            status: 'success',
            payload: user
        });
    })
);

router.get('/:id/cart',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                status: 'error',
                message: 'ID de usuario inválido'
            });
        }

        const user = await userModel.findById(id).populate('cart');
        
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        if (!user.cart) {
            return res.status(404).json({
                status: 'error',
                message: 'El usuario no tiene un carrito asociado'
            });
        }

        res.json({
            status: 'success',
            payload: user.cart
        });
    })
);

router.post('/', 
    validateBody,
    validateRequiredFields(['first_name', 'last_name', 'age', 'email', 'password']),
    validateEmail,
    asyncHandler(async (req, res) => {
        const { first_name, last_name, age, email, password, role } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'El email ya está registrado'
            });
        }

        if (age && (age < 0 || age > 120)) {
            return res.status(400).json({
                status: 'error',
                message: 'La edad debe estar entre 0 y 120 años'
            });
        }

        const newUser = await userModel.create({
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
            role
        });

        const newCart = await cartModel.create({
            user: newUser._id,
            products: [],
            total: 0
        });

        await userModel.findByIdAndUpdate(newUser._id, { cart: newCart._id });

        const userWithCart = await userModel.findById(newUser._id).populate('cart');

        const userResponse = userWithCart.toObject();

        res.status(201).json({
            status: 'success',
            payload: userResponse,
            cartId: newCart._id,
            message: 'Usuario creado exitosamente'
        });
    })
);

router.put('/:id',
    validateBody,
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { first_name, last_name, age, email, password, role } = req.body;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                status: 'error',
                message: 'ID de usuario inválido'
            });
        }

        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        if (email && email !== user.email) {
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    status: 'error',
                    message: 'El email ya está registrado'
                });
            }
        }

        if (age && (age < 0 || age > 120)) {
            return res.status(400).json({
                status: 'error',
                message: 'La edad debe estar entre 0 y 120 años'
            });
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            { first_name, last_name, age, email, password: createHash(password), role },
            { new: true, runValidators: true }
        );

        res.json({
            status: 'success',
            payload: updatedUser,
            message: 'Usuario actualizado exitosamente'
        });
    })
);

router.delete('/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                status: 'error',
                message: 'ID de usuario inválido'
            });
        }

        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        await userModel.findByIdAndDelete(id);

        res.json({
            status: 'success',
            message: 'Usuario eliminado exitosamente'
        });
    })
);

export default router;