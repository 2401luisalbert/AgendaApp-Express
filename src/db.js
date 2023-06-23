import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // Establecer la conexión con la base de datos MongoDB
        await mongoose.connect("mongodb://127.0.0.1:27017/agendApp");
        console.log(">>> DB is connected");
    } catch (error) {
        console.log(error);
    }
};
