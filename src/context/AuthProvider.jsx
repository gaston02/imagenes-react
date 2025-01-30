import { useState, useEffect, createContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

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
      setAuth({});
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

export default AuthContext;
