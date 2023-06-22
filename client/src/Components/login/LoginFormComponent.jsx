import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loader from "./../loader";

function LoginFormComponent() {
  const navigate = useNavigate();

  const { signin, errors: loginErrors, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Estado para controlar la visualización de la contraseña
  const [showPass, setShowPass] = useState(false);

  // Manejador de la visualización de la contraseña
  const handleShow = () => {
    setShowPass(!showPass);
  };
  
  // Manejador del envío del formulario
  const onSubmit = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const signupResult = await signin(values);
      if (!signupResult) {
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate("/profile");
    } catch (error) {
      console.log(error); // Manejar el error de acuerdo a tus necesidades
    }
  });

  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="mt-2 text-center">Iniciar Sesión</h1>

          {loginErrors.map((error, i) => (
            <div className="alert alert-danger p-2 m-2" key={i}>
              {error}
            </div>
          ))}

          <form onSubmit={onSubmit}>
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
              {errors.CURP && (
                <small className="text-danger">CURP requerida</small>
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
              Iniciar sesión
              </button>
            </div>
            <Link to="/register">Registrarse</Link>
          </form>
        </>
      )}
    </section>
  );
}

export default LoginFormComponent;
