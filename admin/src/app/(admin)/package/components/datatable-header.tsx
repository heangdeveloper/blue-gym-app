"use client";

import {
    Text,
    Pencil,
    Trash2,
} from "lucide-react";
import type { Column, ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { Button } from "@/components/ui/button";
import {
    Status,
    StatusIndicator,
    StatusLabel,
} from "@/components/ui/status";

export interface Package {
    id: number;
    name: string;
    duration: string;
    price: string;
    description: string;
    status: "active" | "inactive";
}

export const getColumns = (
    t: (key: string) => string,
    onEdit: (item: Package) => void,
    onDelete: (item: Package) => void
): ColumnDef<Package>[] => [
    {
        id: "name",
        accessorKey: "name",
        header: ({ column } : { column: Column<Package, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.name")}/>
        ),
        cell: ({ cell }) => <div className="w-full py-4">{cell.getValue<Package["name"]>()}</div>,
        meta: {
            label: "Name", 
            placeholder: "Search names...",
            variant: "text",
            icon: Text,
        },
        enableColumnFilter: true
    },
    {
        id: "price",
        accessorKey: "price",
        header: ({ column } : { column: Column<Package, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.price")}/>
        ),
        cell: ({ cell }) => <div className="w-full py-4">{cell.getValue<Package["price"]>()}</div>,
        meta: {
            label: "Price", 
        },
    },
    {
        id: "status",
        accessorKey: "status",
        header: ({ column } : { column: Column<Package, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.status")}/>
        ),
        cell: ({ cell }) => {
            const status = cell.getValue<Package["status"]>();
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
        meta: {
            label: "Status",
            variant: "multiSelect",
            options: [
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
            ],
        },
        enableColumnFilter: true,
    },
    {
        id: "actions",
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