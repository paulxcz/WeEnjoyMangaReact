import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useContext } from "react";
import { postAccess } from "../requests/Posts/PostRequests";
import { sha256 } from "../helpers/getSha245";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";
import { types } from "../types/types";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const ModsRoute = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const MySwal = withReactContent(Swal);

  const onSubmit = async (data) => {
    const passwordString = data.password;
    data.password = sha256(data.password);
    const res = await postAccess(data);
    console.log(res);
    if (res.result === 1) {
      const action = {
        type: types.login,
        payload: { name: res.data.username, password: passwordString, id: res.data.id, rol: res.data.idRol },
      };

      dispatch(action);
      navigate("/ModsScreen");
    } else {
      await MySwal.fire({
        title: <strong>{res.message}</strong>,
        html: <i>You clicked the button!</i>,
        icon: "error",
      });
    }
  };
  return (
    <Container
      // bg={'black'}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minH={"70vh"}
    >
      <FormControl
        as={"form"}
        display={"flex"}
        flexDir={"column"}
        onSubmit={handleSubmit(onSubmit)}
        isInvalid={Object.keys(errors).length}
      >
        <FormLabel>Usuario:</FormLabel>
        <Input
          name="user"
          type={"text"}
          {...register("user", {
            required: "Campo requerido",
            maxLength: {
              value: 10,
              message: "Ingresé como máximo 10 caracteres",
            },
          })}
        />
        {errors.user && (
          <FormErrorMessage>{errors.user.message}</FormErrorMessage>
        )}
        <FormLabel mt={5}>Contraseña:</FormLabel>
        <Input
          name="password"
          type={"password"}
          {...register("password", {
            required: "Campo requerido",
            maxLength: {
              value: 10,
              message: "Ingresé como máximo 10 caracteres",
            },
          })}
        />
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
        <Button mt={5} type="submit" bg={"blue.300"}>
          Ingresar
        </Button>
      </FormControl>
    </Container>
  );
};
