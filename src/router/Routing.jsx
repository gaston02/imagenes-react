import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { PublicLayout } from "../components/layout/public/PublicLayout";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { Perfil } from "../components/user/Perfil";
import RandomUserGallery from "../components/GalleryPage";
import { PrivateLayout } from "../components/layout/private/PrivateLayout";
import { Logout } from "../components/logout";

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<RandomUserGallery />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Register />} />
            <Route path="perfil/:nameUser" element={<Perfil />} />
          </Route>

          <Route path="/auth" element={<PrivateLayout />}>
            <Route index element={<RandomUserGallery />} />
            <Route path="perfil/:nameUser" element={<Perfil />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
