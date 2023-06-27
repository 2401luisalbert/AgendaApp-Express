import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { name, firstName, lastName, CURP, email, password } = req.body;
  try {
    const userFoundCurp = await User.findOne({ CURP });
    if (userFoundCurp) {
      return res.status(400).json({ error: "Este CURP ya está registrado" });
    }

    const userFoundEmail = await User.findOne({ email });
    if (userFoundEmail) {
      return res.status(400).json({ error: "Este correo ya está registrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      firstName,
      lastName,
      CURP,
      email,
      password: passwordHash,
      confirmPassword: passwordHash,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });

    res.cookie('token', token);

    res.json({
      id: userSaved._id,
      name: userSaved.name,
      firstName: userSaved.firstName,
      lastName: userSaved.lastName,
      curp: userSaved.CURP,
      email: userSaved.email,
      rol: userSaved.rol,
      complement: userSaved.complement,
      createAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "El correo o CURP ya está en uso" });
    }
    res.status(500).json({ error: "Ocurrió un error en el servidor" });
  }
};

export const login = async (req, res) => {
  const { CURP, password } = req.body;
  try {
    const userFound = await User.findOne({ CURP });

    if (!userFound) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({ error: "La contraseña es incorrecta" });
    }

    const token = await createAccessToken({ id: userFound._id });

    res.cookie('token', token);

    res.json({
      id: userFound._id,
      name: userFound.name,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      curp: userFound.CURP,
      email: userFound.email,
      rol: userFound.rol,
      complement: userFound.complement,
      createAt: userFound.createdAt,
      updateAt: userFound.updatedAt
    });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error en el servidor" });
  }
};

export const updateRegister = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({
    id: updatedUser._id,
      name: updatedUser.name,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      curp: updatedUser.CURP,
      email: updatedUser.email,
      rol: updatedUser.rol,
      address: updatedUser.address,
      INE_CIC: updatedUser.INE_CIC,
      INE_ID: updatedUser.INE_ID,
      phoneNumber: updatedUser.phoneNumber,
      complement: updatedUser.complement,
      createAt: updatedUser.createdAt,
      updateAt: updatedUser.updatedAt
    });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error en el servidor" });
  }
};


export const logout = async (req, res) => {
  try {
    res.cookie('token', "", {
      expires: new Date(0)
    });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error en el servidor" });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({ error: "No autorizado" });
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    const userFound = await User.findById(decoded.id);

    if (!userFound) {
      return res.status(401).json({ error: "No autorizado" });
    }

    res.status(200).json({
        id: userFound._id,
        name: userFound.name,
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        curp: userFound.CURP,
        email: userFound.email,
        rol: userFound.rol,
        address: userFound.address,
        INE_CIC: userFound.INE_CIC,
        INE_ID: userFound.INE_ID,
        phoneNumber: userFound.phoneNumber,
        complement: userFound.complement,
        createAt: userFound.createdAt,
        updateAt: userFound.updatedAt
    });
  } catch (err) {
    res.status(401).json({ error: "No autorizado" });
  }
};
