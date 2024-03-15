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
import ModalFormInput from './modalFormInput';
  
  function ModalForm() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const handleSubmit = (values: { description: string; color: string; plateNo: string; estimatedTime: string }) => {
      console.log(values);
      onClose();
    };
  
    return (
      <>
        <Button onClick={onOpen}>Send Alert</Button>
        <div className="absolute inset-0">
          <Modal  isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Send Alert</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <ModalFormInput onSubmit={handleSubmit} />
              </ModalBody>
    
              <ModalFooter>
              </ModalFooter>
            </ModalContent>
          </Modal>
          </div>
      </>
    )
  }
  
export default ModalForm;
  