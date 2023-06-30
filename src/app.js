import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/profile.routes.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


// Carga las variables de entorno desde un archivo .env
import dotenv from "dotenv";
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicPath = path.join(__dirname, '../public');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Agregar las líneas de registro de rutas absolutas aquí
console.log("Absolute path to public folder:", publicPath);
console.log("Absolute path to UTM.jpg:", path.join(publicPath, 'UTM.png'));

app.use(express.static(publicPath));

app.use("/api", authRouter);
app.use("/api", profileRouter);

export default app;
