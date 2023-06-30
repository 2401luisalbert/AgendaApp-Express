import multer from "multer";
import fs from "fs";
import User from "../models/user.model.js";

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      const userId = req.params.id;
      const folderUser = await User.findById(userId);
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
    const ext = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

export const upload = multer({ storage: storage });
