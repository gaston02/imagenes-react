import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import useAuth  from "../../hooks/useAuth";
import { Global } from "../../util/Global";

export const Login = () => {

  useEffect(() => {
    document.body.classList.add("bg-register");
    return () => {
      document.body.classList.remove("bg-register"); // Limpia la clase cuando el componente se desmonta
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    try {
      console.log("entre al try")
      const response = await axios.post(Global.URL + "login", {
        email,
        password,
      });
      console.log("sali del axios: " + email);
      const { token } = response.data.data;
      const user = response.data.data;
      console.log("user: " + JSON.stringify(user));
      if(response.status === 200){
        // Guarda las cookies con las credenciales
        Cookies.set("token", token);
        Cookies.set("user", JSON.stringify(user));
        setAuth(user); // Establece el usuario autenticado
        navigate("/");
      }
    } catch {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
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
            <button type="submit" className="btn-login w-100">
              Login
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
