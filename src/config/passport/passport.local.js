import passport from 'passport';
import local from 'passport-local';
import userModel from '../../models/userModel.js';
import cartModel from '../../models/cartModel.js';
import { createHash, isValidPassword } from '../../utils/auth.js';

const LocalStrategy = local.Strategy;

const initializePassportLocal = () => {
    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        }, 
        async (req, userEmail, password, done) => {
            const { first_name, last_name, age } = req.body;
            try {
                let user = await userModel.findOne({ email: userEmail });
                if (user) return done(null, false, { message: 'El usuario ya existe'});

                const newUser = {
                    first_name,
                    last_name,
                    age,
                    email: userEmail,
                    password: createHash(password)
                }

                let result = await userModel.create(newUser);
                
                const newCart = await cartModel.create({
                    user: result._id,
                    products: [],
                    total: 0
                });
                
                await userModel.findByIdAndUpdate(result._id, { cart: newCart._id });
                
                const userWithCart = await userModel.findById(result._id).populate('cart');
                
                return done(null, userWithCart);
            } catch (error) {
                return done("Error al crear el usuario: " + error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    
    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user);
    });

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                let user = await userModel.findOne({ email: email });
                if (!user) {
                    return done(null, false, { message: 'Usuario no registrado' });
                }

                if (!isValidPassword(password, user)) {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }

                return done(null, user);
            } catch (error) {
                return done("Error al iniciar sesión: " + error);
            }
        }
    ))
}

export default initializePassportLocal;