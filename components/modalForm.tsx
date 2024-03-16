import React, { useState } from "react";
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

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <>
      <Button
        onClick={onOpen}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        style={{
          border: "1px solid #00D094",
          background: isHovered ? "#00D094" : "transparent",
          color: isHovered ? "black" : "white",
        }}
      >
        SEND ALERT
      </Button>
      <div className="absolute inset-0">
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent
            bg="#1b1b1a"
            color="white"
            // border="1px solid white"
            borderRadius="xl"
            boxShadow="xl"
          >
            <ModalHeader>Send Alert</ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
              <ModalFormInput onSubmit={handleSubmit} />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

export default ModalForm;
