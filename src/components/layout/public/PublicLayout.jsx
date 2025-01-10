import { Header } from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export const PublicLayout = () => {
  const { auth } = useAuth();

  return (
    <>
      <Header />
      {!auth?._id ? <Outlet /> : <Navigate to="/" />}
    </>
  );
};
