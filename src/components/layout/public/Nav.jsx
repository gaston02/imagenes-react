import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container d-flex">
        <Link className="navbar-brand fw-bold" to="/">
          Repositorio Imagenes
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item mb-2 mb-lg-0">
              <Link className="nav-link text-white fw-bold me-3" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item mb-2 mb-lg-0">
              <Link className="nav-link text-white fw-bold me-3" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item mb-2 mb-lg-0">
              <Link className="nav-link text-white fw-bold me-3" to="#imagenes">
                Imagenes
              </Link>
            </li>
            <li className="nav-item mb-2 mb-lg-0">
              <Link className="nav-link text-white fw-bold me-3" to="#hero">
                Galerias
              </Link>
            </li>
            <li className="nav-item mb-2 mb-lg-0">
              <Link className="nav-link text-white fw-bold me-3" to="/perfil">
                Perfil
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};