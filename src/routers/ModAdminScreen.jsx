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
  AiFillCloseCircle,
  AiFillDelete,
  AiFillInfoCircle,
} from "react-icons/ai";
import { FcViewDetails } from "react-icons/fc";
import { useForm } from "react-hook-form";
import MenuMod from "../Components/MenuMod/MenuMod";
import { AuthContext } from "../auth/authContext";
import { Navigate } from "react-router-dom";
import cargarDataMods from "../helpers/cargarDataMods";
import { ModalDetalleMod } from "../Components/CustomsModals/ModalDetalleMod";
import { getModById } from "../requests/Gets/GetsRequests";
import * as dayjs from "dayjs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { confirmMod, deleteModById, desactivateModByUser } from "../requests/Posts/PostRequests";

export const ModAdminScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { user, dispatch } = useContext(AuthContext);
  const { tipoRecomendacion } = watch();  
  const [dataMods, setDataMods] = useState(null);
  const [specificModData, setSpecificModData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    cargarDataMods(setDataMods, tipoRecomendacion );
  }, [tipoRecomendacion]);

  const setInfoModModel = (modId) => {
    getModById(modId).then((mod) => {
      if (mod.data != null) {
        setSpecificModData(mod.data);
        onOpen();
      }
    });
  };

  const setModPendingByUser = async (modId) => {
    await MySwal.fire({
      title: <strong>Confirmar accion</strong>,
      showDenyButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        desactivateModByUser(modId).then(async (res) => {
          if (res.result == 1) {
            cargarDataMods(setDataMods, tipoRecomendacion);
            await MySwal.fire({
              title: <strong>Cambio de estado exitoso!</strong>,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const confirmAnimeByMod = async (modId) => {
    await MySwal.fire({
      title: <strong>Confirmar accion</strong>,
      showDenyButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        confirmMod(modId).then(async (res) => {
          if (res.result == 1) {
            cargarDataMods(setDataMods, tipoRecomendacion);
            await MySwal.fire({
              title: <strong>Cambio de estado exitoso!</strong>,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const deleteMod = async(modId) => {
    await MySwal.fire({
      title: <strong>Confirmar accion</strong>,
      showDenyButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteModById(modId).then(async (res) => {
          if (res.result == 1) {
            await MySwal.fire({
              title: <strong>Mod Eliminado</strong>,
              icon: "success",
            });
            cargarDataMods(setDataMods, tipoRecomendacion);
          }
        });
      }
    });

  };

  return (
    user.logged ?
    <Container maxW={"90vw"} mt={10}>
      <Flex justifyContent={"space-between"}>
        <Select
          maxW={"280px"}
          placeholder="Tipos Moderadores"
          {...register("tipoRecomendacion")}
        >
          <option value={"1"}>Mods Confirmados</option>
          <option value={"2"}>Mods Pendientes</option>
        </Select>
        <MenuMod text={"Configuración"} route={"/ModData"} />
      </Flex>
      <TableContainer>
        <Table variant={"simple"}>
          <TableCaption placement="top">
            {tipoRecomendacion == 1
              ? "Moderadores Confirmados"
              : "Moderadores Pendientes"}
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              dataMods ?
               dataMods.map((mod)=>(
                 <Tr key={mod?.id}>
                   <Td>
                     {mod?.username}
                   </Td>
                   <Td>
                     {mod?.userState}
                   </Td>
                   <Td>
                     <Tooltip label="Ver detalle de Mod">
                       <Button
                        mr={"10px"}
                        colorScheme={'blue'}
                        onClick={()=>{
                          setInfoModModel(mod?.id)
                        }}
                       >
                         <FcViewDetails />
                       </Button>
                     </Tooltip>
                     {
                       mod?.idUserState == 1 ?
                       <Tooltip label="Cambiar estado a Pendiente">
                         <Button
                          mr={"10px"}
                          colorScheme={"orange"}
                          onClick={() => {
                            setModPendingByUser(mod?.id)
                          }}
                         >
                           <AiFillInfoCircle />
                         </Button>
                       </Tooltip>
                       :
                       <Tooltip label="Cambiar estado a Confirmado">
                         <Button
                          mr={"10px"}
                          colorScheme={"green"}
                          onClick={() => {
                            confirmAnimeByMod(mod?.id)
                          }}
                         >
                           <AiFillCheckCircle />
                         </Button>
                       </Tooltip>
                     }   
                     {
                       mod?.idUserState == 2 ?
                       <Tooltip label="Rechazar Solicitud">
                         <Button
                          mr={"10px"}
                          colorScheme={"red"}
                          onClick={() => {
                            deleteMod(mod?.id);
                          }}
                         >
                           <AiFillCloseCircle />
                         </Button>
                       </Tooltip>
                       :
                       null
                     }                                 
                   </Td>
                 </Tr>
               ))
               :
               null
            }
          </Tbody>
        </Table>
      </TableContainer>
      <ModalDetalleMod 
        isOpen={isOpen}
        username={specificModData?.username}
        dateOfBirthday={dayjs(specificModData?.dateOfBirthday).format("DD-MM-YYYY")}
        modalHeader={"Detalle Moderador"}
        reasonToBeMod={specificModData?.reasonToBeMod}
        userState={specificModData?.userState}
        onClose={onClose}
      />
    </Container>
    :
    <Navigate to={'/'} />
  );
};
