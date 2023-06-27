import { Router } from "express";
import { profile } from "../controllers/profile.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const profileRouter = Router();

// Ruta para obtener el perfil del usuario
profileRouter.get('/profile',authRequired, profile);

export default profileRouter;