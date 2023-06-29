import User from "../models/user.model.js";

export const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id);

        if (!userFound) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        const { _id, name, firstName, lastName, CURP, email, rol, complement, address, INE_CIC, INE_ID, phoneNumber, image_Url, createdAt, updatedAt } = userFound;

        res.json({
            id: _id,
            name,
            firstName,
            lastName,
            curp: CURP,
            email,
            rol,
            address,
            INE_CIC,
            INE_ID,
            phoneNumber,
            complement,
            image_Url,
            createAt: createdAt,
            updateAt: updatedAt
        });
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
};
