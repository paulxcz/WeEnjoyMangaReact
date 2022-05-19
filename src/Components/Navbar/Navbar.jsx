import React, { useContext } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import Logo from "../../assets/img/Logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";

export const Navbar = () => {
  const textNavBarStyles = {
    fontWeight: "bold",
    color: "white",
  };

  const { user } = useContext(AuthContext);

  return (
    <Flex
      as={"nav"}
      bg={"#FF9F45"}
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={"10px 20px"}
    >
      <Link to={"/"}>
        <Image src={Logo} alt="logo" w={"150px"}></Image>
      </Link>

      <Flex gap={5}>
        <Link to={"/Noticias"}>
          <Text sx={textNavBarStyles}>Noticias</Text>
        </Link>
        <Link to={"/Manga-Animes"}>
          <Text sx={textNavBarStyles}>Manga / Anime</Text>
        </Link>
        <Link to={"/Enviar-sugerencia"}>
          <Text sx={textNavBarStyles}>!Envíanos Tu Recomendación🧐</Text>
        </Link>
        {!user.logged && (
          <>
            <Link to={"/Register"}>
              <Text sx={textNavBarStyles}>¿Deseas ser Mod?</Text>
            </Link>
            <Link to={"/ModsPanel"}>
              <Text sx={textNavBarStyles}>Login</Text>
            </Link>
          </>
        )}
        {user.logged && (
          <Link to={"/ModsScreen"}>
            <Text sx={textNavBarStyles}>Mod DashBoard😎</Text>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};
