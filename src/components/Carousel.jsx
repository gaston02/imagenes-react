import PropTypes from "prop-types";
import { Upload } from "../util/Global";
import { useState } from "react";

const Carousel = ({ galleries, userName }) => {
  const [currentGalleryIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    const images = galleries[currentGalleryIndex]?.images || [];
    setCurrentImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevImage = () => {
    const images = galleries[currentGalleryIndex]?.images || [];
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  if (galleries.length === 0) {
    return (
      <div className="text-center mt-2">
        <h3>El usuario @{userName} no tiene galerías.</h3>
      </div>
    );
  }

  const currentGallery = galleries[currentGalleryIndex];
  const currentImage = currentGallery?.images[currentImageIndex];

  // Generar los indicadores dinámicamente según la cantidad de imágenes en la galería
  const indicators = currentGallery?.images?.map((image, index) => (
    <button
      key={index}
      data-bs-target="#hero"
      data-bs-slide-to={index}
      className={index === currentImageIndex ? "active" : ""}
      aria-current={index === currentImageIndex ? "true" : "false"}
      aria-label={`Slide ${index + 1}`}
    ></button>
  ));

  return (
    <main id="hero" className="carousel slide mt-3">
      <h1 className="text-center mb-3">{currentGallery.name}</h1>
      <div className="text-center">
        <p className="mx-3 mb-0">{userName}</p>
        <p className="mx-3 mb-3">
          {new Date(currentGallery.createdAt).toLocaleDateString()}
        </p>
      </div>

      {currentGallery && (
        <div className="carousel-inner">
          <div className="carousel-item active">
            {currentImage && (
              <img
                src={`${Upload.URL}uploads/${currentImage.path}`}
                className="d-block w-100 img-carrusel img-fluid"
                alt={`Imagen de la galería ${currentGallery.name}`}
              />
            )}
          </div>
        </div>
      )}

      {/* Mostrar los indicadores solo si hay más de una imagen */}
      {currentGallery?.images?.length > 1 && (
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
};

export default Carousel;
