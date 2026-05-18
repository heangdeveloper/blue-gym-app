"use client";

import {
    Text,
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

export interface Category{
    id: number;
    name: string;
    status: "active" | "inactive";
}

export const getColumns = (
    t: (key: string) => string,
    onEdit: (item: Category) => void,
    onDelete: (item: Category) => void
): ColumnDef<Category>[] => [
    {
        id: "name",
        accessorKey: "name",
        header: ({ column } : { column: Column<Category, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.name")}/>
        ),
        cell: ({ cell }) => <div className="w-full py-4">{cell.getValue<Category["name"]>()}</div>,
        meta: {
            label: "Name", 
            placeholder: "Search names...",
            variant: "text",
            icon: Text,
        },
        enableColumnFilter: true
    },
    {
        id: "status",
        accessorKey: "status",
        header: ({ column } : { column: Column<Category, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.status")}/>
        ),
        cell: ({ cell }) => {
            const status = cell.getValue<Category["status"]>();
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
        header: ({ column } : { column: Column<Category, unknown> }) => (
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