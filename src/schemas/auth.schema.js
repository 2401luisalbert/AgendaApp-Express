import { z } from "zod"

const regexName = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
const regexPass = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
const regexCURP = /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/
const regexNumber = /^(\d{3})?[-]?(\d{3})[-]?(\d{4})$/;


export const registerSchema = z.object({
    name: z
        .string({
            required_error: "El nombre es obligatorio"
        })
        .regex(regexName, { message: "Nombre no valido" }),

    firstName: z
        .string({
            required_error: "Apellido paterno obligatorio"
        })
        .regex(regexName, { message: "Apellido no valido" }),

    lastName: z
        .string({
            required_error: "Apellido materno obligatorio"
        })
        .regex(regexName, { message: "Apellido no valido" }),

    CURP: z
        .string({
            required_error: "CURP obligatoria"
        })
        .min(16, { message: "La CURP tiene un mínimo de 16 caracteres" })
        .regex(regexCURP, { message: "CURP no valida" }),

    email: z
        .string({
            required_error: "Correo obligatorio"
        })
        .email({ message: "Correo no valido" }),

    password: z
        .string({
            required_error: "Contraseña obligatoria"
        })
        .regex(regexPass, { message: "La contraseña debe tener mínimo 6 caracteres, al menos una mayúscula y un número" }),

    confirmPassword: z
        .string({
            required_error: "Confirmar contraseña obligatorio",
        })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirm"], // path of error
});


export const loginSchema = z.object({
    CURP: z.string({
        required_error: "CURP obligatoria"
    })
        .regex(regexCURP, { message: "CURP no valida" }),

    password: z.string({
        required_error: "Contraseña obligatoria"
    })
        .regex(regexPass, { message: "La contraseña debe tener mínimo 6 caracteres, al menos una mayúscula y un número" }),
})

export const updateUserSchema = z.object({

    INE_CIC: z
        .string({
            required_error: "El INE_CIC es obligatorio"
        }),
        // .regex(regexName, { message: "INE_CIC no valido" }),

    INE_ID: z
        .string({
            required_error: "INE_ID obligatorio"
        })
        .regex(regexName, { message: "INE_ID no valido" }),

    address: z
        .string({
            required_error: "Domicilio obligatorio"
        }),

    phoneNumber: z
        .string({
            required_error: "numero obligatorio"
        })
        .min(10, { message: "La numero debe ser a 10 dígitos" })
        .regex(regexNumber, { message: "numero no valido" }),

    CURP: z.optional(),
    password: z.optional(),
    confirmPassword: z.optional(),
});
