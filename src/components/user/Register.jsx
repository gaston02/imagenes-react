import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../util/Global";
import axios from "axios";

export const Register = () => {
  useEffect(() => {
    document.body.classList.add("bg-register");
    return () => {
      document.body.classList.remove("bg-register"); // Limpia la clase cuando el componente se desmonta
    };
  }, []);

  const { form, changed } = useForm({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    try {
      const formData = new FormData(); // Crear un objeto FormData para enviar archivos
      for (const key in form) {
        formData.append(key, form[key]); // Agregar cada campo al FormData
      }

      const response = await axios.post(
        `${Global.URL}registro/usuario`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } } // Asegúrate de que el tipo de contenido sea multipart/form-data
      );

      if (response.status === 201) {
        const formulario = document.querySelector("#create");
        formulario.reset();
        navigate("/");
      }
    } catch {
      setError("Error al crear un nuevo Usuario.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card register-card">
        <div className="row g-0 flex-column-reverse flex-md-row">
          <div className="col-12 col-md-6 p-4">
            <h1 className="text-center mb-4">Registrar</h1>
            <form id="create" onSubmit={registerUser}>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label htmlFor="nameUser" className="form-label">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nameUser"
                  name="nameUser"
                  placeholder="Nombre de usuario"
                  onChange={changed}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={changed}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                  onChange={changed}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="profileImage" className="form-label">
                  Imagen de Perfil (opcional)
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="profileImage"
                  name="profileImage"
                  onChange={changed}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="userInfo" className="form-label">
                  Información de Usuario (opcional)
                </label>
                <textarea
                  className="form-control"
                  id="userInfo"
                  name="userInfo"
                  rows="3"
                  placeholder="Información adicional"
                  onChange={changed}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-register w-100 text-white"
              >
                Registrar
              </button>
            </form>
          </div>
          <div className="col-12 col-md-6">
            <div className="register-image"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
