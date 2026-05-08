import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";
import type * as React from "react";

import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getColumnPinningStyle } from "@/lib/data-table";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

interface DataTableProps<TData> extends React.ComponentProps<"div"> {
    table: TanstackTable<TData>;
    actionBar?: React.ReactNode;
}

export function DataTable<TData>({
    table,
    actionBar,
    children,
    className,
  ...props
}: DataTableProps<TData>) {
    const t = useTranslations('datatable');
    return (
        <div
            className={cn("flex w-full flex-col gap-2.5 overflow-auto", className)}
            {...props}
        >
        {children}
            <SimpleBar forceVisible="x" autoHide={false}>
                <Table>
                    <TableHeader
                        className="flex flex-col overflow-hidden min-w-full"
                    >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="relative flex w-fit h-14"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        style={{
                                        ...getColumnPinningStyle({ column: header.column }),
                                        }}
                                    >
                                        {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                            )}
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
                                    className="relative flex w-fit"
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
                            <TableRow>
                                <TableCell
                                    colSpan={table.getAllColumns().length}
                                    className="h-24 text-center"
                                >
                                    {t('noresults')}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </SimpleBar>
            <div className="flex flex-col gap-2.5">
                <DataTablePagination table={table} />
                {actionBar &&
                table.getFilteredSelectedRowModel().rows.length > 0 &&
                actionBar}
            </div>
        </div>
    );
}
