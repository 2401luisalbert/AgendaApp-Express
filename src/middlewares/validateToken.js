import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// Middleware para verificar la autenticación del usuario
export const authRequired = (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        // Si no hay token en las cookies, se devuelve una respuesta de error 401 (No autorizado)
        return res.status(401).json({ message: "No token, authorization denied" })
    }

    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if (err) {
            // Si hay un error en la verificación del token, se devuelve una respuesta de error 403 (Prohibido)
            return res.status(403).json({ message: "Invalid token" })
        }

        // Si el token es válido, se almacena el usuario decodificado en el objeto de solicitud para su uso posterior
        req.user = decoded
        next() // Pasar al siguiente controlador de la ruta si la autenticación es exitosa
    })
}
