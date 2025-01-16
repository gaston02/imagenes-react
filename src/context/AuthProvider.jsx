import { useState, useEffect, createContext } from "react";
import Cookies from "js-cookie";
import PropTypes from 'prop-types'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  // Se ejecuta la primera vez que se monta el provider
  useEffect(() => {
    checkAuth();
  }, []);

  // Método para verificar si hay un usuario autenticado en las cookies
  const checkAuth = () => {
    // Obtener el token de la cookie
    const token = Cookies.get("token");

    // Si hay un token en las cookies, entonces el usuario está autenticado
    if (token) {
      // Extraer la información del usuario desde la cookie (esto depende de cómo almacenes los datos del usuario)
      const user = Cookies.get("user"); // Asegúrate de que el objeto del usuario también se almacene en cookies si lo deseas
      if (user) {
        setAuth(JSON.parse(user)); // Establece la información del usuario en el estado
      }
    }

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

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // 'children' debe ser un nodo de React y es requerido
}

export default AuthContext;
