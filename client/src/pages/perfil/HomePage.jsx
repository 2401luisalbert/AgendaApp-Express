import React from "react";
import ModalComponent from "../../Components/homeProfile/ModalComponent";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";
import Loader from "../../Components/Loader";
import styles from "./HomePage.module.css";
import IneComponent from "../../Components/homeProfile/IneComponent";
import NavComponent from "../../Components/nav/NavComponent";

const HomePage = () => {
  const { userProfile } = useUser();

  if (!userProfile) {
    return <Loader />;
  }

  return (
    <div>
      {userProfile && <ModalComponent userProfile={userProfile} />}
      {userProfile && (
        <div className="container-fluid vh-100">
          <div className="row vh-100 ">
            {/*Slider de navegacion*/}
            <NavComponent/>

            {/*Ine digital*/}
            <IneComponent/>

            <div className="col-sm-12 col-md-12 col-lg-5">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Citas proximas</h5>

                  <p className="card-text">Contenido de la Carta 2.</p>
                </div>
              </div>
            </div>


          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
