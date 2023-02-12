import * as React from "react";
import ReactDOM from "react-dom/client";

import "./SampleBuildOrder.css";

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type BuildOrderSteps = {
  currentStep: string;
  wood: number;
  food: number;
  gold: number;
  stone: number;
};

const defaultData: BuildOrderSteps[] = [
  {
    currentStep: "6 on sheep",
    wood: 0,
    food: 6,
    gold: 0,
    stone: 0,
  },
  {
    currentStep: "3 on wood",
    wood: 3,
    food: 6,
    gold: 0,
    stone: 0,
  },
  {
    currentStep: "1 lure boar, then +1 on sheep",
    wood: 3,
    food: 8,
    gold: 0,
    stone: 0,
  },
  {
    currentStep: "4 on berries",
    wood: 3,
    food: 12,
    gold: 0,
    stone: 0,
  },
  {
    currentStep: "+2 on boar, move 1 to farm",
    wood: 3,
    food: 14,
    gold: 0,
    stone: 0,
  },
  {
    currentStep: "Rest to wood",
    wood: 5,
    food: 14,
    gold: 0,
    stone: 0,
  },
];

const columnHelper = createColumnHelper<BuildOrderSteps>();

const columns = [
  columnHelper.accessor("currentStep", {
    cell: (info) => info.getValue(),
    header: () => "Current Step",
  }),
  columnHelper.accessor((row) => row.wood, {
    id: "wood",
    cell: (info) => {
      let currentvalue = info.getValue();
      if (currentvalue <= 0) {
        return <i>{currentvalue}</i>;
      } else {
        return info.getValue();
      }
    },
    header: () => <span>Wood</span>,
  }),
  columnHelper.accessor("food", {
    header: () => "Food",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("gold", {
    header: () => <span>Gold</span>,
  }),
  columnHelper.accessor("stone", {
    header: "Stone",
  }),
];

export default function SampleBuildOrder() {
  const [data, setData] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
    </div>
  );
}
