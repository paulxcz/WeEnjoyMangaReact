import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useContext, useState } from "react";
import { postAccess, registerMod } from "../requests/Posts/PostRequests";
import { sha256 } from "../helpers/getSha245";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";
import { types } from "../types/types";
import dayjs from "dayjs";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const ModRegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isCaptchaConfirmed, setIsCaptchaConfirmed] = useState(false);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const today = dayjs().format();

  const { dispatch } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleCapchaSubmit = (token) => {
    setIsCaptchaConfirmed(true);
  };

  const onExpiredCaptcha = () => {
    setIsCaptchaConfirmed(false);
  };

  const handleShowPassButton = () => setShow(!show);

  const onSubmit = async (data) => {
    if (isCaptchaConfirmed) {
      data.password = sha256(data.password);

      const res = await registerMod(data);
      if (res.result === 1) {
        await MySwal.fire({
          title: <strong>Envío de solicitud Exitoso</strong>,
          icon: "success",
        });
      } else {
        await MySwal.fire({
          title: <strong>{res.message}</strong>,
          html: <i>You clicked the button!</i>,
          icon: "error",
        });
      }
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
          name="userName"
          type={"text"}
          {...register("userName", {
            required: "Campo requerido",
            maxLength: {
              value: 10,
              message: "Por favor ingrese como máximo 10 caracteres",
            },
            pattern : {
              value: /^[a-zA-Z0-9\s]*$/,
              message: 'No se permiten caracteres especiales'
            }
          })}
        />
        {errors.userName && (
          <FormErrorMessage>{errors.userName.message}</FormErrorMessage>
        )}
        <FormLabel mt={5}>Contraseña:</FormLabel>
        <InputGroup size={"md"}>
          <Input
            name="password"
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            {...register("password", {
              required: "Campo requerido",
              maxLength: {
                value: 10,
                message: "Por favor ingrese como máximo 10 caracteres",
              },
              pattern : {
                value: /^[a-zA-Z0-9\s]*$/,
                message: 'No se permiten caracteres especiales'
              }
            })}
          />
          <InputRightElement width="4.5rem">
            <Button
              h={"1.75rem"}
              size={"sm"}
              mr={"5px"}
              onClick={handleShowPassButton}
            >
              {show ? "Ocultar" : "Mostrar"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
        <FormLabel mt={5}>Fecha de Nacimiento:</FormLabel>
        <Input
          as={"input"}
          name="dateOfBirthday"
          type={"date"}
          {...register("dateOfBirthday", {
            required: "Campo requeridos",
            max: {
              value: today,
              message: "La fecha debe ser inferior a la actual",
            },
          })}
        />
        {errors.dateOfBirthday && (
          <FormErrorMessage>{errors.dateOfBirthday.message}</FormErrorMessage>
        )}
        <FormLabel mt={5}>¿Por qué deseas ser Mod?</FormLabel>
        <Textarea
          name="reasonToBeMod"
          mb={5}
          {...register("reasonToBeMod", {
            required: "Campo requerido",
            maxLength: {
              value: 200,
              message: "Ha superado los 200 caracteres",
            },
            minLength: {
              value: 50,
              message: "Debe ingresar mínimo 50 caracteres",
            }
          })}
        ></Textarea>
        {errors.reasonToBeMod && (
          <FormErrorMessage mb={5}>{errors.reasonToBeMod.message}</FormErrorMessage>
        )}
        <ReCAPTCHA
          sitekey="6LfhPvAeAAAAAOJiv4xd4YaTr8kwj2yL4CdxckGd"
          onChange={handleCapchaSubmit}
          style={{ alignSelf: "center" }}
          type="image"
          onExpired={onExpiredCaptcha}
        />
        <Button
          mt={5}
          type="submit"
          bg={"blue.300"}
          isDisabled={!isCaptchaConfirmed}
        >
          Registrar Solicitud
        </Button>
      </FormControl>
    </Container>
  );
};
