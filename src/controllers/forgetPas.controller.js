import { text } from "express";
import User from "../models/user.model.js";
import nodemailer from 'nodemailer';

export const forgetPass = async (req, res) => {
    const CURP  = req.body.CURP;
    try {
        const userFoundEmail = await User.findOne({ CURP });
        console.log(userFoundEmail)

        if (!userFoundEmail) {
            return res.status(400).json({ error: "El curp que ingreso no existe." });
        }
         
        enviarmail(userFoundEmail.email, userFoundEmail.name, userFoundEmail.password);
        return res.status(200).json({
            id: userFoundEmail._id,
            name: userFoundEmail.name,
            curp: userFoundEmail.CURP,
            email: userFoundEmail.email,
            password: userFoundEmail.password
          });

        
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error en el servidor." });
    }
};

const enviarmail= async(correo, nombre, password)=>{
    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth:{
            user: 'aqui va el correo que les pase',
            pass: 'aqui va la contraseña del correo '
        }
    }

    let cuerpo = 'Hola ' + nombre.toUpperCase() + ', \n \n';
    cuerpo += '¿Olvidaste tu contraseña? \n'
    cuerpo += 'No te preocupes, tu contraseña es: ' + password + '. \n\n\n\n'
    cuerpo += 'Saludos, recuerda manter tus datos actualizados.\n'

    const mensaje = {
        from: 'yo',
        to: correo,
        subject: 'Reseteo de contraseña',
        text: cuerpo
    }
    const trasport = nodemailer.createTransport(config);

    const info = await trasport.sendMail(mensaje);

    console.log(info);

}