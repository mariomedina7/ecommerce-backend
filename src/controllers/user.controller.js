import UserService from '../services/user.service.js';

const userService = new UserService();

export default class UserController {
    async getUsers(req, res, next) {
        try 
        {
            const users = await userService.getAllUsers();
            res.json({ status: 'success', users });
        } catch (error) {
            next(error);
        }
    }
    
    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);            
            res.json({ status: 'success', user });
        } catch (error) {
            next(error);
        }
    }

    async createUser(req, res, next) {
        try 
        {
            const { first_name, last_name, age, email, password, role } = req.body;
            const user = { first_name, last_name, age, email, password, role }
    
            const { user: userResponse, cartId } = await userService.createUser(user);
    
            res.status(201).json({
                status: 'success',
                payload: userResponse,
                cartId,
                message: 'Usuario creado exitosamente'
            });
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req, res, next) {
        try 
        {
            const { id } = req.params;
            const { first_name, last_name, age, email, password, role } = req.body;
    
            const updateData = { first_name, last_name, age, email, password, role };
    
            const updatedUser = await userService.updateUser(id, updateData);
    
            res.json({
                status: 'success',
                payload: updatedUser,
                message: 'Usuario actualizado exitosamente'
            });
        } catch (error) {
            next(error);
        } 
    }

    async deleteUser(req, res, next) {
        try 
        {
            const { id } = req.params;             
            await userService.deleteUser(id);
    
            res.json({
                status: 'success',
                message: 'Usuario eliminado exitosamente'
            });      
        } catch (error) {
            next(error);
        } 
    }
 
    async forgotPassword(req, res, next) {
        try {
            const { email } = req.body;
            await userService.forgotPassword(email);
            
            res.json({ status: 'success', message: 'Se ha enviado un email para restablecer la contraseña' });
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { token } = req.params;
            const { password } = req.body;
            await userService.resetPassword(token, password);
            
            res.json({ status: 'success', message: 'Contraseña restablecida correctamente' });
        } catch (error) {
            next(error);
        }
    }
}