import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, ChangeEvent } from "react";

type ErrorMessageProps = {
  onSubmit: (values: {
    description: string;
    color: string;
    plateNo: string;
    estimatedTime: string;
  }) => void;
};

function ModalFormInput({ onSubmit }: ErrorMessageProps) {
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [plateNo, setplateNo] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  const validatePlateNo = (value: string) => {
    const plateNoRegex = /^[A-Za-z]{2}\d{2}[A-Za-z]{2}\d{4}$/;
    return plateNoRegex.test(value);
  };

  const handleSubmit = () => {
    if (description && color && plateNo && estimatedTime) {
      const postData = {
        description: description,
        color: color,
        plateNo: plateNo,
        estimatedTime: estimatedTime,
      };

      axios
        .post("https://p-wagon-backend.vercel.app/api/postAlert", postData)
        .then((response) => {
          console.log("Success:", response.data);
          onSubmit(postData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <FormControl>
      <FormLabel>Description</FormLabel>
      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FormErrorMessage>This is a required field.</FormErrorMessage>

      <FormLabel mt={4}>Colour</FormLabel>
      <Input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <FormErrorMessage>This is a required field.</FormErrorMessage>

      <FormLabel mt={4}>License Plate Number</FormLabel>
      <Input
        type="text"
        value={plateNo}
        onChange={(e) => setplateNo(e.target.value)}
        isInvalid={plateNo.length > 0 && !validatePlateNo(plateNo)}
      />
      <FormErrorMessage>
        {plateNo.length > 0 && !validatePlateNo(plateNo)
          ? "Invalid License Plate Number format"
          : "This is a required field."}
      </FormErrorMessage>
      <FormErrorMessage>
        {plateNo.length > 0 && !validatePlateNo(plateNo)
          ? "Invalid License Plate Number format"
          : "This is a required field."}
      </FormErrorMessage>

      <FormLabel mt={4}>Last Known Date & Time</FormLabel>
      <Input
        type="datetime-local"
        value={estimatedTime}
        onChange={(e) => setEstimatedTime(e.target.value)}
      />
      <FormErrorMessage>This is a required field.</FormErrorMessage>

      <Button
        mt={8}
        onClick={handleSubmit}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        style={{
          border: "1px solid yellow",
          background: isHovered ? "yellow" : "transparent",
          color: isHovered ? "black" : "white",
          alignItems: "center",
        }}
      >
        SUBMIT
      </Button>
    </FormControl>
  );
}

export default ModalFormInput;
