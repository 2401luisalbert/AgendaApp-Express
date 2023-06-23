import { createContext, useContext, useEffect, useState } from "react";
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  verifyTokenRequest,
} from "./../api/auth";
import { configureToastify } from "../utils/toastifyConfig";
import Cookies from "js-cookie";
import { set } from "mongoose";

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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors([]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [errors]);

  useEffect(() => {
  async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
        return
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data){
          setIsAuthenticated(false);
          setLoading(false)
          setUser(null)
        } 

        setIsAuthenticated(true);
        setLoading(false)
        setUser(res.data);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(true)
        setUser(null);
      }
    }
    checkLogin()
  }, []);

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
      const res = await loginRequest(user);
      setUser(res.data);
      configureToastify({ typeToast: "success", message: "Datos correctos" });
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
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
      value={{ signup, signin, logout,loading, user, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
