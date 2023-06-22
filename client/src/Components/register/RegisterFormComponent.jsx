import { useState } from "react";
import { validateRegister } from "../../validations/validationForm";
import { configureToastify } from "../../utils/toastifyConfig";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const initialForm = {
  name: "",
  firstName: "",
  lastName: "",
  email: "",
  CURP: "",
  password: "",
  repeatPassword: "",
};

function RegisterFormComponent() {
  const { register } = AuthContext();

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
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación del formulario de registro
    const validationResult = validateRegister(form);

    // Configuración de la notificación Toastify según el resultado de la validación
    if (validationResult === "Datos correctos") {
      const { repeatPassword, ...formData } = form;
      await register(form);
    } else {
      configureToastify({
        typeToast: "error",
        validationResult: validationResult,
      });
    }
  };

  return (
    <section>
      <h1 className="mt-2">Registrarse</h1>
      <form onSubmit={handleSubmit}>
        {/* Campo Nombre */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            style={{ width: 300, height: 30, marginTop: -10 }}
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* Campo Apellido Paterno */}
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            Apellido Paterno
          </label>
          <input
            type="text"
            className="form-control"
            style={{ width: 300, height: 30, marginTop: -10 }}
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>

        {/* Campo Apellido Materno */}
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Apellido Materno
          </label>
          <input
            type="text"
            className="form-control"
            style={{ width: 300, height: 30, marginTop: -10 }}
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        {/* Campo Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            style={{ width: 300, height: 30, marginTop: -10 }}
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Campo CURP */}
        <div className="mb-3">
          <label htmlFor="CURP" className="form-label">
            CURP
          </label>
          <input
            type="text"
            className="form-control"
            style={{ width: 300, height: 30, marginTop: -10 }}
            id="CURP"
            name="CURP"
            value={form.CURP}
            onChange={handleChange}
          />
        </div>

        {/* Campo Contraseña */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type={showPass ? "text" : "password"}
            className="form-control"
            style={{ width: 300, height: 30, marginTop: -10 }}
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {/* Campo Repetir Contraseña */}
        <div className="mb-3">
          <label htmlFor="repeatPassword" className="form-label">
            Repetir contraseña
          </label>
          <input
            type={showPass ? "text" : "password"}
            className="form-control"
            style={{ width: 300, height: 30, marginTop: -10 }}
            id="repeatPassword"
            name="repeatPassword"
            value={form.repeatPassword}
            onChange={handleChange}
          />
        </div>

        {/* Opción Mostrar Contraseña */}
        <div className="mb-3 form-check">
          <div className="d-flex justify-content-end">
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
        </div>

        {/* Botón Registrar */}
        <div className="d-flex justify-content-evenly mb-3">
          <button type="submit" className="btn btn-outline-dark">
            Registrar
          </button>
        </div>
        <Link to="/">
          Registrarse
        </Link>
      </form>
    </section>
  );
}

export default RegisterFormComponent;
