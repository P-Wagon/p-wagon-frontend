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
import "./dataTable.css";

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
  const [crimeIds, setCrimeIds] = useState<string[]>([]);
  const [crimes, setCrimes] = useState<CrimeRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [crimeStatusus, setCrimeStatuses] = useState<boolean[]>([]);

  const fetchCrimes = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Crimes>(
        "https://p-wagon-backend.vercel.app/api/fetchCrimes"
      );
      setCrimeIds(Object.keys(response.data));
      const crimesArray = Object.values(response.data);
      setCrimes(crimesArray);
      setCrimeStatuses(crimesArray.map((crime) => crime.status));
      setLoading(false);
    } catch (error) {
      console.error("There was an error fetching the crimes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrimes();
    setCrimeStatuses(crimes.map((crime) => crime.status));
  }, []);

  const handleReload = () => {
    fetchCrimes();
  };

  const handleArchiveCrime = async ( crimeId: string, index: number ) => {
    if (crimeStatusus[index]) {
      try {
        const response = await axios.post(
          "https://p-wagon-backend.vercel.app/api/archiveCrime",
          { crimeId }
          );
          if (response.status === 200) {
            const index = crimeIds.indexOf(crimeId);
            const newStatuses = [...crimeStatusus];
            newStatuses[index] = false;
            setCrimeStatuses(newStatuses);
            console.log("Crime archived successfully")
          }
        } catch (error) {
          console.error("There was an error archiving the crime:", error);
        }
      } else {
        try {
          const response = await axios.post(
            "https://p-wagon-backend.vercel.app/api/unarchiveCrime",
            { crimeId }
          );
          if (response.status === 200) {
            const index = crimeIds.indexOf(crimeId);
            const newStatuses = [...crimeStatusus];
            newStatuses[index] = true;
            setCrimeStatuses(newStatuses);
            console.log("Crime unarchived successfully")
          }
        } catch (error) {
          console.error("There was an error unarchiving the crime:", error);
        }
      }
    }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}-${month}-${year}, ${hours}:${minutes}`;
  };

  return (
    <Flex direction="row" alignItems="top">
      {loading ? (
        <Spinner size="sm" color="#00D094" mr={4} mt={3} />
      ) : (
        <Icon
          as={FaSync}
          onClick={handleReload}
          boxSize={4}
          color="#00D094"
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
    <Tr key={crimeIds[index]} id={crimeIds[index]} className="bg-black text-white text-center">
      <Td>{crime.description}</Td>
      <Td>{crime.details.license}</Td>
      <Td>{crime.details.color}</Td>
      <Td>{formatDate(crime.estimatedTime)}</Td>
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
      <Td
        onClick={() => {
          handleArchiveCrime(crimeIds[index], index);
        }}
                  style={{ cursor: "pointer" }}
                >
                  {crimeStatusus[index] ? "Active" : "Inactive"}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default CrimesTable;
