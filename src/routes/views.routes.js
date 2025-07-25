import { Router } from "express";
import { redirectIfAuthenticated, redirectIfNotAuthenticated } from "../middlewares/auth.js";

const router = Router();

router.get('/cart', (req, res) => {
  res.render('cart');
});

router.get('/products/:id', (req, res) => {
  res.render('product');
});

router.get('/register', redirectIfAuthenticated, (req, res) => {
    res.render('register');
});

router.get('/login', redirectIfAuthenticated, (req, res) => {
    res.render('login');
});

router.get('/index', redirectIfNotAuthenticated, (req, res) => {
    res.render('index');
});

router.get('/failure', (req, res) => {
    res.send('Fallo en la autenticación. Vuelve a intentarlo.');
});

router.get('/forgot-password', (req, res) => {
  res.render('forgot-password');
});

router.get('/reset-password/:token', (req, res) => {
  res.render('reset-password', { token: req.params.token });
});

export default router;