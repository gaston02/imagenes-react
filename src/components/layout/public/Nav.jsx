import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth"; // Importa el hook

export const Nav = () => {
  const { auth, logout } = useAuth(); // Usamos el hook para obtener auth y logout
  console.log("autenticado: ", auth);

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
            {!auth?._id ? ( // Usamos el operador de encadenamiento opcional
              <>
                <Link className="nav-link text-white fw-bold me-3" to="login">
                  Login
                </Link>
                <Link
                  className="nav-link text-white fw-bold me-3"
                  to="/registro"
                >
                  Registro
                </Link>
              </>
            ) : (
              // Si hay un ID de usuario (es decir, el usuario está logueado), mostramos Logout
              <button className="nav-link text-white fw-bold me-3" onClick={logout}>
                Logout
              </button>
            )}
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
