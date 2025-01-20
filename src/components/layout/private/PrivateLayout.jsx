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
      Cookies.remove('token');
      Cookies.remove('user');
      navigate('/');
    }
  }, [auth, loading]);

  if (loading) return <div>Loading...</div>;
  return (
    <>
        <Header /> {/* Asegúrate de que solo esté aquí, no dentro de <Outlet /> */}
      {auth._id ? <Outlet /> : <Navigate to="/" />}
    </>
  )
}
