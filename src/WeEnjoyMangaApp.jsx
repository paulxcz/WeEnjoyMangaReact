import React, { useReducer } from "react";
import { Navbar } from "./Components/Navbar/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import {customeTheme} from './chakraTheme/customTheme'
import { AppRouter } from "./routers/AppRouter";
import { AuthContext } from "./auth/authContext";
import { authReducer } from "./auth/authReducer";


export const WeEnjoyMangaApp = () => {

  const [user, dispatch] = useReducer(authReducer, {});

  return (
    <ChakraProvider theme={customeTheme}>
      <AuthContext.Provider value={{user, dispatch}}>
        <AppRouter />
      </AuthContext.Provider>
    </ChakraProvider>
  );
};
