import React from "react";
import ModalComponent from "../../Components/homeProfile/ModalComponent";
import { useUser } from "../../context/userContext";

const HomePage = () => {
  const { userProfile } = useUser();

  return (
    <div>
      <h1>¡Hola!</h1>
      {userProfile && (
        <ModalComponent userProfile={userProfile} />
      )}
      {userProfile && (
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
      )}
      <img src={userProfile.image_Url} alt="" />
    </div>
  );
};

export default HomePage;
