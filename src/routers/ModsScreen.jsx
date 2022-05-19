import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Flex,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { BsPencil } from "react-icons/bs";
import {
  AiFillCheckCircle,
  AiFillDelete,
  AiFillInfoCircle,
} from "react-icons/ai";
import { FcViewDetails } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { getAnimeById } from "../requests/Gets/GetsRequests";
import { ModalDetalleAnime } from "../Components/CustomsModals/ModalDetalleAnime";
import * as dayjs from "dayjs";
import {
  confirmAnime,
  deleteAnimeById,
  desactivateAnimeByMod,
  getAnimes,
} from "../requests/Posts/PostRequests";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ModalEditar } from "../Components/CustomsModals/ModalEditar";
import { types } from "../types/types";
import MenuMod from "../Components/MenuMod/MenuMod";
import cargarDataAnimes from "../helpers/cargarDataAnimes";

export const ModsScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModelEditar,
    onOpen: onOpenModelEditar,
    onClose: onCloseModelEditar,
  } = useDisclosure();
  const [dataAnimes, setDataAnimes] = useState(null);
  const [specificAnimeData, setSpecificAnimeData] = useState(null);
  const { tipoRecomendacion } = watch();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    cargarDataAnimes(tipoRecomendacion, setDataAnimes);
  }, [tipoRecomendacion]);

  const setInfoAnimeModel = (animeId) => {
    getAnimeById(animeId).then((anime) => {
      if (anime.data != null) {
        setSpecificAnimeData(anime.data);
        onOpen();
      }
    });
  };

  const setInfoModelEditar = (animeId) => {
    getAnimeById(animeId).then((anime) => {
      if (anime.data != null) {
        setSpecificAnimeData(anime.data);
        onOpenModelEditar();
      }
    });
  };

  const confirmAnimeByMod = async (animeId) => {
    await MySwal.fire({
      title: <strong>Confirmar accion</strong>,
      showDenyButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        confirmAnime(animeId).then(async (anime) => {
          if (anime.result == 1) {
            cargarDataAnimes(tipoRecomendacion, setDataAnimes);
            await MySwal.fire({
              title: <strong>Cambio de estado exitoso!</strong>,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const setAnimePendingByMod = async (animeId) => {
    await MySwal.fire({
      title: <strong>Confirmar accion</strong>,
      showDenyButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        desactivateAnimeByMod(animeId).then(async (anime) => {
          if (anime.result == 1) {
            cargarDataAnimes(tipoRecomendacion, setDataAnimes);
            await MySwal.fire({
              title: <strong>Cambio de estado exitoso!</strong>,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const deleteAnime = async(animeId) => {
    await MySwal.fire({
      title: <strong>Confirmar accion</strong>,
      showDenyButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAnimeById(animeId).then(async (anime) => {
          if (anime.result == 1) {
            await MySwal.fire({
              title: <strong>Anime Eliminado</strong>,
              icon: "success",
            });
            cargarDataAnimes(tipoRecomendacion, setDataAnimes);
          }
        });
      }
    });

  };

  return (
    <Container maxW={"90vw"} mt={10}>
      <Flex justifyContent={"space-between"}>
        <Select
          maxW={"280px"}
          placeholder="Tipo de Recomendaciones"
          {...register("tipoRecomendacion")}
        >
          <option value={"1"}>Recomendaciones Confirmadas</option>
          <option value={"2"}>Recomendaciones Pendientes</option>
        </Select>
        <MenuMod text={"Configuración"} route={"/ModData"} />
      </Flex>
      <TableContainer>
        <Table variant={"simple"}>
          <TableCaption placement="top">
            {tipoRecomendacion == 1
              ? "Animes Confirmados"
              : "Animes Pendientes"}
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Anime</Th>
              <Th>Sinopsis</Th>
              <Th>Mangaka</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataAnimes
              ? dataAnimes.map((anime) => (
                  <Tr key={anime?.animeName}>
                    <Td maxW={"200px"} isTruncated>
                      {anime?.animeName}
                    </Td>
                    <Tooltip label={anime?.sinopsis}>
                      <Td maxW={"200px"} isTruncated>
                        {anime?.sinopsis}
                      </Td>
                    </Tooltip>
                    <Td>{anime?.mangaka}</Td>
                    <Td>
                      <Tooltip label="Editar">
                        <Button
                          mr={"10px"}
                          colorScheme={"cyan"}
                          onClick={() => {
                            setInfoModelEditar(anime.animeId);
                          }}
                        >
                          <BsPencil />
                        </Button>
                      </Tooltip>
                      {anime?.idStatus == 2 ? (
                        <Tooltip label="Confirmar">
                          <Button
                            mr={"10px"}
                            colorScheme={"green"}
                            onClick={() => {
                              confirmAnimeByMod(anime.animeId);
                            }}
                          >
                            <AiFillCheckCircle />
                          </Button>
                        </Tooltip>
                      ) : (
                        <Tooltip label="Cambiar estado a pendiente">
                          <Button
                            mr={"10px"}
                            colorScheme={"orange"}
                            onClick={() => {
                              setAnimePendingByMod(anime.animeId);
                            }}
                          >
                            <AiFillInfoCircle />
                          </Button>
                        </Tooltip>
                      )}
                      <Tooltip label="Eliminar">
                        <Button
                          mr={"10px"}
                          colorScheme={"red"}
                          onClick={() => {
                            deleteAnime(anime.animeId);
                          }}
                        >
                          <AiFillDelete />
                        </Button>
                      </Tooltip>
                      <Tooltip label="Ver Detalle">
                        <Button
                          colorScheme={"blue"}
                          onClick={() => {
                            setInfoAnimeModel(anime?.animeId);
                          }}
                        >
                          <FcViewDetails />
                        </Button>
                      </Tooltip>
                    </Td>
                  </Tr>
                ))
              : null}
          </Tbody>
        </Table>
      </TableContainer>
      <ModalDetalleAnime
        animeName={specificAnimeData?.animeName}
        dateRelease={dayjs(specificAnimeData?.dateCreated).format("DD-MM-YYYY")}
        mangaka={specificAnimeData?.mangaka}
        modalHeader={"Detalle de Anime"}
        statusName={specificAnimeData?.statusName}
        sinopsis={specificAnimeData?.sinopsis}
        isOpen={isOpen}
        onClose={onClose}
      />
      <ModalEditar
        setDataAnimes={setDataAnimes}
        tipoRecomendacion={tipoRecomendacion}
        animeName={specificAnimeData?.animeName}
        animeId={specificAnimeData?.animeId}
        dateRelease={dayjs(specificAnimeData?.dateCreated).format("YYYY-MM-DD")}
        mangaka={specificAnimeData?.mangaka}
        modalHeader={"Editar de Anime"}
        sinopsis={specificAnimeData?.sinopsis}
        idStatus={specificAnimeData?.idStatus}
        idGenero={specificAnimeData?.idGenero}
        isOpen={isOpenModelEditar}
        onClose={onCloseModelEditar}
      />
    </Container>
  );
};
