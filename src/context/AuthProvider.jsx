import { useState, useEffect, createContext } from "react";
import Cookies from "js-cookie"; // Asegúrate de instalar js-cookie

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  // Se ejecuta la primera vez que se monta el provider
  useEffect(() => {
    checkAuth();
  }, []);

  // Método para verificar si hay un usuario autenticado
  const checkAuth = () => {
    // Obtener datos del usuario del localStorage
    const user = localStorage.getItem("user");
    const token = Cookies.get("token"); // Obtener el token de las cookies

    // Comprobar si hay información del usuario
    if (user && token) {
      const userObj = JSON.parse(user);
      setAuth({ ...userObj, token }); // Establece la información del usuario y el token en el estado
    } else {
      setAuth({}); // Si no hay usuario o token, establece auth como vacío
    }

    // Cambiar el estado de loading a false una vez que se verifica el auth
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
