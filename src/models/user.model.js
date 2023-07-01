import mongoose from "mongoose";

// Definición del esquema del usuario
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    CURP: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    confirmPassword: {
        type: String,
        required: true,
        trim: true
    },
    INE_CIC: {
        type: String,
        required: false,
        trim: true,
    },
    INE_ID: {
        type: String,
        required: false,
        trim: true,
    },
    address: {
        type: String,
        required: false,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: false,
        trim: true,
    },
    image_Profile: {
        type: String,
        required: false
    },
    rol: {
        type: String,
        required: false,
        default: "user"
    },
    complement: {
        type: Boolean,
        required: false,
        default: false
    }
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema)