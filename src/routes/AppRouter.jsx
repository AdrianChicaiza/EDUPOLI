import React from "react";
import { Route, Routes } from "react-router-dom";

import { AuthTemplate } from "../components";
import { AuthNav } from "../components/templates";
import { AuthProvider } from "../contexts";
import { App } from "../pages/app/App";
import { CarrerasScreen } from "../pages/app/CarrerasScreen";
import { ConfirmarContra } from "../pages/app/ConfirmarContra";
import { ConfirmarCorreo } from "../pages/app/ConfirmarCorreo";
import { Dashboard } from "../pages/app/Dashboard";
import { Ejemplos } from "../pages/app/Ejemplos";
import { Nosotros } from "../pages/app/Nosotros";
import { Registro } from "../pages/app/Registro";
import { SemestrePage } from "../pages/app/SemestrePage";
import { Login } from "../pages/auth/Login";
import { PerfilUsuario } from "../pages/auth/PerfilUsuario";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

// import { DashboardTemplate } from '../components/templates/DashboardTemplate';
// import { ListDirectors } from '../pages/directors/ListDirectors';

export const AppRouter = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="login/*"
          element={
            <PublicRoute>
              <Routes>
                <Route element={<AuthTemplate />}>
                  <Route path="/*" element={<Login />} />
                </Route>
              </Routes>
            </PublicRoute>
          }
        />

        <Route element={<AuthTemplate />}>
          <Route path="/registro" element={<Registro />} />
          <Route path="/confirmarCorreo" element={<ConfirmarCorreo />} />
          <Route path="/confirmarCon" element={<ConfirmarContra />} />
        </Route>

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Routes>
                {/* <Route index path='/' element={<App />} />  */}
                <Route element={<AuthNav/>}>
                  
                {/* <Route index path="/" element={<Ejemplos />} /> */}
                <Route index path="/" element={<Dashboard />} />
                <Route index path="/:semestreid" element={<SemestrePage />} />
                <Route index path="/nosotros" element={<Nosotros />} />

                </Route>
               
                <Route index path="/carreras" element={<CarrerasScreen />} />
                <Route element={<AuthTemplate />}>
                  <Route index path="/perfil" element={<PerfilUsuario />} />
                </Route>
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};
