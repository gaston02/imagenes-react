import { useState } from "react";
import useAuth from "../hooks/useAuth"; // Asegúrate de que la ruta sea correcta
import { useForm } from "../hooks/useForm"; // Asegúrate de que la ruta sea correcta

const ImageRegistration = () => {
  const { auth } = useAuth(); // Accede al contexto de autenticación
  const { galleries } = auth; // Extrae las galerías del objeto auth

  const { form, changed } = useForm({
    name: "",
    image: null,
    public: false,
    galleryId: "void",
  });

  const [errors, setErrors] = useState({
    name: false,
    image: false,
    public: false,
  });

  const handlePrivacyChange = (e) => {
    const value = e.target.value;
    changed({ target: { name: "public", value: value === "1" } }); // Convertir a booleano
    setErrors((prevErrors) => ({
      ...prevErrors,
      public: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, image, public: isPublic } = form;
    let hasError = false;

    if (!name) {
      setErrors((prevErrors) => ({ ...prevErrors, name: true }));
      hasError = true;
    }
    if (!image) {
      setErrors((prevErrors) => ({ ...prevErrors, image: true }));
      hasError = true;
    }
    if (!isPublic) {
      setErrors((prevErrors) => ({ ...prevErrors, public: true }));
      hasError = true;
    }

    if (!hasError) {
      // Aquí puedes enviar los datos al backend
      console.log("Formulario válido:", form);
    }
  };

  return (
    <div className="row" id="registro-imagen" hidden={false}>
      <h1 className="fw-bold text-center mt-5">Subir Imagen</h1>
      <div className="col-md-6 mx-auto">
        <div className="card my-3 me-5">
          <div className="card-body">
            <form
              id="form-imagen"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="mb-4">
                <label htmlFor="name" className="form-label fw-bold">
                  Nombre *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="image 1"
                  value={form.name}
                  onChange={changed}
                  required
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="alert alert-danger mt-2 text-center"
                  >
                    El nombre es requerido.
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="form-label fw-bold">
                  Imagen *
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={changed}
                  required
                />
                {errors.image && (
                  <p
                    id="image-error"
                    className="alert alert-danger mt-2 text-center"
                  >
                    La imagen es requerida.
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="public" className="form-label fw-bold">
                  Privacidad *
                </label>
                <select
                  id="public"
                  name="public"
                  className="form-control"
                  onChange={handlePrivacyChange}
                  required
                >
                  <option value="void">Seleccione la privacidad</option>
                  <option value="1">Público</option>
                  <option value="2">Privado</option>
                </select>
                {errors.public && (
                  <p
                    id="public-error"
                    className="alert alert-danger mt-2 text-center"
                  >
                    La privacidad es requerida.
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="galleryId" className="form-label fw-bold">
                  Incluir en galería
                </label>
                <select
                  id="galleryId"
                  name="galleryId"
                  className="form-control"
                  value={form.galleryId}
                  onChange={changed}
                >
                  <option value="void">Seleccione una Galería</option>
                  {galleries &&
                    galleries.map((gallery) => (
                      <option key={gallery.id} value={gallery.id}>
                        {gallery.name}
                      </option>
                    ))}
                  <option value="none">Sin Galería</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-info text-white me-auto d-block px-2 py-2 fw-bold mt-2 mx-auto"
              >
                Subir Imagen
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageRegistration;
