import React from "react";

import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getPaginationRowModel,
    PaginationState,
} from "@tanstack/react-table";

import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { getColumnPinningStyle } from "@/lib/data-table";
import { useTranslations } from 'next-intl';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const t = useTranslations('datatable');
    const [rowSelection, setRowSelection] = React.useState({});
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            rowSelection,
            sorting,
        },
        initialState: {
        pagination: {
            pageSize: 10,
            pageIndex: 0,
        },
        },
    });
    return (
        <Card
            className="pt-0 gap-0 rounded-md ring-0"
        >
            <CardHeader className="p-4">
                {/* {children} */}
            </CardHeader>
            <CardContent
                className="px-0"
            >
                <SimpleBar forceVisible="x" autoHide={false}>
                    <Table>
                        <TableHeader
                            className="flex flex-col overflow-hidden min-w-full"
                        >
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    className="relative flex h-14"
                                >
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            style={{
                                            ...getColumnPinningStyle({ column: header.column }),
                                            }}
                                        >
                                            <span
                                                {...{
                                                    className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                                                    onClick: header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                            </span>
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="relative flex"
                                    >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            style={{
                                                ...getColumnPinningStyle({ column: cell.column }),
                                            }}
                                            className="relative flex items-center h-auto text-sm py-0"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className="relative flex">
                                    <TableCell
                                        colSpan={table.getAllColumns().length}
                                        className="flex justify-center items-center h-24 text-center"
                                    >
                                        {t('emptyTable')}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </SimpleBar>
            </CardContent>
            <CardFooter
                className="p-4 border-t-0"
            >
                <DataTablePagination table={table} />
                {/* {actionBar &&
                table.getFilteredSelectedRowModel().rows.length > 0 &&
                actionBar} */}
            </CardFooter>
        </Card>
    );
}
