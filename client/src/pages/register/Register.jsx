import styles from "./stylesRegister.module.css";
import RegisterFormComponent from "../../Components/register/RegisterFormComponent";

function Register() {
  return (
    <section className="container-fluid">
      <div className={`row vh-100 align-items-start align-items-md-center`}>
        <div className={`col-md-7 d-md-none d-sm-block ${styles.image2}`}></div>
        <div
          className={`col-12 col-md-5 d-flex align-items-center justify-content-center ${styles.registerFormContainer}`}
        >
          <RegisterFormComponent />
        </div>
        <div className={`col-md-7 ${styles.image}`}></div>
      </div>
    </section>
  );
}

export default Register;
