import { ModalOverlay } from "@chakra-ui/react";
import { ModalHeader } from "@chakra-ui/react";
import { ModalBody } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { StackDivider } from "@chakra-ui/react";
import { ModalFooter } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { ModalCloseButton } from "@chakra-ui/react";
import { ModalContent } from "@chakra-ui/react";
import { Modal } from "@chakra-ui/react";
import React from "react";

export const ModalDetalleMod = ({
  isOpen,
  modalHeader,
  username,
  dateOfBirthday,
  userState,
  reasonToBeMod,
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
              <Text>Username: </Text>
              <Text>{username}</Text>
            </Flex>
            <Flex w={'100%'} justifyContent={'space-between'}>
              <Text>Fecha de Nacimiento: </Text>
              <Text>{dateOfBirthday}</Text>
            </Flex>
            <Flex w={'100%'} justifyContent={'space-between'}>
              <Text>Estado: </Text>
              <Text>{userState}</Text>
            </Flex>
            <Flex w={'100%'} justifyContent={'space-between'}>
              <Text>Motivo para ser Mod: </Text>
              <Text maxW={'60%'}>{reasonToBeMod}</Text>
            </Flex>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
