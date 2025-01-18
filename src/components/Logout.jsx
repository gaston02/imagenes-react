import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Global } from "../util/Global";

export const Logout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(
          `${Global.URL}logout`,
          {},
          {
            withCredentials: true, // Si tu backend usa cookies
          }
        );
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setAuth({});

      navigate("/");
    };

    logout();
  }, [setAuth, navigate]); // Agrega las dependencias necesarias

  return <div>Cerrando sesión...</div>;
};
