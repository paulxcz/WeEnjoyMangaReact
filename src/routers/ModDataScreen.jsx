import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Switch,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { AuthContext } from "../auth/authContext";
import { Navigate } from "react-router-dom";
import {
  getModInfoByUsername,
  updateUserData,
} from "../requests/Posts/PostRequests";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { sha256 } from "../helpers/getSha245";
import MenuMod from "../Components/MenuMod/MenuMod";
import { types } from "../types/types";

export const ModDataScreen = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const MySwal = withReactContent(Swal);

  const today = dayjs().format();

  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    getModInfoByUsername(user.name).then((res) => {
      if (res.result == 1) {
        setValue("username", user.name);
        setValue(
          "dateOfBirthday",
          dayjs(res.data.dateOfBirthday).format("YYYY-MM-DD")
        );
        setValue("password", user.password);
      }
    });
  }, [user]);

  const onSubmit = async (data) => {
    await MySwal.fire({
      title: <strong>Confirmar accion</strong>,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        data.id = user.id;
        const passwordString = data.password;
        data.password = sha256(data.password);
        delete data.dateOfBirthday;
        updateUserData(data).then((res) => {
          if (res.result == 1) {
            
            const action = {
              type: types.login,
              payload: { name: data.username, password: passwordString, id: user.id },
            };

            dispatch(action);
            MySwal.fire({
              title: <strong>Datos Actualizados</strong>,
              icon: "success",
            });
          }
        });
      }
    });
  };

  return user.logged ? (
    <Container maxW={""}>
      <Flex justifyContent={"space-between"} mt={2}>
        <Box>
          <Heading mb={5}>Datos Personales:</Heading>
          <FormLabel display={"inline"}>¿Editar?: </FormLabel>
        </Box>
        <MenuMod text={"Mod Dashboard"} route={"/ModsScreen"} />
      </Flex>
      <Switch
        size={"lg"}
        colorScheme="green"
        onChange={() => {
          setIsEditable(!isEditable);
        }}
      />
      <FormControl
        as={"form"}
        onSubmit={handleSubmit(onSubmit)}
        isInvalid={Object.keys(errors).length}
      >
        <FormLabel mt={5}>Usuario:</FormLabel>
        <Input
          name="username"
          {...register("username", {
            required: "Es necesario colocar un usuario",
            maxLength: {
              value: 10,
              message: "Ha ingesado más de 10 caracteres",
            },
            validate: (v) => !!v.trim() || "Espacios en blanco no validos",
            pattern: {
              value: /^[a-zA-Z0-9_.-]*$/,
              message: "Caracteres especiales no validos",
            },
          })}
          readOnly={!isEditable}
        />
        {errors.username && (
          <FormErrorMessage>{errors.username.message}</FormErrorMessage>
        )}
        <FormLabel mt={5}>Fecha de Nacimiento:</FormLabel>
        <Input
          type={"date"}
          name="dateOfBirthday"
          readOnly
          {...register("dateOfBirthday", {
            required: "Campo Requerido",
            max: {
              value: today,
              message: "La fecha debe ser anterior a la actual",
            },
          })}
        />
        <FormLabel mt={5}>Contraseña:</FormLabel>
        <InputGroup size={"md"}>
          <Input
            name="password"
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            readOnly={!isEditable}
            {...register("password", {
              required: "Campo requerido",
              maxLength: {
                value: 15,
                message: "Ha ingesado más de 15 caracteres",
              },
              validate: (v) => !!v.trim() || "Espacios en blanco no validos",
              pattern: {
                value: /^[a-zA-Z0-9_.-]*$/,
                message: "Caracteres especiales no validos",
              },
            })}
          />
          <InputRightElement width="4.5rem">
            <Button
              h={"1.75rem"}
              size={"sm"}
              mr={"5px"}
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? "Ocultar" : "Mostrar"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
        {isEditable ? (
          <Button type="submit" colorScheme={"blue"} mt={5}>
            Actualizar Datos
          </Button>
        ) : null}
      </FormControl>
    </Container>
  ) : (
    <Navigate to={"/"} />
  );
};
