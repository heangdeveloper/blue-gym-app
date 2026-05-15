"use client";

import {
    Text,
    Pencil,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type { Column, ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

export interface Permission {
    id: number;
    name: string;
    created_at?: string;
}

export interface Role {
    id: number;
    name: string;
    created_at?: string;
}

export const getColumns = (
    t: (key: string) => string,
    onEdit: (item: Role) => void,
    onDelete: (item: Role) => void
): ColumnDef<Role>[] => [   
    {
        id: "name",
        accessorKey: "name",
        header: ({ column } : { column: Column<Role, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.name")}/>
        ),
        cell: ({ cell }) => <div className="w-full py-4 capitalize">{cell.getValue<Role["name"]>()}</div>,
        meta: {
            label: "Name", 
            placeholder: "Search names...",
            variant: "text",
            icon: Text,
        },
        enableColumnFilter: true
    },
    {
        id: "created_at",
        accessorKey: "created_at",
        header: ({ column } : { column: Column<Role, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.created_at")}/>
        ),
        cell: ({ cell }) => {
            const value = cell.getValue<string>();
            const formatted = new Date(value).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });
            return (
                <div className="w-full py-4">{formatted.replace("am", "am").replace("pm", "pm")}</div>
            )
        },
    },
    {
        id: "actions",
        header: ({ column } : { column: Column<Role, unknown> }) => (
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