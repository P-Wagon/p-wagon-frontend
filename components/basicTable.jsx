import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import mData from "../MOCK_DATA.json";

const basicTable = () => {
  // "id": 1,
  // "description": "des",
  // "color": "red",
  // "lpd": "TN 01 AP 2024",
  // "location": "coordinates"
  // "time": "24:24"

  const data = useMemo(() => mData, []);

  /** @type import('@tanstack/react-table').ColumnDef<any>*/
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      footer: "ID",
    },
    {
      header: "DESCRIPTION",
      accessorKey: "description",
      footer: "DESCRIPTION",
    },
    {
      header: "COLOR",
      accessorKey: "color",
      footer: "COLOR",
    },
    {
      header: "LICENSE_PLATE_NUMBER",
      accessorKey: "lpd",
      footer: "LICENSE PLATE NUMBER",
    },
    {
      header: "LOCATION",
      accessorKey: "location",
      footer: "LOCATION",
    },
    {
      header: "TIME",
      accessorKey: "time",
      footer: "TIME",
    },
  ];

  const table = useReactTable(data, columns);
  return (
    <div>
      <table>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
        <thead>
          <tr>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>ID</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default basicTable;