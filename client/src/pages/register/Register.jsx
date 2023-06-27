import React from "react";
import RegisterFormComponent from "../../Components/register/RegisterFormComponent";
import backgroundImage from "../../assets/portada.jpg";
import styles from "./stylesRegister.module.css";

function Register() {
  const mobileImageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "25vh",
  };

  const desktopImageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "115vh",
  };

  return (
    <div className="container-fluid">
      <div className="row align-items-start align-items-md-center">
        <div className={`col-12 d-md-none ${styles.mobileImage}`} style={mobileImageStyle} />
        <div className={`col-md-7 img-fluid d-none d-md-block ${styles.desktopImage}`} style={desktopImageStyle} />
        <div className="col-12 col-md-5 d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column align-items-center my-5">
            <RegisterFormComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
