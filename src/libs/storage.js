import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const palabraCortada = "libs"
    const nuevaRuta = __dirname

    const rutaFinal = palabraCortada.fil


    const directory = nuevaRuta; // Directorio de destino de los archivos subidos

    // Verificar si el directorio existe, si no, crearlo
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

export const upload = multer({ storage: storage });
