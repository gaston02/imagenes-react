import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Global } from "../../util/Global";

export const Perfil = () => {
  const { id } = useParams();
  const { auth } = useAuth(); // Hook para obtener los datos del usuario autenticado
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  console.log(`URL: ${Global.URL}publico/usuario/${id}`);

  useEffect(() => {
    const axiosUserData = async () => {
      try {
        let response;
        if (!auth._id) {
          response = await axios.get(`${Global.URL}publico/usuario/${id}`);
        } else {
          response = await axios.get(`${Global.URL}usuario/${id}`);
        }

        if (response.status === 200) {
          setUserData(response.data.data);
        }
      } catch {
        navigate("/404");
      }
    };

    axiosUserData(); // Llamar a la función para obtener los datos del usuario
  }, [id, auth, navigate]); // Agregar dependencias para que se ejecute correctamente

  console.log("userData: " + JSON.stringify(userData));

  if (!userData) {
    return <div>Cargando perfil...</div>;
  }

  const isOwnProfile = auth?._id === id;
  return (
    <>
      <div id="mySidenav" className="sidenav bg-primary">
        <h3 className="fw-bold text-dashboard mx-2">Perfil</h3>
        <a href="javascript:void(0)" className="closebtn text-white">
          &times;
        </a>
        <a href="#imagenes" className="text-light fw-bold d-block mb-3">
          <i className="icon ion-md-images mx-3 lead"></i>Imagenes
        </a>
        <a href="#galerias" className="text-light fw-bold d-block mb-3">
          <i className="icon ion-md-albums mx-3 lead"></i>Galerias
        </a>
        <a href="index.html" className="text-light fw-bold d-block mb-3">
          <i className="icon ion-md-home mx-3 lead"></i>inicio
        </a>
        <a
          href="#"
          id="cerrar-sesion"
          className="text-light fw-bold d-block mb-3"
        >
          <i className="icon ion-md-exit mx-3 lead"></i>Cerrar sesion
        </a>
      </div>

      <div id="main">
        <span className="mx-3" style="font-size:30px;cursor:pointer">
          &#9776;
        </span>
      </div>

      <div className="d-flex">
        <div className="w-100">
          <div id="content">
            <section>
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div>
                      <h1 className="fw-bold mt-3 text-informativo">
                        {isOwnProfile
                          ? "Tu Perfil"
                          : `Perfil de ${userData.username}`}
                      </h1>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <img
                      src="img/foto linkedin.jpg"
                      className="img-testimonio rounded-circle"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
