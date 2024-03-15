import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { useState, ChangeEvent } from "react";
import ModalFormInput from "./modalFormInput";

function ModalForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (values: {
    description: string;
    color: string;
    plateNo: string;
    estimatedTime: string;
  }) => {
    console.log(values);
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        sx={{
          bg: "transparent",
          color: "#00D094",
          border: "2px solid #00D094",
          borderRadius: "md",
          px: 4,
          py: 2,
          _hover: {
            bg: "#00D094",
            color: "#1E1E1E",
          },
        }}
      >
        SEND ALERT
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        sx={{
          bg: 'black',
          border: '2px solid #00D094',
          borderRadius: 'md',
          color: '#00D094',
        }}
      >
        <ModalHeader>Send Alert</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <ModalFormInput onSubmit={handleSubmit} />
          </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  );
}

export default ModalForm;
