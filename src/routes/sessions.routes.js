import { Router } from "express";
import { passportCall, authorization } from "../middlewares/auth.js";
import { JWT_CONFIG } from "../config/config.js";
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', passportCall('register'), (req, res) => {
    const userResponse = req.user.toObject();
  
    return res.status(201).json({
        status: 'success',
        payload: userResponse,
        cartId: req.user.cart._id,
        message: 'Usuario registrado exitosamente'
    });
})

router.post('/login', passportCall('login'), (req, res) => {
    const payload = { sub: req.user._id, first_name: req.user.first_name, last_name: req.user.last_name, age: req.user.age, email: req.user.email, password: req.user.password, role: req.user.role, cart: req.user.cart };
    const token = jwt.sign(payload, JWT_CONFIG.SECRET, { expiresIn: JWT_CONFIG.EXPIRES_IN });

    return res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 100
    }).json({ message: 'Inicio de sesion exitoso', token});
});

router.get('/current', passportCall('jwt'), authorization('USER'), (req, res) => {
    return res.json ({ user: req.user });
})

router.get('/logout', (req, res) => {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/'
    });
    return res.json({ message: 'Logout exitoso' });
});

export default router;