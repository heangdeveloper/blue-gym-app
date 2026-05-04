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
            <div className="overflow-hidden rounded-2xl">
                <Table>
                    <TableHeader
                        className="flex flex-col overflow-hidden min-w-full"
                    >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="flex w-full border-b-0"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        style={{
                                        ...getColumnPinningStyle({ column: header.column }),
                                        }}
                                        className="relative flex items-center h-12 px-2.5 [&:has([role=checkbox])]:justify-center [&:has([role=checkbox])]:pr-2.5"
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
                                className="flex w-auto"
                            >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    key={cell.id}
                                    style={{
                                        ...getColumnPinningStyle({ column: cell.column }),
                                    }}
                                    className="relative flex items-center h-14 text-sm py-0 px-2.5 [&:has([role=checkbox])]:justify-center [&:has([role=checkbox])]:pr-2.5"
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
            </div>
            <div className="flex flex-col gap-2.5">
                <DataTablePagination table={table} />
                {actionBar &&
                table.getFilteredSelectedRowModel().rows.length > 0 &&
                actionBar}
            </div>
        </div>
    );
}
