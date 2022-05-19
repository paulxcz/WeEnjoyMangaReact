import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { uploadAnimeById } from "../../requests/Posts/PostRequests";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { errorTypesMessage } from "../../helpers/errorTypesMessage";
import { isImageFile } from "../../helpers/isImageFile";
import { getBase64 } from "../../helpers/getBase64";
import cargarDataAnimes from "../../helpers/cargarDataAnimes";

export const ModalEditar = ({
  tipoRecomendacion,
  setDataAnimes,
  isOpen,
  onClose,
  animeId,
  animeName,
  dateRelease,
  mangaka,
  sinopsis,
  idGenero,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const validImageTypes = ["image/png", "image/jpg", "image/jpeg"];

  const MySwal = withReactContent(Swal);


  setValue("animeName", animeName);
  setValue("mangaka", mangaka);
  setValue("dateCreated", dateRelease);
  setValue("idGenero", idGenero);
  setValue("sinopsis", sinopsis);

  const uploadAnimeData = async (data) => {
    console.log(data);

    if (data.animeImage.length > 0) {
      if (
        validImageTypes.includes(data.animeImage[0].type) &&
        data.animeImage[0].size <= 200000
      ) {
        const imgBase64 = await getBase64(data.animeImage[0]);
        data.animeImage = imgBase64;
      } else {
        onClose();
        await MySwal.fire({
          title: <strong>La imagen no es válida</strong>,
          html: (
            <i>La imagen debe ser de formato PNG/JPG y pesar menos de 200Kb</i>
          ),
          icon: "error",
        });
        return;
      }
    } else {
      data.animeImage = null;
    }

    if (
      data.animeName.trim() == "" ||
      data.mangaka.trim() == "" ||
      data.dateCreated == "" ||
      data.sinopsis.trim() == ""
    ) {
      onClose();
      await MySwal.fire({
        title: (
          <strong>
            Es necesario que todos los campos a excepción de imagen sean
            llenados
          </strong>
        ),
        icon: "error",
      });
    } else {
      data.id = animeId;
      const res = await uploadAnimeById(data);
      onClose();
      if (res.result === 1) {
        await MySwal.fire({
          title: <strong>Datos Actulizados</strong>,
          icon: "success",
        });
        cargarDataAnimes(tipoRecomendacion, setDataAnimes)
      } else {
        await MySwal.fire({
          title: <strong>Hubo un error</strong>,
          html: <i>{res.message || "Intentelo más tarde"}</i>,
          icon: "error",
        });
      }
    }
  };

  const tempToTestImgs = (data) => {
    if (
      validImageTypes.includes(data.animeImage[0].type) &&
      data.animeImage[0].size <= 200000
    ) {
      console.log("es imagen valida", data.animeImage[0]);
    } else {
      console.log(data.animeImage[0].size);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Anime</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl
            as={"form"}
            isInvalid={Object.keys(errors).length}
            onSubmit={handleSubmit(uploadAnimeData)}
          >
            <FormLabel>Anime:{animeName}</FormLabel>
            <Input
              name="animeName"
              type={"text"}
              {...register("animeName", {
                required: errorTypesMessage.required,
              })}
            />
            {errors.animeName && (
              <FormErrorMessage>{"Campo requerido"}</FormErrorMessage>
            )}
            <FormLabel>Mangaka:</FormLabel>
            <Input {...register("mangaka")} />
            {errors.mangaka && (
              <FormErrorMessage>{"Campo requerido"}</FormErrorMessage>
            )}
            <FormLabel>Fecha de Lanzamiento:</FormLabel>
            <Input
              name="dateCreated"
              type={"date"}
              {...register("dateCreated")}
            />
            {errors.dateCreated && (
              <FormErrorMessage>{"Campo requerido"}</FormErrorMessage>
            )}
            <FormLabel>Genero:</FormLabel>
            <Select
              name="idGenero"
              {...register("idGenero", {
                required: errorTypesMessage.required,
              })}
            >
              <option value={1}>Shonen</option>
              <option value={2}>Shojo</option>
              <option value={3}>Seinen</option>
              <option value={4}>Josei</option>
              <option value={5}>Kodomomuke</option>
            </Select>
            {errors.idGenero && (
              <FormErrorMessage>{"Campo requerido"}</FormErrorMessage>
            )}
            <FormLabel>Sinopsis:</FormLabel>
            <Textarea
              name="sinopsis"
              size="lg"
              {...register("sinopsis", {
                required: errorTypesMessage.required,
              })}
            ></Textarea>
            {errors.sinopsis && (
              <FormErrorMessage>{"Campo requerido"}</FormErrorMessage>
            )}
            <FormLabel>Imagen:</FormLabel>
            <Input
              type={"file"}
              accept="image/*"
              {...register("animeImage", {
                required: errorTypesMessage.required,
              })}
            />
            {errors.animeImage && (
              <FormErrorMessage>{"Campo requerido"}</FormErrorMessage>
            )}
            <Button onClick={onClose} float="right" mt={4}>
              Cancel
            </Button>
            <Button type="submit" colorScheme={"blue"} mt={4} float="right">
              Guardar
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
