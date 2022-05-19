import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

export const ModalDetalleAnime = ({
  isOpen,
  modalHeader,
  animeName,
  dateRelease,
  mangaka,
  sinopsis,
  statusName,
  onClose
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalHeader}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={"15px"} divider={<StackDivider borderColor='gray.200'/>}>
            <Flex w={'100%'} justifyContent={'space-between'}>
              <Text>Anime: </Text><Text>{animeName}</Text>
            </Flex>
            <Flex w={'100%'} justifyContent={'space-between'}>
              <Text>Fecha de Lanzamiento: </Text><Text>{dateRelease}</Text>
            </Flex>
            <Flex w={'100%'} justifyContent={'space-between'}>
              <Text>Mangaka: </Text><Text>{mangaka}</Text>
            </Flex>
            <Flex w={'100%'} justifyContent={'space-between'}>
              <Text>Sinopsis: </Text><Text maxW={'70%'}>{sinopsis}</Text>
            </Flex>
            <Flex w={'100%'} justifyContent={'space-between'}>
              <Text>Estado: </Text><Text>{statusName}</Text>
            </Flex>
          </VStack>
        </ModalBody>
        <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
