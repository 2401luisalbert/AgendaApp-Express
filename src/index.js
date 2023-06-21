import app from "./app.js"
import { connectDB } from "./db.js"

const PUERTO = 3000

connectDB()
app.listen(PUERTO, ()=>{
    console.log(`>>> Servidor escuchando en el puerto ${PUERTO} 👍`)
})