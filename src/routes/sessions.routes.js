import { Router } from "express";
import { passportCall, authorization } from "../middlewares/auth.js";
import SessionController from "../controllers/session.controller.js";

const sessionController = new SessionController();
const router = Router();

router.post('/register', passportCall('register'), sessionController.register);
router.post('/login', passportCall('login'), sessionController.login);
router.get('/current', passportCall('jwt'), authorization('ADMIN'), sessionController.current);
router.get('/logout', sessionController.logout);

export default router;