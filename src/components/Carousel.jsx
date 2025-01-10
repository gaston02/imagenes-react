import { useState, useEffect } from "react";
import axios from "axios";

const Carousel = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const axiosRandomUser = async () => {
      try {
        const response = await axios.get("/usuario/aleatorio");
        setGalleries(response.data.user.galleries);
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

  return (
    <main id="hero" className="carousel slide mb-3" data-bs-ride="carousel">
      <h1 className="text-center mb-3">Galerías</h1>

      <div className="carousel-indicators">
        {galleries.map((gallery, index) => (
          <button
            key={index}
            data-bs-target="#hero"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {galleries.map((gallery, index) => (
          <div
            key={gallery._id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <div className="carousel-caption d-none d-md-block">
              <h5>{gallery.name}</h5>
              <p>
                Fecha de creación:{" "}
                {new Date(gallery.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="carousel-images">
              {gallery.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image.path}
                  className="d-block w-100 img-carrusel img-fluid"
                  alt={`Imagen de la galería ${gallery.name}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#hero"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#hero"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </main>
  );
};

export default Carousel;
