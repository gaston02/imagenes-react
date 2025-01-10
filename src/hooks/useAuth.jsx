import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

/**
 * Hook personalizado para acceder al AuthContext.
 * @returns {object} Estado de autenticación y funciones proporcionadas por AuthProvider.
 * @throws Lanzará un error si se usa fuera de un AuthProvider.
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de un AuthProvider");
  }
  return context;
};

export default useAuth;
