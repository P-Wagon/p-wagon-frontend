import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button
} from '@chakra-ui/react'
import axios from 'axios';
import { useState, ChangeEvent } from 'react';

type ErrorMessageProps = {
  onSubmit: (values: { description: string; color: string; plateNo: string; estimatedTime: string }) => void;
};

function ModalFormInput({ onSubmit }: ErrorMessageProps) {
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [plateNo, setplateNo] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  const handleSubmit = () => {
      if (description && color && plateNo && estimatedTime) {
        const postData = {
          description: description,
          color: color,
          plateNo: plateNo,
          estimatedTime: estimatedTime
        };
    
        axios.post('https://p-wagon-backend.vercel.app/api/postAlert', postData)
          .then(response => {
            console.log('Success:', response.data);
            // Call the onSubmit prop with the form values if you still need to pass the data to the parent component
            onSubmit(postData);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    };

  return (
    <FormControl>
      <FormLabel>Description</FormLabel>
      <Input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
      <FormErrorMessage>This is a required field.</FormErrorMessage>

      <FormLabel>Colour</FormLabel>
      <Input type='text' value={color} onChange={(e) => setColor(e.target.value)} />
      <FormErrorMessage>This is a required field.</FormErrorMessage>

      <FormLabel>License Plate Number</FormLabel>
      <Input type='text' value={plateNo} onChange={(e) => setplateNo(e.target.value)} />
      <FormErrorMessage>This is a required field.</FormErrorMessage>

      <FormLabel>Estimated Time</FormLabel>
      <Input type='time' value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} />
      <FormErrorMessage>This is a required field.</FormErrorMessage>

      <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
        Submit
      </Button>
    </FormControl>
  )
}

export default ModalFormInput;
