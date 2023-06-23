import app from "./app.js";
import { connectDB } from "./db.js";

const PUERTO = 3000;

// Conectarse a la base de datos
connectDB();

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PUERTO, () => {
  console.log(`>>> Servidor escuchando en el puerto ${PUERTO} 👍`);
});
