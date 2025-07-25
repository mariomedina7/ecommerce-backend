import passport from 'passport'
import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/config.js';

export const passportCall = (strategy, options = { session: false }) => {
    return (req, res, next) => {
        passport.authenticate(strategy, options, (error, user, info) => {
            if (error) return next(error);
            if (!user) return res.status(401).json({ message: info?.message || 'No autorizado'});
            req.user = user;
            next();
        }) (req, res, next);
    }
}

export const authorization = (role) => {
    return (req, res, next) => {
        const allowedRoles = Array.isArray(role) ? role : [role];
        if (!req.user) return res.status(401).json({ message: 'No autenticado'});
        if (!allowedRoles.includes(req.user.role)) return res.status(403).json({ message: 'No autorizado'});
        next();
    }
}

export function cookieExtractor(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
}

export function redirectIfAuthenticated(req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
      try {
        jwt.verify(token, JWT_CONFIG.SECRET);
        return res.redirect('/index');
      } catch (err) {
        res.clearCookie('jwt');
      }
    }
    next();
}
  
export function redirectIfNotAuthenticated(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) {
      return res.redirect('/login');
    }
    try {
      req.user = jwt.verify(token, JWT_CONFIG.SECRET);
      return next();
    } catch (err) {
      res.clearCookie('jwt');
      return res.redirect('/login');
    }
}