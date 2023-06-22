// Importamos el archivo de estilos CSS
import styles from "./stylesLogin.module.css";
// Importamos el componente LoginFormComponent
import LoginFormComponent from "../../Components/login/LoginFormComponent";

// Definimos el componente Login
function Login() {
  // Renderizamos la sección de inicio de sesión
  return (
    <div className={'container-fluid'}>
      <div className={`row vh-100 align-items-start align-items-md-center`}>
        {/* Div contenedor de la imagen */}
        <div className={`col-md-7 img-fluid ${styles.image}`}></div>
        {/* Div contenedor del formulario */}
        <div className="col-12 col-md-5 d-flex align-items-center justify-content-center">
          <div className={`d-flex flex-column align-items-center ${styles.formContainer}`}>
            {/* Renderizamos el componente LoginFormComponent */}
            <LoginFormComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

// Exportamos el componente Login
export default Login;
