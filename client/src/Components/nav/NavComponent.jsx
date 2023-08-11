import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";
import styles from "./NavComponent.module.css";

const NavComponent = () => {
  const { userProfile } = useUser();

  const obtieneNombreInicio = (text) => {
    if (typeof text !== "string" || text.length === 0) {
      return "";
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const textoCapitalizado = obtieneNombreInicio(userProfile.name);

  return (
    <div className={`col-sm-12 col-md-4 col-lg-2 color__nav text-center ${styles.color__nav}`}>
      <img
        className="mt-3"
        src="https://framework-gb.cdn.gob.mx/landing/img/logoheader.svg"
        alt=""
        height="5%"
      />
      <h4 className="mt-4 text-white">Hola {textoCapitalizado} </h4>
      <div className="align-items-center justify-content-center">
        <div className="d-flex flex-column align-items-center my-5">
          <nav className="mt-5 sidebar">
            <div className="position-sticky">
              <ul className="nav flex-column">
                <li className="nav-item m-4">
                  <a className={`text color__text ${styles.color__text}`} href="#">
                    Inicio
                  </a>
                </li>
                <li className="nav-item m-4 nav_h">
                  <a className={`text color__text ${styles.color__text}`} href="#">
                    Citas
                  </a>
                </li>
                <li className="nav-item m-4">
                  <a className={`text color__text ${styles.color__text}`} href="#">
                    Dependencias
                  </a>
                </li>
                <li className="nav-item m-4">
                  <a className={`text color__text ${styles.color__text}`} href="#">
                    Configuración
                  </a>
                </li>
                <li className="nav-item m-4">
                  <a className={`text color__text ${styles.color__text}`} href="#">
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavComponent;
