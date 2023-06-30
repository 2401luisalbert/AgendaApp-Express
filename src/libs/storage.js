import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

import path from 'path'; // Importar el módulo path

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    const directory = ('public/img')// Directorio de destino de los archivos subidos

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
