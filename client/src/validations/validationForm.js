const regexName =/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
const regexEmail = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
const regexPass = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
const regexCURP = /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/

export function validateLogin(form) {

    const { CURP, password } = form;

    if (!CURP || !password) return 'No puedes dejar campos vacíos';

    if (!regexCURP.test(CURP)) return `CURP no válido`;

    if (!regexPass.test(password)) return `La contraseña debe tener mínimo 6 caracteres, al menos una mayúscula y un número`;

    return 'Datos correctos'; // Sin errores de validación
}

export function validateRegister(form) {

    const {name,firstName,lastName,email,CURP,password,repeatPassword } = form;

    if (!name||!firstName||!lastName||!email||!CURP||!email || !password || !repeatPassword) return 'Llena todos los campos';

    if (!regexName.test(name)) return `Correo "${name}" no valido`;

    if (!regexName.test(firstName)) return `Correo "${firstName}" no valido`;
    
    if (!regexName.test(lastName)) return `Correo "${lastName}" no valido`;

    if (!regexCURP.test(CURP)) return `CURP no válido`;
    
    if (!regexEmail.test(email)) return `Correo "${email}" no valido`;

    if (!regexPass.test(password)) return `La contraseña debe tener mínimo 6 caracteres, al menos una mayúscula y un número`;

    if (password !== repeatPassword) return 'Las contraseñas no coinciden';

    return 'Datos correctos'; // Sin errores de validación
}

