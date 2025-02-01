import { useState, useEffect } from "react";
import axios from "axios";
import { Global } from "../util/Global";
import Carousel from "./Carousel";
import { Image } from "./image";
import User from "./user/User";
import useAuth from "../hooks/useAuth";

const RandomUserGallery = () => {
  const [userData, setUserData] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth, token } = useAuth(); // Extraemos el token desde el contexto

  const axiosRandomUser = async () => {
    setLoading(true);
    setError(null);
    try {
      // Obtener usuario aleatorio
      const response = await axios.get(`${Global.URL}usuario/aleatorio`);
      const user = response.data.data;
      setUserData(user);

      // Verificar que user tiene un nameUser antes de hacer la solicitud de imágenes
      if (user?.nameUser) {
        let imagesResponse;

        // Si no está autenticado o el usuario autenticado no coincide con el usuario obtenido,
        // usamos el endpoint público. En caso contrario, usamos el endpoint privado.
        if (!auth.nameUser || auth.nameUser !== user.nameUser) {
          imagesResponse = await axios.get(
            `${Global.URL}publico/usuario/${user.nameUser}`
          );
        } else {
          imagesResponse = await axios.get(
            `${Global.URL}usuario/${user.nameUser}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
        }

        setImages(imagesResponse.data.data.images || []);
      } else {
        setImages([]); // Asegurar que no haya imágenes si no hay usuario válido
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axiosRandomUser();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData)
    return <div>Error: No se pudieron cargar los datos del usuario.</div>;

  return (
    <>
      <User
        userName={userData.nameUser}
        onNext={axiosRandomUser}
        onPrev={axiosRandomUser} // Usamos la misma función para cambiar de usuario
      />
      <Image images={images} userName={userData.nameUser} />
      <Carousel
        galleries={userData.galleries || []}
        userName={userData.nameUser}
        images={images || []}
      />
    </>
  );
};

export default RandomUserGallery;
