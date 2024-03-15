import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { FaSync } from "react-icons/fa";
import "./CustomScrollbar.css";

interface CrimeDetails {
  color: string;
  license: string;
}

interface Spotting {
  license: string;
  location: string;
  timeStamp: string;
}

interface CrimeRecord {
  description: string;
  details: CrimeDetails;
  estimatedTime: string;
  spottings: false | { [key: string]: Spotting };
  status: boolean;
}

interface Crimes {
  [key: string]: CrimeRecord;
}

const CrimesTable: React.FC = () => {
  const [crimes, setCrimes] = useState<CrimeRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCrimes = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Crimes>(
        "https://p-wagon-backend.vercel.app/api/fetchCrimes"
      );
      const crimesArray = Object.values(response.data);
      setCrimes(crimesArray);
      setLoading(false);
    } catch (error) {
      console.error("There was an error fetching the crimes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrimes();
  }, []);

  const handleReload = () => {
    fetchCrimes();
  };

  return (
    <Flex direction="row" alignItems="top">
      {loading ? (
        <Spinner size="sm" color="yellow" mr={4} mt={3} />
      ) : (
        <Icon
          as={FaSync}
          onClick={handleReload}
          boxSize={4}
          color="yellow"
          cursor="pointer"
          mr={4}
          mt={3}
        />
      )}
      <TableContainer>
        <Table variant="simple" className="w-full">
          <Thead className="bg-yellow">
            <Tr className="text-center">
              <Th>Description</Th>
              <Th>License Plate</Th>
              <Th>Color</Th>
              <Th>Last Known Date & Time</Th>
              <Th>Spottings</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {crimes.map((crime, index) => (
              <Tr key={index} className="bg-black text-white text-center">
                <Td>{crime.description}</Td>
                <Td>{crime.details.license}</Td>
                <Td>{crime.details.color}</Td>
                <Td>{crime.estimatedTime}</Td>
                <Td>
                  {crime.spottings ? (
                    <ul>
                      {Object.values(crime.spottings).map((spotting, index) => (
                        <li key={index}>
                          {spotting.location} - {spotting.timeStamp}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "N/A"
                  )}
                </Td>
                <Td>{crime.status ? "Active" : "Inactive"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default CrimesTable;
