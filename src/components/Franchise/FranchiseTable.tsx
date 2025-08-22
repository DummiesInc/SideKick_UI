import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
// I'm using these components
// Show me the table filter setup similar to what's being shown in this page but with flowbite react
// https://flowbite.com/blocks/application/advanced-tables/
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Pagination,
  TextInput,
  Spinner
} from 'flowbite-react';
import {
  FranchiseData,
  FranchiseFilter,
  FranchiseTableType,
  fetchFranchises
} from '@/src/utils/Services/FranchiseService';
import If from '@/src/utils/If';
import Link from 'next/link';

const columnHelper = createColumnHelper<FranchiseData>();

const columns = [
  columnHelper.accessor('id', {
    header: 'Id',
    enableGlobalFilter: false,
    cell: (info) => (
      <Link
        href={`/franchises/${info.getValue()}`}
        className="text-blue-500 hover:underline"
      >
        {info.getValue()}
      </Link>
    )
  }),
  columnHelper.accessor('name', {
    header: 'Franchise Name',
    enableGlobalFilter: true
  }),
  columnHelper.accessor((row) => row.capital.name, {
    id: 'capital', // give it a unique ID since it's a function accessor
    header: 'Investment Range',
    enableGlobalFilter: true
  })
];

const FranchiseTable = () => {
  const [data, setData] = useState<FranchiseData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [globalFilter, setGlobalFilter] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        await fetchFranchises(
          currentPage,
          setCurrentPage,
          setTotalPages,
          setData,
          undefined
        );
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const onPageChange = async (page: number) => {
    await fetchFranchises(
      page,
      setCurrentPage,
      setTotalPages,
      setData,
      undefined
    );
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualFiltering: true,
    state: {
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      globalFilter: 'search term'
    }
  });

  return (
    <div
      style={{
        width: '90%'
      }}
    >
      <div>
        <TextInput
          style={{
            marginBottom: 20
          }}
          placeholder={'Franchise name'}
          onChange={async (e) => {
            table.setGlobalFilter(String(e.target.value));
            const filter: FranchiseFilter = {
              franchiseName: e.target.value
            };
            await fetchFranchises(
              currentPage,
              setCurrentPage,
              setTotalPages,
              setData,
              filter
            );
          }}
        />
      </div>
      <If
        condition={isLoading}
        then={<Spinner />}
        else={
          <div>
            <Table striped>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHeadCell key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHeadCell>
                    ))}
                  </tr>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages ?? 1}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default FranchiseTable;
