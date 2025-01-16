import { useState, useEffect } from "react";
import axios from "axios";
import { Global } from "../util/Global";
import Carousel from "./Carousel";
import { Image } from "./image";
import User from "./user/User";

const RandomUserGallery = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosRandomUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(Global.URL + "usuario/aleatorio");
      setUserData(response.data.data);
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
      <Image images={userData.images || []} userName={userData.nameUser} />
      <Carousel
        galleries={userData.galleries || []}
        userName={userData.nameUser}
      />
    </>
  );
};

export default RandomUserGallery;
