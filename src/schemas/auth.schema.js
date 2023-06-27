import { z } from "zod";

const nameRegex = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
const curpRegex = /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/;
const phoneNumberRegex = /^(\d{3})?[-]?(\d{3})[-]?(\d{4})$/;

export const registerSchema = z.object({
  name: z.string({
    required_error: "El nombre es obligatorio",
  }).regex(nameRegex, { message: "El nombre no es válido" }),

  firstName: z.string({
    required_error: "El apellido paterno es obligatorio",
  }).regex(nameRegex, { message: "El apellido paterno no es válido" }),

  lastName: z.string({
    required_error: "El apellido materno es obligatorio",
  }).regex(nameRegex, { message: "El apellido materno no es válido" }),

  CURP: z.string({
    required_error: "La CURP es obligatoria",
  }).min(16, { message: "La CURP debe tener un mínimo de 16 caracteres" }).regex(curpRegex, { message: "La CURP no es válida" }),

  email: z.string({
    required_error: "El correo es obligatorio",
  }).email({ message: "El correo no es válido" }),

  password: z.string({
    required_error: "La contraseña es obligatoria",
  }).regex(passwordRegex, { message: "La contraseña debe tener al menos 6 caracteres, una mayúscula y un número" }),

  confirmPassword: z.string({
    required_error: "Confirmar contraseña es obligatorio",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirm"],
});

export const loginSchema = z.object({
  CURP: z.string({
    required_error: "La CURP es obligatoria",
  }).regex(curpRegex, { message: "La CURP no es válida" }),

  password: z.string({
    required_error: "La contraseña es obligatoria",
  }).regex(passwordRegex, { message: "La contraseña debe tener al menos 6 caracteres, una mayúscula y un número" }),
});

export const updateUserSchema = z.object({
  INE_CIC: z
    .string()
    .nonempty({ message: "El INE_CIC es obligatorio" }),

  INE_ID: z
    .string()
    .nonempty({ message: "El INE_ID es obligatorio" })
    .regex(nameRegex, { message: "El INE_ID no es válido" }),

  address: z
    .string()
    .nonempty({ message: "El domicilio es obligatorio" }),

  phoneNumber: z
    .string()
    .nonempty({ message: "El número de teléfono es obligatorio" })
    .min(10, { message: "El número debe tener 10 dígitos" })
    .regex(phoneNumberRegex, { message: "El número de teléfono no es válido" }),
});
