import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Global } from "../util/Global";
import PropTypes from "prop-types";

const ImageUpdate = ({ galleries, imageId }) => {
  const { form, changed } = useForm({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [selectedGalleryId, setSelectedGalleryId] = useState("");

  const handlePrivacyChange = (e) => {
    const isPublic = e.target.value === "1"; // Convertimos correctamente a booleano

    changed({
      target: { name: "public", value: JSON.parse(isPublic) }, // Se asegura que sea booleano
    });
  };

  const handleGalleryChange = (e) => {
    setSelectedGalleryId(e.target.value);
  };

  const selectedGallery = galleries.find(
    (gallery) => gallery._id === selectedGalleryId
  );

  const galleryName = selectedGallery
    ? selectedGallery.name
    : "Seleccione una galería";

  const getCookie = (token) => {
    const value = `; ${document.cookie}`; // Añadimos un punto y coma para facilitar la búsqueda
    const parts = value.split(`; ${token}=`); // Separamos las cookies por el nombre de la cookie
    if (parts.length === 2) return parts.pop().split(";").shift(); // Retornamos el valor
  };

  const token = getCookie("token"); // Obtiene el token de la cookie

  const updateImage = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      if (selectedGalleryId) {
        formData.append("galleryIds", selectedGalleryId);
      }

      console.log("formData: " + JSON.stringify(formData));

      const response = await axios.put(
        `${Global.URL}actualizar/imagen/${imageId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("response: " + JSON.stringify(response));

      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al subir la imagen");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000); // Limpiar error después de 5 segundos
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="row" id="registro-imagen">
      <h1 className="fw-bold text-center mt-5">Editar Imagen</h1>
      <div className="col-md-6 mx-auto">
        <div className="card my-3 me-5">
          <div className="card-body">
            <form
              id="form-imagen"
              onSubmit={updateImage}
              encType="multipart/form-data"
            >
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-4">
                <label htmlFor="name" className="form-label fw-bold">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="image 1"
                  onChange={changed}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="public" className="form-label fw-bold">
                  Privacidad
                </label>
                <select
                  id="public"
                  name="public"
                  className="form-control"
                  onChange={handlePrivacyChange}
                >
                  <option value="">Seleccione la privacidad</option>
                  <option value="1">Público</option>
                  <option value="2">Privado</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="galleryId" className="form-label fw-bold">
                  Incluir en galería
                </label>
                <select
                  id="galleryId"
                  name="galleryId"
                  className="form-control"
                  value={selectedGalleryId}
                  onChange={handleGalleryChange}
                >
                  <option value="">Seleccione una Galería</option>
                  {galleries.map((gallery) => (
                    <option key={gallery._id} value={gallery._id}>
                      {gallery.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-info text-white me-auto d-block px-2 py-2 fw-bold mt-2 mx-auto"
              >
                Subir Imagen
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

ImageUpdate.propTypes = {
  galleries: PropTypes.array.isRequired,
  imageId: PropTypes.string.isRequired,
};

export default ImageUpdate;
