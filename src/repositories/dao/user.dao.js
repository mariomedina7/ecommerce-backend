import userModel from "../../models/userModel.js";
import passwordResetTokenModel from "../../models/passwordResetTokenModel.js";

export default class UserDAO {
    async getUsers() {
        return await userModel.find();
    }

    async getUserById(userId) {
        return await userModel.findById(userId);
    }

    async getUserByEmail(email) {
        return await userModel.findOne({ email });
    }

    async savePasswordResetToken(userId, token, expiresAt) {
        await passwordResetTokenModel.deleteMany({ user: userId });
        return await passwordResetTokenModel.create({ user: userId, token, expiresAt });
    }

    async createUser(user) {
        return await userModel.create(user);
    }

    async updateUser(userId, user) {
        return await userModel.findByIdAndUpdate(userId, user, { new: true });
    }

    async deleteUser(userId) {
        return await userModel.findByIdAndDelete(userId);
    }

    async findValidPasswordResetToken(token) {
        try {
            const resetToken = await passwordResetTokenModel.findOne({ token });

            if (!resetToken) return null;
            if (resetToken.expiresAt < new Date()) return null;
            return resetToken;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async updatePassword(userId, hashedPassword) {
        return await userModel.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
    }

    async deletePasswordResetToken(token) {
        return await passwordResetTokenModel.deleteOne({ token });
    }
}