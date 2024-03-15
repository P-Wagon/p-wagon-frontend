import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

interface CrimeDetails {
  color: string;
  license: string;
}

interface CrimeRecord {
  description: string;
  details: CrimeDetails;
  estimatedTime: string;
  status: boolean;
}

interface Crimes {
  [key: string]: CrimeRecord;
}

const CrimesTable: React.FC = () => {
  const [crimes, setCrimes] = useState<CrimeRecord[]>([]);

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const response = await axios.get<Crimes>('https://p-wagon-backend.vercel.app/api/fetchCrimes');
        // Convert the object of objects into an array of objects
        const crimesArray = Object.values(response.data);
        setCrimes(crimesArray);
      } catch (error) {
        console.error('There was an error fetching the crimes:', error);
      }
    };
    
    fetchCrimes();
  }, []);

  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>License Plate</Th>
            <Th>Color</Th>
            <Th>Estimated Time</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {crimes.map((crime, index) => (
            <Tr key={index}>
              <Td>{crime.description}</Td>
              <Td>{crime.details.license}</Td>
              <Td>{crime.details.color}</Td>
              <Td>{crime.estimatedTime}</Td>
              <Td>{crime.status ? 'Active' : 'Inactive'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CrimesTable;
