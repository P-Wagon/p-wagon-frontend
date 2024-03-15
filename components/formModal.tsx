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
  } from '@chakra-ui/react'
  
  import { useState, ChangeEvent } from 'react';
  import ErrorMessage from './inputForm';
  
  function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const handleSubmit = (values: { description: string; color: string; plateNo: string; estimatedTime: string }) => {
      console.log(values);
      onClose();
    };
  
    return (
      <>
        <Button onClick={onOpen}>Post Alert</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ErrorMessage onSubmit={handleSubmit} />
            </ModalBody>
  
            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  
  export default BasicUsage;
  