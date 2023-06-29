import { Router } from "express";
import { register, login, logout, verifyToken, updateRegister } from '../controllers/auth.controller.js';
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { loginSchema, registerSchema, updateUserSchema } from "../schemas/auth.schema.js";
import { upload } from "../libs/storage.js";

const authRouter = Router();

// Ruta para registrar un usuario
authRouter.post('/register', validateSchema(registerSchema), register);

// Ruta para actualizar un usuario
authRouter.put('/updateRegister/:id', upload.single("image_Url"), validateSchema(updateUserSchema), updateRegister);

// Ruta para iniciar sesión
authRouter.post('/login', validateSchema(loginSchema), login);

// Ruta para cerrar sesión
authRouter.post('/logout', logout);

// Ruta para verificar el token de autenticación
authRouter.get('/verify', verifyToken);

export default authRouter;
