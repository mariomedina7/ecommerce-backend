import passport from "passport";
import jwt from "passport-jwt"
import { cookieExtractor } from "../../middlewares/auth.js";
import { JWT_CONFIG } from "../config.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializeJwt = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([
        ExtractJWT.fromAuthHeaderAsBearerToken(),
        cookieExtractor
        ]),
        secretOrKey: JWT_CONFIG.SECRET
    }, async (payload, done) => {
        try {
            return done(null, payload);
        } catch (error) {
            return done(error)
        }
    })
    )
}

export default initializeJwt;