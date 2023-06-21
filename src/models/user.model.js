import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
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
    domicilio: {
        type: String,
        required: false,
        trim: true,
    },
    num_tel: {
        type: String,
        required: false,
        trim: true,
    },
    image_Url: {
        type: String,
        required: false
    },
    rol:{
        type: String,
        required: false,
        default:"user"
    }
})

export default mongoose.model('User', userSchema)