import { Router } from "express";
import { register, login, logout, profile, verifyToken } from '../controllers/auth.controller.js';
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const authRouter = Router();

// Ruta para registrar un usuario
authRouter.post('/register', validateSchema(registerSchema), register);

// Ruta para iniciar sesión
authRouter.post('/login', validateSchema(loginSchema), login);

// Ruta para cerrar sesión
authRouter.post('/logout', logout);

// Ruta para verificar el token de autenticación
authRouter.get('/verify', verifyToken);

// Ruta para obtener el perfil del usuario
authRouter.get('/profile', authRequired, profile);

export default authRouter;
