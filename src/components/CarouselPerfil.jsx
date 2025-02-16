import PropTypes from "prop-types";
import { Upload } from "../util/Global";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import UpdateCarousel from "./UpdateCarousel";

const CarouselPerfil = ({ galleries, userName, images }) => {
  // Obtenemos la información de autenticación desde el hook
  const { auth } = useAuth();
  // Determinamos si el perfil actual es el del usuario autenticado
  const isOwnProfile = auth?.nameUser === userName;

  const [idGallery, setIdGallery] = useState(null); // Guarda el objeto o ID de la imagen
  const [showGalleryeEdit, setShowGalleryeEdit] = useState(false);

  // Mantenemos el estado de índices de cada galería
  const [currentImageIndexes, setCurrentImageIndexes] = useState(
    galleries.reduce((acc, gallery) => {
      acc[gallery._id] = 0; // Inicializa el índice a 0 para cada galería
      return acc;
    }, {})
  );

  const handleEditClick = (gallery) => {
    setIdGallery(gallery); // Guarda la galería seleccionada
    setShowGalleryeEdit(true); // Muestra el formulario de edición
  };

  const handleNextImage = (galleryId) => {
    setCurrentImageIndexes((prev) => {
      const newIndex =
        prev[galleryId] < galleries[galleryId].images.length - 1
          ? prev[galleryId] + 1
          : 0;
      return { ...prev, [galleryId]: newIndex };
    });
  };

  const handlePrevImage = (galleryId) => {
    setCurrentImageIndexes((prev) => {
      const newIndex =
        prev[galleryId] > 0
          ? prev[galleryId] - 1
          : galleries[galleryId].images.length - 1;
      return { ...prev, [galleryId]: newIndex };
    });
  };

  if (galleries.length === 0) {
    return (
      <div className="text-center mt-2">
        <h3>El usuario @{userName} no tiene galerías.</h3>
      </div>
    );
  }

  return (
    <>
      {showGalleryeEdit ? (
        <UpdateCarousel initialData={idGallery} images={images} />
      ) : (
        <div className="container mt-3">
          {/* Usamos una fila para organizar las galerías en columnas */}
          <div className="row">
            {galleries.map((gallery) => {
              // Obtenemos las imágenes correspondientes a la galería (filtrando las que no se encuentren)
              const currentImages = gallery.images
                ? gallery.images
                    .map((imageId) =>
                      Array.isArray(images)
                        ? images.find((image) => image._id === imageId)
                        : null
                    )
                    .filter((image) => image)
                : [];

              // Obtener el índice actual de la imagen
              const currentImageIndex = currentImageIndexes[gallery._id];

              // Se generan los indicadores (puntos) para la navegación entre imágenes
              const indicators = currentImages.map((_, index) => (
                <button
                  key={index}
                  data-bs-target={`#carousel-${gallery._id}`}
                  data-bs-slide-to={index}
                  className={index === currentImageIndex ? "active" : ""}
                  aria-current={index === currentImageIndex ? "true" : "false"}
                  aria-label={`Slide ${index + 1}`}
                  onClick={() =>
                    setCurrentImageIndexes((prev) => ({
                      ...prev,
                      [gallery._id]: index,
                    }))
                  }
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
                      id={`carousel-${gallery._id}`}
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
                        onClick={() => handlePrevImage(gallery._id)}
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
                        onClick={() => handleNextImage(gallery._id)}
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  ) : (
                    <p className="text-center">
                      Esta galería no tiene imágenes.
                    </p>
                  )}

                  {/* Al final de cada carrusel se muestran los botones "Modificar" y "Eliminar"  
                  si el usuario está autenticado y es su propio perfil */}
                  {auth.nameUser && isOwnProfile && (
                    <div className="buttons-container text-center mt-4">
                      <button
                        className="btn btn-warning btn-md fw-bold text-white mx-2"
                        onClick={() => handleEditClick(gallery)}
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
      )}
    </>
  );
};

CarouselPerfil.propTypes = {
  galleries: PropTypes.array.isRequired,
  userName: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
};

export default CarouselPerfil;
