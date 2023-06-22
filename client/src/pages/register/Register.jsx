import styles from "./stylesRegister.module.css";
import RegisterFormComponent from "../../Components/register/RegisterFormComponent";

// Definimos el componente Register
function Register() {
  // Renderizamos la sección de registro
  return (
    <section className={`container-fluid`}>
    <div className={styles.image}></div>
      {/* Div para el contenido */}
      <div className="row vh-100 align-items-start align-items-md-center">
        {/* Div para el formulario de registro */}
        <div className={`col-12 col-md-5 d-flex align-items-center justify-content-center ${styles.registerFormContainer}`}>
          {/* Renderizamos el componente RegisterFormComponent */}
          <RegisterFormComponent />
        </div>
        {/* Div para la segunda imagen */}
        <div className={`col-md-7 ${styles.image}`}></div>
      </div>
    </section>
  );
}

// Exportamos el componente Register
export default Register;

