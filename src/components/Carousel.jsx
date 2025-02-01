import PropTypes from "prop-types";
import { Upload } from "../util/Global";
import { useState } from "react";

const Carousel = ({ galleries, userName, images }) => {
  const [currentGalleryIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (galleries.length === 0) {
    return (
      <div className="text-center mt-2">
        <h3>El usuario @{userName} no tiene galerías.</h3>
      </div>
    );
  }

  const currentGallery = galleries[currentGalleryIndex];

  // Se mapean los objetos de imagen de la galería a los objetos completos desde el array images.
  const currentImages = currentGallery.images
    .map((img) => images.find((image) => image._id === img._id))
    .filter((image) => image);

  // Función para ir a la siguiente imagen y volver al inicio cuando se llega al final.
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < currentImages.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Función para ir a la imagen anterior y volver al final cuando se llega al inicio.
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : currentImages.length - 1
    );
  };

  // Generar los indicadores dinámicamente según la cantidad de imágenes en la galería.
  const indicators = currentImages.map((image, index) => (
    <button
      key={index}
      data-bs-target="#hero"
      data-bs-slide-to={index}
      className={index === currentImageIndex ? "active" : ""}
      aria-current={index === currentImageIndex ? "true" : "false"}
      aria-label={`Slide ${index + 1}`}
      onClick={() => setCurrentImageIndex(index)}
    ></button>
  ));

  return (
    <main id="hero" className="carousel slide mt-3">
      <h1 className="text-center mb-3">{currentGallery.name}</h1>
      <div className="text-center">
        <p className="mx-3 mb-0">@{userName}</p>
        <p className="mx-3 mb-3">
          {new Date(currentGallery.createdAt).toLocaleDateString()}
        </p>
      </div>

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
                alt={`Imagen de la galería ${currentGallery.name}`}
              />
            </div>
          ))}
        </div>
      )}

      {currentImages.length > 1 && (
        <div className="carousel-indicators">{indicators}</div>
      )}

      <button
        className="carousel-control-prev"
        type="button"
        onClick={handlePrevImage}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={handleNextImage}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </main>
  );
};

Carousel.propTypes = {
  galleries: PropTypes.array.isRequired,
  userName: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
};

export default Carousel;
