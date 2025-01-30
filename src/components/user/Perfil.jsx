import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Global, Upload } from "../../util/Global";
import ImagePerfil from "../ImagePerfil";
import CarouselPerfil from "../CarouselPerfil";
import ImageRegistration from "../ImageRegister";

export const Perfil = () => {
  const { nameUser } = useParams();
  const { auth } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [showImageRegistration, setShowImageRegistration] = useState(false); // Estado para controlar la visibilidad del formulario

  useEffect(() => {
    const axiosUserData = async () => {
      try {
        let response;
        // Función para obtener el valor de una cookie por su nombre
        const getCookie = (token) => {
          const value = `; ${document.cookie}`; // Añadimos un punto y coma para facilitar la búsqueda
          const parts = value.split(`; ${token}=`); // Separamos las cookies por el nombre de la cookie
          if (parts.length === 2) return parts.pop().split(";").shift(); // Retornamos el valor
        };

        const token = getCookie("token"); // Obtiene el token de la cookie

        if (!auth.nameUser) {
          response = await axios.get(
            `${Global.URL}publico/usuario/${nameUser}`
          );
        } else {
          response = await axios.get(`${Global.URL}usuario/${nameUser}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Usando el token como un Bearer token
            },
            withCredentials: true, // Esto permite el envío de cookies
          });
        }

        if (response.status === 200) {
          setUserData(response.data.data); // Guardar los datos del usuario en el estado
        }
      } catch {
        navigate("/404");
      }
    };
    axiosUserData();
  }, [nameUser, auth, navigate]);

  const handleLogout = () => {
    navigate("/auth/logout");
  };

  // Verificar si userData está definido antes de acceder a sus propiedades
  if (!userData) {
    return <div>Cargando perfil...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  const isOwnProfile = auth?.nameUser === nameUser; // Verificar si es el perfil del usuario autenticado

  return (
    <>
      {/* Sidebar */}
      <div id="mySidenav" className="sidenav bg-side">
        <h3 className="fw-bold text-dashboard mx-2">Perfil</h3>
        <button
          className="closebtn text-white"
          style={{
            backgroundColor: "transparent", // Sin fondo
            border: "none", // Sin borde
            fontSize: "30px", // Tamaño de la fuente
            cursor: "pointer", // Cambia el cursor al pasar sobre el botón
          }}
          onClick={() =>
            (document.getElementById("mySidenav").style.width = "0")
          }
        >
          &times;
        </button>
        <a href="#imagenes" className="text-light fw-bold d-block mb-3">
          <i className="icon ion-md-images mx-3 lead"></i>Imágenes
        </a>
        <a href="#galerias" className="text-light fw-bold d-block mb-3">
          <i className="icon ion-md-albums mx-3 lead"></i>Galerías
        </a>
        {auth.nameUser ? (
          <>
            <Link to="/auth" className="text-light fw-bold d-block mb-3">
              <i className="icon ion-md-home mx-3 lead"></i>Inicio
            </Link>
          </>
        ) : (
          <a href="/" className="text-light fw-bold d-block mb-3">
            <i className="icon ion-md-home mx-3 lead"></i>Inicio
          </a>
        )}
        {/* Mostrar el enlace de cerrar sesión solo si el usuario está autenticado */}
        {/* Mostrar el enlace de cerrar sesión solo si el usuario está autenticado */}
        {auth.nameUser && (
          <button
            onClick={handleLogout}
            className="btn-logout text-light fw-bold d-block mb-3"
          >
            <i className="icon ion-md-exit mx-3 lead"></i>Cerrar sesión
          </button>
        )}
      </div>

      {/* Botón para abrir el sidebar */}
      <div id="main">
        <span
          className="mx-3"
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={() =>
            (document.getElementById("mySidenav").style.width = "250px")
          }
        >
          &#9776;
        </span>
      </div>

      {/* Contenido principal */}
      <div className="container">
        {/* Bienvenida */}
        <section>
          <div className="row">
            <div className="col-lg-4">
              <h1 className="fw-bold mt-3 text-informativo">
                {isOwnProfile
                  ? "Bienvenido: " + userData.nameUser
                  : `Perfil de ${userData.nameUser}`}
              </h1>
              <p className="text-muted mt-5">{userData.userInfo}</p>
            </div>
            <div className="col-lg-8">
              {/* Mostrar la imagen de perfil solo si existe */}
              {userData.profileImage && (
                <img
                  src={`${Upload.URL}uploads/${userData.profileImage}`}
                  className="img-testimonio rounded-circle"
                  alt="Foto de perfil"
                />
              )}
            </div>
          </div>
        </section>

        {/* Sección de imágenes */}
      <section id="imagenes">
        <h2 className="fw-bold text-center">Imágenes</h2>
        <div className="d-flex justify-content-center mb-3">
          {auth.nameUser && isOwnProfile && ( // Verifica si el usuario está autenticado y si es su propio perfil
            <button
              className="fs-4 btn btn-marca btn-lg rounded-circle mx-auto"
              onClick={toggleImageRegistration} // Manejar el clic para mostrar/ocultar el formulario
            >
              <i className="icon ion-md-add-circle icon-large text-white"></i>
            </button>
          )}
        </div>
        {showImageRegistration ? ( // Renderizar el formulario si showImageRegistration es true
          <ImageRegistration />
        ) : (
          <ImagePerfil images={userData.images} userName={userData.nameUser} />
        )}
      </section>

        {/* Sección de galerías */}
        <section id="galerias" className="mb-3">
          <h1 className="fw-bold mt-5 text-center">Galerías</h1>
          <div className="d-flex justify-content-center">
            {auth.nameUser && isOwnProfile && (
              <button
                className="fs-4 btn btn-marca btn-lg rounded-circle mx-auto mb-3"
                id="btn-galeria"
              >
                <i className="icon ion-md-add-circle icon-large text-white"></i>
              </button>
            )}
          </div>
          <CarouselPerfil
            galleries={userData.galleries || []}
            userName={userData.nameUser}
            images={userData.images || []} // Pasa las imágenes al Carousel
          />
          {/* Mostrar botones solo si hay galerías y el usuario está autenticado */}
          {auth.nameUser &&
            isOwnProfile &&
            userData.galleries &&
            userData.galleries.length > 0 && (
              <div className="buttons-container text-center mt-4">
                <button className="btn btn-warning btn-md fw-bold text-white mx-2">
                  Modificar
                </button>
                <button className="btn btn-danger btn-md fw-bold mx-2">
                  Eliminar
                </button>
              </div>
            )}
        </section>
      </div>
    </>
  );
};
