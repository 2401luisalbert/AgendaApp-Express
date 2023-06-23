// Importación de módulos y configuración de Express
import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Configuración de CORS para permitir solicitudes desde http://localhost:5173
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Registro de middlewares
app.use(morgan('dev')); // Middleware de registro de solicitudes en modo desarrollo
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(cookieParser()); // Middleware para analizar las cookies en las solicitudes

// Rutas
app.use("/api", authRouter); // Middleware para manejar las rutas relacionadas con la autenticación

export default app;
