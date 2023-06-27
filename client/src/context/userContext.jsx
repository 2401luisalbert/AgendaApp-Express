import { createContext, useContext, useEffect, useState } from "react";
import { userRequest } from "../api/user";
import { useAuth } from "./authContext";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("No se está usando UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth(); // Obtén el estado de autenticación desde el contexto de autenticación
  const [userProfile, setUserProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated) { // Verifica si el usuario está autenticado
        try {
          const response = await userRequest();
          const data = await response;
          setUserProfile(data);
          setLoading(false);
        } catch (error) {
          handleUserError(error);
        }
      } else {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [isAuthenticated]);
 

  const handleUserError = (error) => {
    if (error.response) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      } else {
        setErrors([error.response.data.message || "Error al obtener el perfil del usuario"]);
        console.error("Error al obtener el perfil del usuario:", error.response);
      }
    } else {
      setErrors(["Ocurrió un error en el servidor"]);
      console.error("Error de servidor:", error);
    }
    setLoading(false);
  };

  

  return (
    <UserContext.Provider value={{ userProfile, errors }}>
      {children}
    </UserContext.Provider>
  );
};
