import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  // Se ejecuta la primera vez que se monta el provider
  useEffect(() => {
    checkAuth();
  }, []);

  // Método para verificar si hay un usuario autenticado en localStorage
  const checkAuth = () => {
    // Obtener datos del usuario del localStorage
    const user = localStorage.getItem("user");

    // Comprobar si hay información del usuario
    if (user) {
      const userObj = JSON.parse(user);
      setAuth(userObj); // Establece la información del usuario en el estado
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
