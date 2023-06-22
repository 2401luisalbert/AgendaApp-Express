import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const initialForm = {
  name: "",
  firstName: "",
  lastName: "",
  email: "",
  CURP: "",
  password: "",
  confirmPassword: "",
};

function RegisterFormComponent() {
  const { signup, errors: registerErrors } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // Estado para controlar la visualización de la contraseña
  const [showPass, setShowPass] = useState(false);

  // Manejador de la visualización de la contraseña
  const handleShow = () => {
    setShowPass(!showPass);
  };

  // Manejador del envío del formulario
  const onSubmit = handleSubmit(async (values) => {
    try {
      const signupResult = await signup(values);
      if (!signupResult) {
        return;
      }
      navigate("/");
    } catch (error) {
      console.log(error); // Manejar el error de acuerdo a tus necesidades
    }
  });

  return (
    <section>
      <h1 className="mt-2">Registrarse</h1>

      {registerErrors.map((error, i) => (
        <div className="alert alert-danger p-2 m-2" key={i}>
          {error}
        </div>
      ))}

      <form onSubmit={onSubmit}>
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
            {...register("name", { required: true })}
          />
          {errors.name && (
            <small className="text-danger">Nombre es requerido</small>
          )}
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
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <small className="text-danger">Apellido paterno es requerido</small>
          )}
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
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <small className="text-danger">Apellido materno es requerido</small>
          )}
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
            {...register("CURP", { required: true })}
          />
          {errors.CURP && <small className="text-danger">CURP requerida</small>}
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
            {...register("email", { required: true })}
          />
          {errors.email && (
            <small className="text-danger">Correo requerido</small>
          )}
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
            {...register("password", { required: true })}
          />
          {errors.password && (
            <small className="text-danger">Contraseña requerida</small>
          )}
        </div>

        {/* Campo Repetir Contraseña */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Repetir contraseña
          </label>
          <input
            type={showPass ? "text" : "password"}
            className="form-control"
            style={{ width: 300, height: 30, marginTop: -10 }}
            id="confirmPassword"
            name="confirmPassword"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <small className="text-danger">
              Cofimacion de contraseña requerido
            </small>
          )}
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
        <Link to="/">Iniciar sesión</Link>
      </form>
    </section>
  );
}

export default RegisterFormComponent;
