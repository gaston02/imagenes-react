import PropTypes from "prop-types";
import { Upload } from "../util/Global";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const CarouselPerfil = ({ galleries, userName, images }) => {
  // Obtenemos la información de autenticación desde el hook
  const { auth } = useAuth();
  // Determinamos si el perfil actual es el del usuario autenticado
  const isOwnProfile = auth?.nameUser === userName;

  if (galleries.length === 0) {
    return (
      <div className="text-center mt-2">
        <h3>El usuario @{userName} no tiene galerías.</h3>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      {/* Usamos una fila para organizar las galerías en columnas */}
      <div className="row">
        {galleries.map((gallery, galleryIndex) => {
          // Obtenemos las imágenes correspondientes a la galería (filtrando las que no se encuentren)
          const currentImages = gallery.images
            .map((imageId) => images.find((image) => image._id === imageId))
            .filter((image) => image);

          // Estado local para manejar la imagen actual de cada carrusel
          const [currentImageIndex, setCurrentImageIndex] = useState(0);

          const handleNextImage = () => {
            setCurrentImageIndex((prevIndex) =>
              prevIndex < currentImages.length - 1 ? prevIndex + 1 : 0
            );
          };

          const handlePrevImage = () => {
            setCurrentImageIndex((prevIndex) =>
              prevIndex > 0 ? prevIndex - 1 : currentImages.length - 1
            );
          };

          // Se generan los indicadores (puntos) para la navegación entre imágenes
          const indicators = currentImages.map((_, index) => (
            <button
              key={index}
              data-bs-target={`#carousel-${galleryIndex}`}
              data-bs-slide-to={index}
              className={index === currentImageIndex ? "active" : ""}
              aria-current={index === currentImageIndex ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrentImageIndex(index)}
            ></button>
          ));

          return (
            <div key={gallery._id} className="col-md-6 mb-4">
              <h1 className="text-center mb-3">{gallery.name}</h1>
              <div className="text-center">
                <p className="mx-3 mb-3">
                  {new Date(gallery.createdAt).toLocaleDateString()}
                </p>
              </div>

              {currentImages.length > 0 ? (
                <div
                  id={`carousel-${galleryIndex}`}
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {currentImages.map((image, index) => (
                      <div
                        key={image._id}
                        className={`carousel-item ${
                          index === currentImageIndex ? "active" : ""
                        }`}
                      >
                        <img
                          src={`${Upload.URL}uploads/${image.path}`}
                          className="d-block w-100 img-carrusel img-fluid"
                          alt={`Imagen de la galería ${gallery.name}`}
                        />
                      </div>
                    ))}
                  </div>

                  {currentImages.length > 1 && (
                    <div className="carousel-indicators">{indicators}</div>
                  )}

                  <button
                    className="carousel-control-prev"
                    type="button"
                    onClick={handlePrevImage}
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    onClick={handleNextImage}
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              ) : (
                <p className="text-center">Esta galería no tiene imágenes.</p>
              )}

              {/* Al final de cada carrusel se muestran los botones "Modificar" y "Eliminar"  
                  si el usuario está autenticado y es su propio perfil */}
              {auth.nameUser && isOwnProfile && (
                <div className="buttons-container text-center mt-4">
                  <button
                    className="btn btn-warning btn-md fw-bold text-white mx-2"
                  >
                    Modificar
                  </button>
                  <button className="btn btn-danger btn-md fw-bold mx-2">
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

CarouselPerfil.propTypes = {
  galleries: PropTypes.array.isRequired,
  userName: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
};

export default CarouselPerfil;
