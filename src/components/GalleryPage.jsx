import { useState, useEffect } from "react";
import axios from "axios";
import { Global } from "../util/Global";
import Carousel from "./Carousel";
import { Image } from "./image";

const RandomUserGallery = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const axiosRandomUser = async () => {
      try {
        const response = await axios.get(Global.URL + "usuario/aleatorio");
        setUserData(response.data.data); // Almacena los datos del usuario aleatorio
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    axiosRandomUser();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Error: No se pudieron cargar los datos del usuario.</div>;
  }

  return (
    <>
      <Image images={userData.images || []} userName={userData.nameUser} />
      <Carousel
        galleries={userData.galleries || []}
        userName={userData.nameUser}
      />
    </>
  );
};

export default RandomUserGallery;
