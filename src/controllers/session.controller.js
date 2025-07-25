import AuthService from "../services/auth.service.js";

const authService = new AuthService();

export default class SessionController {
    async register(req, res, next) {
        try 
        {
            const user = await authService.register(req.user)
            return res.status(201).json({
                status: 'success',
                payload: user,
                cartId: req.user.cart._id,
                message: 'Usuario registrado exitosamente'
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try 
        {
            const { token } = await authService.login(req.user);
            return res.cookie('jwt', token, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 60 * 60 * 100
            }).json({ status: 'success', message: 'Inicio de sesión exitoso', token});
        } catch (error) {
            next(error);
        }
    }

    async current(req, res, next) {
        try 
        {
            return res.json ({ status: 'success', claims: req.user });
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try 
        {
            res.clearCookie('jwt', {
                httpOnly: true,
                sameSite: 'lax',
                path: '/'
              });
            return res.json({ status: 'success', message: 'Logout exitoso' });
        } catch (error) {
            next(error);
        }
    }
}