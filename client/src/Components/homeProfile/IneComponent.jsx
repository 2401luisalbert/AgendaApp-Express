import React from "react";
import { useUser } from "../../context/userContext";
import Loader from "../../Components/Loader";
import backgroundIne from "../../assets/ine.png";

const IneComponent = () => {
  // Obtenemos la info del usurio logeado a la sesión asi como el servidor
  const { userProfile } = useUser();
  const serverUrl = "http://localhost:3000";

  //Funcion que retorna la fecha de nacimiento en base a la curp
  const obtenerFechaDeNacimiento = (curp) => {
    if (curp && curp.length >= 18) {
      //Separación componentes de la fecha
      const anioNacimiento = parseInt(curp.substring(4, 6), 10);
      const mesNacimiento = parseInt(curp.substring(6, 8), 10);
      const diaNacimiento = parseInt(curp.substring(8, 10), 10);

      //asigna distincion para los 90's y los 2000's
      let anioCompleto = 1900 + anioNacimiento;
      if (anioNacimiento < 10) {
        anioCompleto = 2000 + anioNacimiento;
      }

      //crea la fecha en base al contexto anterior
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

  //Funcion que retorna la fecha de registro ante el ine
  const obtenerFechaRegistro = (curp) => {
    if (curp && curp.length >= 18) {
      //Separa la fecha de nacimienot para determinar los 18 años
      const anioRegistro = parseInt(curp.substring(4, 6), 10);
      const mesRegistro = parseInt(curp.substring(6, 8), 10) + 1;

      //Determina los 18 años
      let anioNacimiento = 1900 + anioRegistro;
      if (anioRegistro < 10) {
        anioNacimiento = 2000 + anioRegistro + 18;
      }

      //Crea la fecha de nacimiento
      const mesFormateado = mesRegistro.toString().padStart(2, "0");
      return `${anioNacimiento} / ${mesFormateado}`;
    } else {
      return "CURP no válida.";
    }
  };

  //Funcion que retorna el sexo en base a la curp
  const obtenerSexo = (curp) => {
    if (curp && curp.length >= 10) {
      //Obtiene el caracter de la ine para el sexo
      const sexoDigito = curp.charAt(10).toUpperCase();

      //Genera el string correspondiente
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

  //Funcion que retorna la clave de elector de la ine (generica)
  const generarClaveElector = (curp) => {
    if (curp && curp.length >= 10) {
      //Obtiene mes y año para generar el generico
      const anioMesRegistro = parseInt(curp.substring(4, 8), 10);
      const parteCURP = curp.substring(0, 10);

      // Genera el numero aleatorio de la clave de elector
      const numeroAleatorio = (anioMesRegistro * 1000000)
        .toString()
        .padStart(6, "0");

      return parteCURP + numeroAleatorio;
    } else {
      return "CURP no válida.";
    }
  };

  //Funcion que retorna la seccion del elector en base a la clave de elector 
  const obtenerSeccionElectoral = (claveElector) => {
    if (claveElector && claveElector.length >= 13) {
      //Obtiene la seccion del elector en base a la clave
      const seccionElectoral = claveElector.substring(11, 13);

      //Retorna la seccion asignada con los 0's a la izquierda 
      return seccionElectoral.padStart(5, "0");
    } else {
      return "Clave de Elector no válida.";
    }
  };

  //variables que se mostrarán 
  const curp = userProfile.curp;
  const fechaNacimiento = obtenerFechaDeNacimiento(curp);
  const fechaRegistro = obtenerFechaRegistro(curp);
  const sexo = obtenerSexo(curp);
  const claveElector = generarClaveElector(curp);
  const seccionElectoral = obtenerSeccionElectoral(claveElector);

  return (
    <div className="col-sm-12 col-md-8 col-lg-5 mt-2">
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
              <p className="text-muted p-0 m-0">{claveElector}</p>

              <div className="row mt-1 mb-1">
                <div className="col-8">
                  <h6 className="m-0">Curp</h6>
                  <p className="text-muted p-0 m-0">{userProfile.curp}</p>
                </div>
                <div className="col-4">
                  <h6 className="m-0">Año de registro</h6>
                  <p className="text-muted p-0 m-0">{fechaRegistro}</p>
                </div>
              </div>

              <div className="row mt-1 mb-1">
                <div className="col-5">
                  <h6 className="m-0">Fecha de nacimeinto</h6>
                  <p className="text-muted p-0 m-0">{fechaNacimiento}</p>
                </div>
                <div className="col">
                  <h6 className="m-0">Sección</h6>
                  <p className="text-muted p-0 m-0">{seccionElectoral}</p>
                </div>
                <div className="col">
                  <h6 className="m-0">Vigencia</h6>
                  <p className="text-muted p-0 m-0">2021 -2029</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IneComponent;
