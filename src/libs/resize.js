import { fileURLToPath } from 'url';
import sharp from 'sharp';
import path from "path";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const helperImg = async (filePath, fileName, size, userId) => {
  // Obtiene la ruta del directorio de salida donde se guardarán los archivos redimensionados
  const outputDir = path.resolve(__dirname, `../../public/img/${userId}`);
  // Obtiene la ruta del archivo redimensionado
  const outputPath = path.resolve(outputDir, fileName);
  // Obtiene la ruta del archivo redimensionado en la ruta temporal
  const tempPath = path.resolve(outputDir, `temp_${fileName}`);

  try {
    // Crea el directorio de salida si no existe
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Redimensiona la imagen y guarda en la ruta temporal
    await sharp(filePath)
      .resize(size, size)
      .toFile(tempPath);

    // Elimina el archivo original
    fs.unlinkSync(filePath);
    // Renombra el archivo redimensionado a la ruta de salida final
    fs.renameSync(tempPath, outputPath);

    console.log('Imagen redimensionada y reemplazada correctamente.');
  } catch (error) {
    console.error('Error al redimensionar la imagen:', error);
  }
};
