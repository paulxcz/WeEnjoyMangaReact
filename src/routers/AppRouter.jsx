import { Container } from "@chakra-ui/react";
import React from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "../Components/Navbar/Navbar";
import { AnimesRoute } from "./AnimesRoute";
import { EnvioSugerenciaRoute } from "./EnvioSugerenciaRoute";
import { HomeRoute } from "./HomeRoute";
import { ModDataScreen } from "./ModDataScreen";
import { ModRegisterForm } from "./ModRegisterForm";
import { ModsRoute } from "./ModsRoute";
import { ModsScreen } from "./ModsScreen";
import { NoticiasRoute } from "./NoticiasRoute";
import { PrivateRoute } from "./PrivateRoute";


export const AppRouter = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Container
        maxW={'100%'}
        padding={'0 20px'}
      >
        <Routes>
          <Route path="/" element={<HomeRoute />}></Route>
          <Route path="/Noticias" element={<NoticiasRoute />}></Route>
          <Route path="/Manga-Animes" element={<AnimesRoute />}></Route>
          <Route path="/Enviar-sugerencia" element={<EnvioSugerenciaRoute />}></Route>
          <Route path="/ModsPanel" element={<ModsRoute />}></Route>
          <Route path="/ModData" element={<ModDataScreen />}></Route>
          <Route path="/Register" element={<ModRegisterForm />}></Route>
          <Route path="/ModsScreen" element={
            <PrivateRoute>
              <ModsScreen />
            </PrivateRoute>
          }></Route>
          <Route path="*" element={<Navigate replace to={'/'} />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
