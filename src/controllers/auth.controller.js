import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { createAccessToken } from "../libs/jwt.js"

export const register = async (req, res) => {
    const { name, firstName, lastName, CURP, email, password } = req.body
    try {

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            firstName,
            lastName,
            CURP,
            email,
            password: passwordHash,
            confirmPassword: passwordHash,
        })

        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie('token', token)

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

        })
    } catch (error) {
        console.log('req.body:', req.body)
        console.log('error.message:', error.message)
        if(error.code === 11000){
           return res.status(400).json({ message: "El correo o CURP ye esta en uso" })
        }
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const { CURP, password } = req.body
    try {

        const userFound = await User.findOne({ CURP })

        if (!userFound) return res.status(400).json({ message: "User not found" })

        const isMatch = await bcrypt.compare(password, userFound.password)

        if (!isMatch) return res.status(400).json({ message: "Incorrect password" })

        const token = await createAccessToken({ id: userFound._id });

        res.cookie('token', token)

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
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })

    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "User not found" })

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
    })
}
