import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { userRequest } from '../../api/pass'



function ForgetPassComponent() {
  const navigate = useNavigate();
  const { signin, errors: loginErrors } = useAuth();
  const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Manejador del envío del formulario
  const onSubmit = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const signupResult = await userRequest(values);
      if (!signupResult) {
        console.log(values)
        //return;
      }
      //navigate("/profile");
    } catch (error) {
      console.log(error); // Manejar el error de acuerdo a tus necesidades
    } finally {
      setLoading(false);
    }
  });

  return (
    <section className="d-flex align-items-center justify-content-center flex-column col-12">
      
      <div className="col-10">
            {loginErrors.map((error, i) => (
              <p className="alert alert-danger p-2 m-2" key={i}>
                {error}
              </p>
            ))}
      </div>
      
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="mb-5">Recupera tu contraseña</h1>
          <form onSubmit={onSubmit}>
            {/* Campo CURP */}
            <div className="mb-5">
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
            {/* Botón Registrar */}
            <div className="d-flex justify-content-evenly mb-3">
              <button type="submit" className="btn btn-outline-dark">
                Recuperar contraseña
              </button>
            </div>
            <div className="d-flex justify-content-evenly mb-b">
              <Link to="/register" className="mt-4">LogIn</Link>
              <Link to="/forgetpass" className="mt-4">Registrate</Link>
            </div>
            
          </form>
        </>
      )}
    </section>
  );
}

export default ForgetPassComponent;
