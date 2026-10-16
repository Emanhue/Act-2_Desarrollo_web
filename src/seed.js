// Carga experiencias de ejemplo en MongoDB.
//   npm run seed            -> inserta solo si la colección está vacía
//   npm run seed -- --reset -> borra la colección y vuelve a insertar
require("dotenv").config();
const mongoose = require("mongoose");
const Experiencia = require("./models/Experiencia");
const datos = require("./data/experiencias.seed");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hoja_de_vida_hollman";
const reset = process.argv.includes("--reset");

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado a la base de datos:", mongoose.connection.name);

    if (reset) {
      await Experiencia.deleteMany({});
      console.log("Colección vaciada.");
    } else if ((await Experiencia.countDocuments()) > 0) {
      console.log("La colección ya tiene datos. Usa `npm run seed -- --reset` para reemplazarlos.");
      return;
    }

    const creadas = await Experiencia.insertMany(datos);
    console.log(`Se insertaron ${creadas.length} experiencias de ejemplo.`);
  } catch (err) {
    console.error("Error en el seed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
