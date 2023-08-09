import React from "react";
import ModalComponent from "../../Components/homeProfile/ModalComponent";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";
import Loader from "../../Components/Loader";
import styles from "./HomePage.module.css";
import backgroundIne from "../../assets/ine.png";

const HomePage = () => {
  const { userProfile } = useUser();
  const serverUrl = "http://localhost:3000";

  const desktopImageStyle = {
    backgroundImage: `url(${backgroundIne})`,
  };

  const obtenerFechaDeNacimiento = (curp) => {
    if (curp && curp.length >= 18) {
      const anioNacimiento = parseInt(curp.substring(4, 6), 10);
      const mesNacimiento = parseInt(curp.substring(6, 8), 10);
      const diaNacimiento = parseInt(curp.substring(8, 10), 10);

      let anioCompleto = 1900 + anioNacimiento;
      if (anioNacimiento < 10) {
        anioCompleto = 2000 + anioNacimiento;
      }

      const fechaNacimiento = new Date(
        anioCompleto,
        mesNacimiento - 1,
        diaNacimiento
      );
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      const fechaFormateada = new Intl.DateTimeFormat("es-MX", options).format(
        fechaNacimiento
      );

      return fechaFormateada;
    } else {
      return "CURP no válida.";
    }
  };

  const obtenerFechaRegistro = (curp) => {
    if (curp && curp.length >= 18) {
      const anioRegistro = parseInt(curp.substring(4, 6), 10);
      const mesRegistro = parseInt(curp.substring(6, 8), 10) + 1;

      let anioNacimiento = 1900 + anioRegistro;
      if (anioRegistro < 10) {
        anioNacimiento = 2000 + anioRegistro + 18;
      }

      const mesFormateado = mesRegistro.toString().padStart(2, "0");
      return `${anioNacimiento} / ${mesFormateado}`;
    } else {
      return "CURP no válida.";
    }
  };

  const obtenerSexo = (curp) => {
    if (curp && curp.length >= 10) {
      const sexoDigito = curp.charAt(10).toUpperCase();

      if (sexoDigito === "H") {
        return "Hombre";
      } else if (sexoDigito === "M") {
        return "Mujer";
      } else {
        return "Género no especificado";
      }
    } else {
      return "CURP no válida.";
    }
  };

  const generarClaveElector = (curp) => {
    if (curp && curp.length >= 10) {
      const anioRegistro = parseInt(curp.substring(4, 6), 10);
      const mesRegistro = parseInt(curp.substring(6, 8), 10) + 1;

      const parteCURP = curp.substring(0, 10);
      const numeroAleatorio = Math.floor((anioRegistro + mesRegistro) * 1000000)
        .toString()
        .padStart(6, "0");
      return parteCURP + numeroAleatorio;
    } else {
      return "CURP no válida.";
    }
  };

  const obtenerSeccionElectoral = (claveElector) => {
    if (claveElector && claveElector.length >= 13) {
      const seccionElectoral = claveElector.substring(11, 13);

      const longClave = seccionElectoral.length;
      const ceros = "0";
      const resultado = Array.from({ length: longClave }, (_, i) =>
        ceros.repeat(i + 1)
      ).join("");

      return resultado + seccionElectoral;
    } else {
      return "Clave de Elector no válida.";
    }
  };

  if (!userProfile) {
    return <Loader />;
  }
  const curp = userProfile.curp;
  const fecha_na = obtenerFechaDeNacimiento(curp);
  const fecha_ing = obtenerFechaRegistro(curp);
  const sexo = obtenerSexo(curp);
  const claveelectpr = generarClaveElector(curp);
  const seccion = obtenerSeccionElectoral(claveelectpr);

  return (
    <div>
      {userProfile && <ModalComponent userProfile={userProfile} />}
      {userProfile && (
        <div className="container-fluid vh-100">
          <div className="row vh-100">
            <div className={`col-2 div_2 text-center ${styles.div_2}`}>
              <img
                className="mt-3"
                src="https://framework-gb.cdn.gob.mx/landing/img/logoheader.svg"
                alt=""
                height="5%"
              />
              <h4 className="mt-4 text-white">Hola {userProfile.name} </h4>
              <div className="align-items-center justify-content-center">
                <div className="d-flex flex-column align-items-center my-5">
                  <nav className="mt-5 sidebar">
                    <div className="position-sticky">
                      <ul className="nav flex-column">
                        <li className="nav-item m-4">
                          <a className="nav-link" href="#">
                            Inicio
                          </a>
                        </li>
                        <li className="nav-item m-4 nav_h">
                          <a className="nav-link " href="#">
                            Dependencias
                          </a>
                        </li>
                        <li className="nav-item m-4">
                          <a className="nav-link" href="#">
                            Citas
                          </a>
                        </li>
                        <li className="nav-item m-4">
                          <a className="nav-link" href="#">
                            Configuración
                          </a>
                        </li>
                        <li className="nav-item m-4">
                          <Link to="/" className="nav-link">Registrarse</Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>

            <div className="col mt-2">
              <div className="card border-0">
                <img src={`${backgroundIne}`} className="card-img" alt="..." />
                <div className="card-img-overlay mt-5">
                  <div className="row mt-4 mb-0">
                    <div className="col-3">
                      <img
                        className="mt-3 ms-4 img-fluid rounded"
                        src={`${serverUrl}/${userProfile.image_Profile}`}
                        alt=""
                      />
                      <h5 className="mt-3 ms-4 card-title">Ine Digital</h5>
                    </div>
                    <div className="col-9">
                      <div className="row">
                        <div className="col-8">
                          <h6 className="m-0">Nombre</h6>
                          <p className="mb-1 text-muted">
                            {userProfile.name + " "}
                            {userProfile.firstName + " "}
                            {userProfile.lastName + " "}
                          </p>
                        </div>
                        <div className="col-4">
                          <h6 className="m-0">Sexo</h6>
                          <p className="mb-1 text-muted">{sexo}</p>
                        </div>
                      </div>

                      <h6 className="m-0">Domicilio electronico</h6>
                      <p className="text-muted p-0 m-0">{userProfile.email}</p>

                      <h6 className="m-0">Clave electoral</h6>
                      <p className="text-muted p-0 m-0">{claveelectpr}</p>

                      <div className="row mt-1 mb-1">
                        <div className="col-8">
                          <h6 className="m-0">Curp</h6>
                          <p className="text-muted p-0 m-0">
                            {userProfile.curp}
                          </p>
                        </div>
                        <div className="col-4">
                          <h6 className="m-0">Año de registro</h6>
                          <p className="text-muted p-0 m-0">{fecha_ing}</p>
                        </div>
                      </div>

                      <div className="row mt-1 mb-1">
                        <div className="col-5">
                          <h6 className="m-0">Fecha de nacimeinto</h6>
                          <p className="text-muted p-0 m-0">{fecha_na}</p>
                        </div>
                        <div className="col">
                          <h6 className="m-0">Sección</h6>
                          <p className="text-muted p-0 m-0">{seccion}</p>
                        </div>
                        <div className="col">
                          <h6 className="m-0">Vigencia</h6>
                          <p className="text-muted p-0 m-0">2021 -2029</p>
                        </div>
                      </div>
                      {/* <ul>
                      {Object.entries(userProfile).map(([key, value]) => (
                        <li key={key}>
                          <strong>{key}: </strong> {value.toString()}
                        </li>
                      ))}
                    </ul> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col m-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Citas proximas</h5>

                  <p className="card-text">Contenido de la Carta 2.</p>
                </div>
              </div>
            </div>

            {/* <div className="col-12 col-md-5 d-flex align-items-center ">
              <div className="d-flex flex-column align-items-center">
                
                <div>
                  <h2>Datos del perfil:</h2>
                  <ul>
                    {Object.entries(userProfile).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}: </strong> {value.toString()}
                      </li>
                    ))}
                  </ul>
                </div> 
              </div>
            </div>*/}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
