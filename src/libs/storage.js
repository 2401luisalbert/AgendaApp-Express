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
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    try {
      const ext = file.originalname.split(".").pop().toLowerCase();
      if (ext !== "jpg" && ext !== "jpeg") {
        const errorMessage = "Solo se permiten archivos en formato JPG o PNG.";
        throw new Error(errorMessage);
      }

      cb(null, `${Date.now()}.${ext}`);
    } catch (error) {
      cb(error);
      console.log("chido")
    }
  },
});

export const upload = multer({ storage: storage });

