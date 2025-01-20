import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const User = ({ userName, onNext, onPrev, id }) => {
  return (
    <>
      <h1 className="text-center my-2">Imagenes</h1>
      <div className="d-flex align-items-center justify-content-center mb-2">
        <span
          className="carousel-deco-icon prev"
          onClick={onPrev}
          style={{ cursor: "pointer" }} // Añadimos estilo para indicar que es clickeable
        ></span>
        <Link
          to={`/perfil/${id}`}
          className="btn btn-success fs-5 fw-bold py-2 mx-2"
        >
          @{userName}
        </Link>
        <span
          className="carousel-deco-icon next"
          onClick={onNext}
          style={{ cursor: "pointer" }}
        ></span>
      </div>
    </>
  );
};

User.propTypes = {
  userName: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default User;
