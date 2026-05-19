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

export interface Classe {
    id: number;
    branch: {
        id: number;
        name: string;
    };
    trainer: {
        id: number;
        name: string;
    };
    name: string;
    schedule: string;
    start_date: string;
    start_time: string;
    end_time: string;
    capacity: string;
    status: "active" | "inactive";
}

export const getColumns = (
    t: (key: string) => string,
    onEdit: (item: Classe) => void,
    onDelete: (item: Classe) => void
): ColumnDef<Classe>[] => [
    {
        id: "name",
        accessorKey: "name",
        header: ({ column } : { column: Column<Classe, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.name")}/>
        ),
        cell: ({ cell }) => <div className="w-full py-4 capitalize">{cell.getValue<Classe["name"]>()}</div>,
        size: 200
    },
    {
        id: "branch",
        accessorKey: "branch",
        header: ({ column } : { column: Column<Classe, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.name")}/>
        ),
        cell: ({ cell }) => <div className="w-full py-4 capitalize">{cell.getValue<Classe["name"]>()}</div>,
        size: 200
    },
    {
        id: "trainer",
        accessorKey: "trainer",
        header: ({ column } : { column: Column<Classe, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.name")}/>
        ),
        cell: ({ cell }) => <div className="w-full py-4 capitalize">{cell.getValue<Classe["name"]>()}</div>,
        size: 200
    },
    {
        id: "date",
        accessorKey: "date",
        header: ({ column } : { column: Column<Classe, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.name")}/>
        ),
        cell: ({ cell }) => <div className="w-full py-4 capitalize">{cell.getValue<Classe["name"]>()}</div>,
        size: 200
    },
    {
        id: "time",
        accessorKey: "time",
        header: ({ column } : { column: Column<Classe, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.name")}/>
        ),
        cell: ({ cell }) => <div className="w-full py-4 capitalize">{cell.getValue<Classe["name"]>()}</div>,
        size: 200
    },
    {
        id: "capacity",
        accessorKey: "capacity",
        header: ({ column } : { column: Column<Classe, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.name")}/>
        ),
        cell: ({ cell }) => <div className="w-full py-4 capitalize">{cell.getValue<Classe["name"]>()}</div>,
        size: 200
    },
    {
        id: "status",
        accessorKey: "status",
        header: ({ column } : { column: Column<Classe, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.status")}/>
        ),
        cell: ({ cell }) => {
            const status = cell.getValue<Classe["status"]>();
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
        header: ({ column } : { column: Column<Classe, unknown> }) => (
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