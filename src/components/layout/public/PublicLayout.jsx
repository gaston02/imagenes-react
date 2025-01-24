import { useEffect } from "react";
import { Header } from "./Header"; // Asegúrate de que solo se importa aquí
import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Cookies from "js-cookie";
import { Footer } from "./Footer";

export const PublicLayout = () => {
  const { auth, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ubicación actual

  useEffect(() => {
    if (loading && auth) {
      // Si el usuario no está autenticado y no está en el proceso de carga, limpia las cookies y redirige
      Cookies.remove("token"); // Elimina la cookie del token
      Cookies.remove("user"); // Elimina la cookie del usuario
      navigate("/");
    }
  }, [auth, loading, navigate]);

  if (loading) return <div>Loading...</div>; // Muestra un loading mientras se verifica la autenticación

  // Verificar si la ruta actual es la de perfil
  const isProfileRoute = location.pathname.includes("/perfil/");

  return (
    <>
      {/* Renderizar el Header solo si no estamos en la ruta de perfil */}
      {!isProfileRoute && <Header />}
      {!auth._id ? <Outlet /> : <Navigate to="/auth" />}
      <Footer />
    </>
  );
};