import { useEffect } from "react";
import { Header } from "../public/Header";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!auth?._id) {
        // Verifica si no hay ID de usuario
        navigate("/"); // Redirige a la página de inicio
      }
    }
  }, [auth, loading, navigate]);

  if (loading) return <div>Loading...</div>; // Muestra un loading mientras se verifica la autenticación

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default PrivateLayout;
