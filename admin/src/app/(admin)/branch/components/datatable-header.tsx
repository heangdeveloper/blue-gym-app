"use client";

import {
    Pencil,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Status,
    StatusIndicator,
    StatusLabel,
} from "@/components/ui/status";

import type { Column, ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

export interface Branche {
    id: number;
    name: string;
    location: string;
    phone: string;
    status: "active" | "inactive";
}

export const getColumns = (
    t: (key: string) => string,
    onEdit: (item: Branche) => void,
    onDelete: (item: Branche) => void
): ColumnDef<Branche>[] => [
    {
        id: "name",
        accessorKey: "name",
        header: ({ column } : { column: Column<Branche, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.name")}/>
        ),
        cell: ({ cell }) => <div className="w-full py-4 capitalize">{cell.getValue<Branche["name"]>()}</div>,
        size: 200
    },
    {
        id: "location",
        accessorKey: "location",
        header: ({ column } : { column: Column<Branche, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.location")}/>
        ),
        cell: ({ cell }) => <div className="w-full py-4 capitalize">{cell.getValue<Branche["location"]>()}</div>,
    },
    {
        id: "phone",
        accessorKey: "phone",
        header: ({ column } : { column: Column<Branche, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.phone")}/>
        ),
        cell: ({ cell }) => <div className="w-full py-4 capitalize">{cell.getValue<Branche["phone"]>()}</div>,
    },
    {
        id: "status",
        accessorKey: "status",
        header: ({ column } : { column: Column<Branche, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.status")}/>
        ),
        cell: ({ cell }) => {
            const status = cell.getValue<Branche["status"]>();
            const statusClass = status === "active" ? "success" : "error";
            return (
                <Status variant={statusClass}>
                    <StatusIndicator />
                    <StatusLabel>
                        {status === "active"
                            ? t("table.body.status.active")
                            : t("table.body.status.inactive")}
                    </StatusLabel>
                </Status>
            );
        },
    },
    {
        id: "actions",
        header: ({ column } : { column: Column<Branche, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.action")}/>
        ),
        cell: ({ row }) => {
            const item = row.original;
            return (
                <div className="flex items-center gap-1">
                    <Button size="sm" onClick={() => onEdit(item)}><Pencil className="h-5 w-5"/>{t('table.body.actions.edit')}</Button>
                    <Button size="sm" variant="destructive" onClick={() => onDelete(item)}><Trash2 className="h-5 w-5"/>{t('table.body.actions.delete')}</Button>
                </div>
            )
        },
    }
]