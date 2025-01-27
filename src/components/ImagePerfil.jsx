import PropTypes from "prop-types";
import { Upload } from "../util/Global";
import ImageModal from "./ImageModal";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export const Image = ({ images, userName }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const { auth } = useAuth();

  const handleImageClick = (imagePath) => {
    setImageSrc(`${Upload.URL}uploads/${imagePath}`); // Establece la ruta completa
    const modal = new window.bootstrap.Modal(
      document.getElementById("modal-imagen")
    );
    modal.show();
  };

  const handleCloseModal = () => {
    setImageSrc(null);
  };

  if (images.length === 0) {
    return (
      <div className="text-center mt-2">
        <h3>El usuario @{userName} no tiene imágenes.</h3>
      </div>
    );
  }

  return (
    <main className="container-xl py-3" id="imagenes">
      <ul className="row list-unstyled galeria">
        {images.map((image, index) => (
          <li key={index} className="col-md-6 col-lg-4 mb-4">
            <div className="card mx-3">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleImageClick(image.path);
                }}
                className="images"
              >
                <img
                  className="card-img-top img-fluid img-gallery"
                  src={`${Upload.URL}uploads/${image.path}`}
                  alt={`Imagen ${index + 1} de la galería`}
                />
              </a>
              <div className="card-body p-2">
                <p className="card-text mb-1">{image.name}</p>
                <p className="card-text mb-2">
                  {new Date(image.createdAt).toLocaleDateString()}
                </p>
                {/* Mostrar botones solo si el usuario está autenticado */}
                {auth.nameUser && (
                  <>
                    <button className="btn btn-warning btn-md fw-bold text-white mx-2">
                      Modificar
                    </button>
                    <button className="btn btn-danger btn-md fw-bold mx-2">
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ImageModal imageSrc={imageSrc} onClose={handleCloseModal} />
    </main>
  );
};

Image.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  userName: PropTypes.string.isRequired,
};

export default Image;
