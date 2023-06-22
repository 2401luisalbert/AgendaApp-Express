import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest } from "./../api/auth";
import { configureToastify } from "../utils/toastifyConfig";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("No se esta usando n AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors([]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res);
      configureToastify({ typeToast: "success", message: "Datos correctos" });
      return true;
    } catch (error) {
      setErrors(error.response.data);
      console.log(error.response);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ signup, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
