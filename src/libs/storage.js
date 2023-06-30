import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      const userId = req.params.id;
      const directory = `public/img/${userId}`;

      // Verificar si el directorio existe, si no, crearlo
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      cb(null, directory);
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop().toLowerCase();
    if (ext !== "jpg" && ext !== "jpeg") {
      return cb(new Error("Solo se permiten archivos en formato JPG o PNG."));
    }

    const destination = req.destination || ""; // Obtener el valor de req.destination si está definido, de lo contrario asignar una cadena vacía
    console.log("destination", destination)

    cb(null, `${Date.now()}.${ext}`);
  },
});

export const upload = multer({ storage: storage });

