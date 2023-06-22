import { createContext, useContext } from "react";
import { configureToastify } from "../utils/toastifyConfig";

export const authContext = createContext();

export const AuthContext = () => {
  const context = useContext(authContext);
  return context;
};

export function AuthProvider({ children }) {
  const register = (form) => {
    console.log(form)
    createRegiterRequest(form);
    configureToastify({
      typeToast: "success",
      validationResult: "datos correctos",
    });
  };

  return (
    <authContext.Provider value={{ register }}>{children}</authContext.Provider>
  );
}
