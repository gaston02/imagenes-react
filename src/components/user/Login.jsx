import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import useAuth from "../../hooks/useAuth";
import { Global } from "../../util/Global";

export const Login = () => {
  useEffect(() => {
    document.body.classList.add("bg-register");
    return () => {
      document.body.classList.remove("bg-register");
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtén la función login del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos
    setLoading(true); // Indicar que la solicitud está en curso

    try {
      const response = await axios.post(Global.URL + "login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, ...user } = response.data.data; // Desestructuración para obtener el token y el usuario
        Cookies.set("token", token); // Guarda el token en las cookies
        login(user, token); // Llama a la función login del contexto
        navigate("/"); // Redirige a la página principal
      }
    } catch {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    } finally {
      setLoading(false); // Restablece el estado de carga
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 fondo">
      <div className="login-card">
        <div className="login-image"></div>
        <div className="login-form">
          <h2 className="mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn-login w-100"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Login"}
            </button>
            <div className="mt-3">
              <Link className="btn btn-secondary w-100" to="/registrar">
                Registar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
