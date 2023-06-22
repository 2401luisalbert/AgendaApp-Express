import { useState } from "react";
import { validateLogin } from "../../validations/validationForm";
import { configureToastify } from "../../utils/toastifyConfig";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// Estado inicial del formulario de inicio de sesión
const initialForm = {
  CURP: "",
  password: "",
};

// Componente del formulario de inicio de sesión
const LoginFormComponent = () => {
  // Estado para almacenar los valores del formulario
  const [form, setForm] = useState(initialForm);

  // Estado para controlar la visualización de la contraseña
  const [showPass, setShowPass] = useState(false);

  // Manejador de cambio de valores en los campos del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // Manejador de la visualización de la contraseña
  const handleShow = () => {
    setShowPass(!showPass);
  };

  // Manejador del envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación del formulario de inicio de sesión
    const validationResult = validateLogin(form);

    // Configuración de la notificación Toastify según el resultado de la validación
    const typeToast = validationResult !== "Datos correctos" ? "error" : "success";
    configureToastify({ typeToast, validationResult });

  };

  // Renderizado del componente del formulario de inicio de sesión
  return (
    <section>
    <h1>Ingresa al sitio</h1>
    <form onSubmit={handleSubmit}>
      
      {/* Bloque para el campo CURP */}
      <div className="mb-3">
        <label htmlFor="CURP" className="form-label">
          CURP
        </label>
        <input
          type="text"
          className="form-control"
          id="CURP"
          name="CURP"
          value={form.CURP}
          onChange={handleChange}
          aria-describedby="CurpHelp"
        />
        <div id="CurpHelp" className="form-text">
          La CURP contiene 18 caracteres
        </div>
      </div>

      {/* Bloque para el campo de contraseña */}
      <div className="mb-3">
        <label htmlFor="Password" className="form-label">
          Contraseña
        </label>
        <input
          type={showPass ? "text" : "password"}
          className="form-control"
          id="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      {/* Bloque para la opción de mostrar contraseña */}
      <div className="mb-3 form-check d-flex justify-content-end">
        <input
          type="checkbox"
          className="form-check-input me-2"
          id="check1"
          onChange={handleShow}
        />
        <label className="form-check-label" htmlFor="check1">
          Mostrar contraseña
        </label>
      </div>

      {/* Bloque para los botones de ingresar y registrarse */}
      <div className="d-flex justify-content-evenly">
        <button type="submit" className="btn btn-outline-dark">
          Ingresar
        </button>
        <Link to="/register">
          <button className="btn btn-outline-dark">Registrarse</button>
        </Link>
      </div>
      
    </form>
  </section>
  );
};

export default LoginFormComponent;
