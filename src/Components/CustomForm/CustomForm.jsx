import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { postAnime } from "../../requests/Posts/PostRequests";
import dayjs from "dayjs";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const CustomForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isCaptchaConfirmed, setIsCaptchaConfirmed] = useState(false);
  const MySwal = withReactContent(Swal);

  const errorTypes = {
    required: "Es necesario completar este campo",
    oversize: "Ha superado el límite de caracteres disponible",
    requiredSelect: "Es necesario seleccionar una opción",
    dateOverToday: "Por favor seleccione una fecha menor a la actual",
    sinopsisInsuficientCharacters: "Por favor ingrese al menos 50 caracteres",
  };
  const today = dayjs().format();

  const onSubmit = async (data) => {
    if (isCaptchaConfirmed) {
      const res = await postAnime(data);

      if (res.result === 1) {
        await MySwal.fire({
          title: <strong>Envío Exitoso</strong>,
          icon: "success",
        });
      } else {
        await MySwal.fire({
          title: <strong>Hubo un error</strong>,
          html: <i>You clicked the button!</i>,
          icon: "error",
        });
      }
    }
  };

  const handleCapchaSubmit = (token) => {
    setIsCaptchaConfirmed(true);
  };

  const onExpiredCaptcha = () => {
    setIsCaptchaConfirmed(false);
  };

  Window.handleCapchaSubmit = handleCapchaSubmit;
  return (
    <FormControl
      as={"form"}
      onSubmit={handleSubmit(onSubmit)}
      isInvalid={Object.keys(errors).length}
      display="flex"
      flexDir={"column"}
    >
      <FormLabel htmlFor="animeName">Nombre del Anime/Manga</FormLabel>
      <Input
        name="animeName"
        type={"text"}
        placeholder="Ejemplo: Naruto"
        {...register("animeName", {
          required: errorTypes.required,
          maxLength: { value: 50, message: "Ha ingesado más de 50 caracteres" },
          validate : v => !!v.trim() || "Espacios en blanco no validos"
        })}
      />
      {errors.animeName && (
        <FormErrorMessage>{errors.animeName.message}</FormErrorMessage>
      )}

      <FormLabel htmlFor="idGenero">Categoria</FormLabel>
      <Select
        name="idGenero"
        placeholder="Elige un Género"
        {...register("idGenero", {
          required: "Es necesario seleccionar una opción",
        })}
      >
        <option value={"1"}>Shonen</option>
        <option value={"2"}>Shojo</option>
        <option value={"3"}>Seinen</option>
        <option value={"4"}>Josei</option>
        <option value={"5"}>Kodomomuke</option>
      </Select>
      {errors.idGenero && (
        <FormErrorMessage>{errors.idGenero.message}</FormErrorMessage>
      )}

      <FormLabel htmlFor="mangaka">Mangaka</FormLabel>
      <Input
        name="mangaka"
        type={"text"}
        placeholder="Ejemplo: Masashi Kishimoto"
        {...register("mangaka", {
          required: errorTypes.required,
          maxLength: { value: 50, message: "Ha ingesado más de 50 caracteres" },
          validate : v => !!v.trim() || "Espacios en blanco no validos",
          pattern : {
            value: /^[a-zA-Z\s]*$/,
            message: 'Solo se pueden ingresar Letras'
          }
        })}
      />
      {errors.mangaka && (
        <FormErrorMessage>{errors.mangaka.message}</FormErrorMessage>
      )}

      <FormLabel htmlFor="dateCreated">Fecha de lanzamiento</FormLabel>
      <Input
        as={"input"}
        name="dateCreated"
        type={"date"}
        {...register("dateCreated", {
          required: errorTypes.required,
          max: {
            value: today,
            message: "Ingresa una fecha inferior a la actual",
          },
        })}
      />
      {errors.dateCreated && (
        <FormErrorMessage>{errors.dateCreated.message}</FormErrorMessage>
      )}

      <FormLabel htmlFor="sinopsis">Sinopsis</FormLabel>
      <Textarea
        name="sinopsis"
        mb={4}
        {...register("sinopsis", {
          required: errorTypes.required,
          maxLength: { value: 700, message: "Por favor ingrese máximo 700 caracteres" },
          minLength: { value: 50, message: "Por favor ingrese mínimo 50 caracteres" },
          validate : v => !!v.trim() || "Espacios en blanco no validos"
        })}
      ></Textarea>
      {errors.sinopsis && (
        <FormErrorMessage>{errors.sinopsis.message}</FormErrorMessage>
      )}

      <ReCAPTCHA
        sitekey="6LfhPvAeAAAAAOJiv4xd4YaTr8kwj2yL4CdxckGd"
        onChange={handleCapchaSubmit}
        style={{ alignSelf: "center" }}
        type="image"
        onExpired={onExpiredCaptcha}
      />
      <Button
        marginTop={4}
        bg={"orange.300"}
        type="submit"
        isDisabled={!isCaptchaConfirmed}
      >
        Enviar
      </Button>
    </FormControl>
  );
};
