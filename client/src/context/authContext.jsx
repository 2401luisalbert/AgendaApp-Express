import { createContext, useContext, useEffect, useState } from "react";
import {
  registerRequest,
  updateRegisterRequest,
  loginRequest,
  logoutRequest,
  verifyTokenRequest,
} from "./../api/auth";
import { configureToastify } from "../utils/toastifyConfig";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("No se está usando AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors([]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [errors]);

  const handleError = (error) => {
    if (error.response) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      } else {
        const errorMessage = error.response.data.error || "Error en el servidor";
        setErrors([errorMessage]);
      }
    } else {
      setErrors(["Ocurrió un error en el servidor"]);
      console.error("Error de servidor:", error);
    }
    setLoading(false);
  };
  

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          setUser(null);
        }

        setIsAuthenticated(true);
        setLoading(false);
        setUser(res.data);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(true);
        setUser(null);
      }
    }
    checkLogin();
  }, []);

  const signup = async (user) => {
    try {
      await registerRequest(user);
      configureToastify({ typeToast: "success", message: "Datos correctos" });
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const updateRegister = async (id, user) => {
    console.log("user", user)
    try {
      await updateRegisterRequest(id, user);
      configureToastify({ typeToast: "success", message: "Datos correctos" });
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      configureToastify({ typeToast: "success", message: "Datos correctos" });
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const logout = async () => {
    await logoutRequest();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        updateRegister,
        signin,
        logout,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
