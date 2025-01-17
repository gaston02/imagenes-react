import { useEffect } from 'react'
import { Header } from '../public/Header'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';
import Cookies from 'js-cookie';

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !auth) {
      // Si el usuario no está autenticado y no está en el proceso de carga, limpia las cookies y redirige
      Cookies.remove('token');  // Elimina la cookie del token
      Cookies.remove('user');   // Elimina la cookie del usuario
      navigate('/');
    }
  }, [auth, loading]);

  if (loading) return <div>Loading...</div>; // Muestra un loading mientras se verifica la autenticación
  return (
    <>
        <Header /> {/* Asegúrate de que solo esté aquí, no dentro de <Outlet /> */}
      {auth._id ? <Outlet /> : <Navigate to="/" />}
    </>
  )
}
