import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { AuthProvider } from "./context/authContext";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import HomePage from "./pages/perfil/HomePage";
import { UserProvider } from "./context/userContext";
import ForgetPass from "./pages/forgetPss/ForgetPass";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgetpass" element={<ForgetPass />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
