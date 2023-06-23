export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body) // Validar el cuerpo de la solicitud utilizando el esquema proporcionado
        next() // Pasar al siguiente controlador de la ruta si la validación es exitosa
    } catch (error) {
        return res.status(400).json(error.errors.map((error) => error.message)) // En caso de error de validación, devolver una respuesta con los mensajes de error
    }
}
