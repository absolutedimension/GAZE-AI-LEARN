
import React, { useMemo, useState } from 'react'
import { Table } from 'components/ui'
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { dataWithSubRows } from './data'
import { HiOutlinePlusCircle, HiOutlineMinusCircle,HiOutlineArrowNarrowRight,HiOutlineArrowNarrowDown } from 'react-icons/hi'

const { Tr, Th, Td, THead, TBody } = Table

function FormattingMaster() {
    const columns = useMemo(
        () => [
            {
                id: 'expander',
                header: ({ table }) => {
                    return (
                        <button
                            className="text-xl"
                            {...{
                                onClick:
                                    table.getToggleAllRowsExpandedHandler(),
                            }}
                        >
                            {table.getIsAllRowsExpanded() ? (
                                <HiOutlineArrowNarrowDown  style={{ color: 'purple' }} />
                            ) : (
                                <HiOutlineArrowNarrowRight style={{ color: 'purple' }}  />
                            )}
                        </button>
                    )
                },
                cell: ({ row, getValue }) => {
                    return (
                        <>
                            {row.getCanExpand() ? (
                                <button
                                    className="text-xl"
                                    {...{
                                        onClick: row.getToggleExpandedHandler(),
                                    }}
                                >
                                    {row.getIsExpanded() ? (
                                        <HiOutlineArrowNarrowDown style={{ color: 'purple' }}  />
                                    ) : (
                                        <HiOutlineArrowNarrowRight style={{ color: 'purple' }}  />
                                    )}
                                </button>
                            ) : null}
                            {getValue()}
                        </>
                    )
                },
            },
            {
                header: 'Modules',
                accessorKey: 'firstName',
            },
            // {
            //     header: 'Last Name',
            //     accessorKey: 'lastName',
            // },
            // {
            // //    header: 'Age',
            //     accessorKey: 'age',
            // },
            // {
            //     header: 'Visits',
            //     accessorKey: 'visits',
            // },
            {
            //    header: 'Status',
                accessorKey: 'status',
            },
            // {
            //     header: 'Profile Progress',
            //     accessorKey: 'progress',
            // },
        ],
        []
    )

    const [data] = useState(() => dataWithSubRows)
    const [expanded, setExpanded] = useState({})

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
    })

    return (
        <>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
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
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
        </>
    )
}

export default FormattingMaster

