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

export interface User {
    id: number;
    name: string;
    email?: string;
    role: string;
    username: string;
    phone?: string;
    password: string;
    avatar?: string;
    status: "active" | "inactive";
}

export const getColumns = (
    t: (key: string) => string,
    onEdit: (item: User) => void,
    onDelete: (item: User) => void
): ColumnDef<User>[] => [   
    {
        id: "name",
        accessorKey: "name",
        header: ({ column } : { column: Column<User, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.name")}/>
        ),
        cell: ({ cell }) => <div className="w-full py-4 capitalize">{cell.getValue<User["name"]>()}</div>,
    },
    {
        id: "email",
        accessorKey: "email",
        header: ({ column } : { column: Column<User, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.email")}/>
        ),
        cell: ({ cell }) => <div className="w-full py-4 capitalize">{cell.getValue<User["email"]>()}</div>,
    },
    {
        id: "role",
        accessorKey: "role",
        header: ({ column } : { column: Column<User, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.role")}/>
        ),
        cell: ({ cell }) => <div className="w-full py-4 capitalize">{cell.getValue<User["role"]>()}</div>,
    },
    {
        id: "status",
        accessorKey: "status",
        header: ({ column } : { column: Column<User, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.status")}/>
        ),
        cell: ({ cell }) => {
            const status = cell.getValue<User["status"]>();
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
        id: "create_at",
        accessorKey: "create_at",
        header: ({ column } : { column: Column<User, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.create_at")}/>
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
        header: ({ column } : { column: Column<User, unknown> }) => (
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