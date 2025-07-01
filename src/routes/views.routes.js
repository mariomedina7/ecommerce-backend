import { Router } from "express";

const router = Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/index', (req, res) => {
    res.send('Bienvenido!');
});

router.get('/failure', (req, res) => {
    res.send('Fallo en la autenticación. Vuelve a intentarlo.');
});

export default router;