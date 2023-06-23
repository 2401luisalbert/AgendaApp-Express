
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// Función para crear un token de acceso
export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload, // Datos del payload a incluir en el token
            TOKEN_SECRET, // Secreto utilizado para firmar el token
            {
                expiresIn: "1d" // Tiempo de expiración del token (1 día en este caso)
            },
            (err, token) => {
                if (err) {
                    reject(err); // Si hay un error en la creación del token, se rechaza la promesa con el error
                }
                resolve(token); // Si la creación del token es exitosa, se resuelve la promesa con el token generado
            }
        );
    });
}
