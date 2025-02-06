import PropTypes from "prop-types";
import { Upload } from "../util/Global";
import { useState } from "react";

const Carousel = ({ galleries, userName, images }) => {
  if (galleries.length === 0) {
    return (
      <div className="text-center mt-2">
        <h3>El usuario @{userName} no tiene galerías.</h3>
      </div>
    );
  }

  return (
    <div className="mt-3">
      {galleries.map((gallery, galleryIndex) => {
        // Obtenemos las imágenes completas de la galería actual usando los IDs
        const currentImages = gallery.images
          .map((imageId) => images.find((image) => image._id === imageId))
          .filter((image) => image); // Filtra aquellas imágenes que no se encontraron

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

        // Generar los indicadores dinámicamente según la cantidad de imágenes en la galería
        const indicators = currentImages.map((image, index) => (
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
          <div key={gallery._id} className="mb-4">
            <h1 className="text-center mb-3">{gallery.name}</h1>
            <div className="text-center">
              <p className="mx-3 mb-3">
                {new Date(gallery.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div
              id={`carousel-${galleryIndex}`}
              className="carousel slide"
              data-bs-ride="carousel"
            >
              {currentImages.length > 0 && (
                <div className="carousel-inner">
                  {currentImages.map((image, index) => (
                    <div
                      className={`carousel-item ${
                        index === currentImageIndex ? "active" : ""
                      }`}
                      key={index}
                    >
                      <img
                        src={`${Upload.URL}uploads/${image.path}`}
                        className="d-block w-100 img-carrusel img-fluid"
                        alt={`Imagen de la galería ${gallery.name}`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Mostrar los indicadores solo si hay más de una imagen */}
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
          </div>
        );
      })}
    </div>
  );
};

Carousel.propTypes = {
  galleries: PropTypes.array.isRequired,
  userName: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired, // Asegúrate de que se pase el array de imágenes
};

export default Carousel;
