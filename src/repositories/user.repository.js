import UserDAO from "./dao/user.dao.js";

const userDAO = new UserDAO();

export default class UserRepository {
    async getUsers() {
        return await userDAO.getUsers();
    }

    async getUserById(userId) {
        return await userDAO.getUserById(userId);
    }

    async getUserByEmail(email) {
        return await userDAO.getUserByEmail(email);
    }

    async savePasswordResetToken(userId, token, expiresAt) {
        return await userDAO.savePasswordResetToken(userId, token, expiresAt);
    }

    async createUser(user) {
        return await userDAO.createUser(user);
    }

    async updateUser(userId, user){
        return await userDAO.updateUser(userId, user);
    }

    async deleteUser(userId){
        return await userDAO.deleteUser(userId);
    }

    async findValidPasswordResetToken(token) {
        return await userDAO.findValidPasswordResetToken(token);
    }

    async updatePassword(userId, hashedPassword) {
        return await userDAO.updatePassword(userId, hashedPassword);
    }

    async deletePasswordResetToken(token) {
        return await userDAO.deletePasswordResetToken(token);
    }
}