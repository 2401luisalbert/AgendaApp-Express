import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest } from "./../api/auth";
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
      await registerRequest(user);
      configureToastify({ typeToast: "success", message: "Datos correctos" });
      return true;
    } catch (error) {
      setErrors(error.response.data);
      console.log(error.response);
      return false;
    }
  };

  const signin = async (user) => {
    try {
      await loginRequest(user);
      configureToastify({ typeToast: "success", message: "Datos correctos" });
      return true;
    } catch (error) {
      setErrors(error.response.data);
      console.log(error.response);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ signup, signin, user, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
