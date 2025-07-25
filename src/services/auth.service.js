import UserDTO from "../dtos/user.dto.js";
import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from "../config/config.js";

export default class AuthService {
    async register(user) {
        return new UserDTO(user.toObject());
    }

    async login(user) {
        const claims = {
            sub: user.id,
            role: user.role
        }

        const token = jwt.sign(claims, JWT_CONFIG.SECRET, {
            expiresIn: JWT_CONFIG.EXPIRES_IN
        });

        return {
            token
        };
    }
}