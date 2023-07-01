import React, { useMemo, useState } from 'react';
import { Table } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table';
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi';

const { Tr, Td, TBody } = Table;



function Expanding() {
   let  [objectStory,setObjectStory] = useState([]);

     objectStory = useSelector((state) => state.tutor.taggedQuestion);
//    const objectStory = [
//     {
//         id: 1,
//         serialNumber: '001',
//         textPart: 'Lorem ipsum dolor sit amet.',
//     },
//     {
//         id: 2,
//         serialNumber: '',
//         textPart: 'Subrow 1',
//     },
//     {
//         id: 3,
//         serialNumber: '',
//         textPart: 'Subrow 2',
//     },
//     // Add more objects as needed
// ];

    const columns = useMemo(
        () => [
            {
                accessorKey: 'serialNumber',
                header: 'Serial Number',
            },
            {
                accessorKey: 'textPart',
                header: 'Text Part',
            },
        ],
        []
    );

    const [data] = useState(() => {
        // Filter the objectStory array to create subrows for elements with an empty serialNumber
        const subRows = objectStory.filter((item) => item.serialNumber === "");

        // Set the expanded state for the subrows
        const expanded = subRows.reduce((acc, item) => {
            acc[item.id] = true;
            return acc;
        }, {});

        // Return the objectStory array as the main rows with the subrows
        return [...objectStory, ...subRows];
    });

    const [expanded, setExpanded] = useState({});

    const table = useReactTable({
        data,
        columns,
        state: {
            expanded,
        },
        onExpandedChange: setExpanded,
        getSubRows: (row) => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

    return (
        <>
            <Table>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </TBody>
            </Table>
        </>
    );
}

export default Expanding;
