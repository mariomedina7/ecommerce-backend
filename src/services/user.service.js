import UserDTO from "../dtos/user.dto.js";
import UserRepository from "../repositories/user.repository.js";
import CartService from "./cart.service.js";
import { randomBytes } from "crypto";
import { ApiError } from "../utils/apiError.js";
import { createHash, isValidPassword } from '../utils/auth.js';
import { sendPasswordResetEmail } from '../utils/email.js';
import { JWT_CONFIG } from "../config/config.js";

const userRepository = new UserRepository();
const cartService = new CartService();

export default class UserService {
   async getAllUsers() {
        const users = await userRepository.getUsers();
        return users.map(user => new UserDTO(user));
   }

   async getUserById(userId) {
        const user = await userRepository.getUserById(userId);
        if(!user) throw new ApiError(404, 'Usuario no encontrado');
        return user;
   }

   async createUser(user) {
        const exists = await userRepository.getUserByEmail(user.email);
        if (exists) throw new ApiError(409, 'Email ya registrado');
        user.password = createHash(user.password);
        const userCreated = await userRepository.createUser(user);
        const newCart = await cartService.createCart({ user: userCreated._id, products: [], total: 0 });
        await userRepository.updateUser(userCreated._id, { cart: newCart._id });
        const userWithCart = await userRepository.getUserById(userCreated._id);
        return { user: new UserDTO(userWithCart), cartId: newCart._id };
   }

   async updateUser(userId, user){
        await this.getUserById(userId);
        if (user.email) {
            const existing = await this.getUserByEmail(user.email);
            if (existing && existing._id.toString() !== userId) {
              throw new ApiError(409, 'Email ya registrado');
            }
        }
        user.password = createHash(user.password);
        const userUpdated = await userRepository.updateUser(userId, user);
        return new UserDTO(userUpdated);
   }

   async deleteUser(userId) {
        await this.getUserById(userId);
        return await userRepository.deleteUser(userId);
   }

   async getUserByEmail(email) {
    return await userRepository.getUserByEmail(email);
   }

   async savePasswordResetToken(userId, token, expiresAt) {
    return await userRepository.savePasswordResetToken(userId, token, expiresAt);
   }

   async findValidPasswordResetToken(token) {
    return await userRepository.findValidPasswordResetToken(token);
   }

   async updatePassword(userId, newPassword) {
    const hashedPassword = createHash(newPassword);
    return await userRepository.updatePassword(userId, hashedPassword);
   }

   async deletePasswordResetToken(token) {
    return await userRepository.deletePasswordResetToken(token);
   }

   async resetPassword(token, newPassword) {
    if (!newPassword) {
      throw new ApiError(400, 'La nueva contraseña es requerida');
    }

    const resetToken = await this.findValidPasswordResetToken(token);
    if (!resetToken) {
      throw new ApiError(400, 'Token inválido o expirado');
    }

    const user = await this.getUserById(resetToken.user);
    if (!user) {
      throw new ApiError(404, 'Usuario no encontrado');
    }

    const isSamePassword = isValidPassword(newPassword, user);
    if (isSamePassword) {
      throw new ApiError(400, 'La nueva contraseña no puede ser igual a la anterior');
    }

    await this.updatePassword(user._id, newPassword);
    await this.deletePasswordResetToken(token);
  }

   async forgotPassword(email) {
    if (!email) {
      throw new ApiError(400, 'Email es requerido');
    }

    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new ApiError(404, 'Usuario no encontrado');
    }

    const token = randomBytes(20).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await this.savePasswordResetToken(user._id, token, expiresAt);
    await sendPasswordResetEmail(user.email, token);
  }
}