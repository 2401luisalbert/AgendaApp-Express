import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
    const { name, firstName, lastName, CURP, email, password } = req.body;
    try {
        // Verificar si el CURP ya está registrado
        const userFoundCurp = await User.findOne({ CURP });
        if (userFoundCurp) return res.status(400).json(["Este CURP ya está registrado"]);

        // Verificar si el correo ya está registrado
        const userFoundEmail = await User.findOne({ email });
        if (userFoundEmail) return res.status(400).json(["Este correo ya está registrado"]);

        // Generar hash de la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = new User({
            name,
            firstName,
            lastName,
            CURP,
            email,
            password: passwordHash,
            confirmPassword: passwordHash,
        });

        // Guardar el nuevo usuario en la base de datos
        const userSaved = await newUser.save();

        // Generar un token de acceso
        const token = await createAccessToken({ id: userSaved._id });

        // Establecer el token en una cookie
        res.cookie('token', token);

        // Enviar la respuesta con los datos del usuario
        res.json({
            id: userSaved._id,
            name: userSaved.name,
            firstName: userSaved.firstName,
            lastName: userSaved.lastName,
            curp: userSaved.CURP,
            email: userSaved.email,
            rol: userSaved.rol,
            createAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "El correo o CURP ya está en uso" });
        }
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { CURP, password } = req.body;
    try {
        // Buscar al usuario por su CURP
        const userFound = await User.findOne({ CURP });

        if (!userFound) return res.status(400).json(["Usuario no encontrado"]);

        // Verificar si la contraseña coincide
        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json(["La contraseña es incorrecta"]);

        // Generar un token de acceso
        const token = await createAccessToken({ id: userFound._id });

        // Establecer el token en una cookie
        res.cookie('token', token);

        // Enviar la respuesta con los datos del usuario
        res.json({
            id: userFound._id,
            name: userFound.name,
            firstName: userFound.firstName,
            lastName: userFound.lastName,
            curp: userFound.CURP,
            email: userFound.email,
            rol: userFound.rol,
            createAt: userFound.createdAt,
            updateAt: userFound.updatedAt
        });
    } catch (error) {
        res.status(500).json([error.message]);
    }
};

export const logout = async (req, res) => {
    // Limpiar la cookie del token
    res.cookie('token', "", {
        expires: new Date(0)
    });

    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({ message: "User not found" });

    // Enviar la respuesta con los datos del usuario
    res.json({
        id: userFound._id,
        name: userFound.name,
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        curp: userFound.CURP,
        email: userFound.email,
        rol: userFound.rol,
        createAt: userFound.createdAt,
        updateAt: userFound.updatedAt
    });
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
  
    if (!token) return res.status(400).json(['No autorizado']);
  
    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, TOKEN_SECRET);
        const userFound = await User.findById(decoded.id);
  
        if (!userFound) return res.status(401).json(['No autorizado']);
  
        // Enviar la respuesta con los datos del usuario
        res.json({
            id: userFound._id,
            name: userFound.name,
            firstName: userFound.firstName,
            lastName: userFound.lastName,
            curp: userFound.CURP,
            email: userFound.email,
            rol: userFound.rol,
            createAt: userFound.createdAt,
            updateAt: userFound.updatedAt
        });
    } catch (err) {
        return res.status(401).json(['No autorizado']);
    }
};
