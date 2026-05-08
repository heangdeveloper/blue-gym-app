"use client";

import * as React from "react";
import {
    Text,
    Plus,
    Pencil,
    Trash2,
} from "lucide-react";
import type { Column, ColumnDef, Table } from "@tanstack/react-table";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form";
import * as z from "zod"

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError
} from "@/components/ui/field"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup
} from "@/components/ui/select"
import {
    Status,
    StatusIndicator,
    StatusLabel,
} from "@/components/ui/status";
import { useConfirm } from "@/app/provider/ConfirmDialogProvider";

interface Permission {
    id: number;
    name: string;
}

const formSchema = z.object({
    name: z.string()
});

export default function Page() {
    const t = useTranslations('PermissionPage');
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })
    const [permissions, setPermissions] = React.useState<Permission[]>([]);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const [name] = useQueryState("name", parseAsString.withDefault(""));
    const confrim = useConfirm();

    React.useEffect(() => {
        async function fetchPermissions() {
            try {
                const res = await fetch(`api/auth/permissions`, {
                    headers: {
                        Accept: "application/json",
                    },
                });
                const json = await res.json();
                setPermissions(json.data.map((item: any) => item.data ?? item));
            } catch (err) {
                console.error("Failed to fetch:", err);
            }
        }
        fetchPermissions();
    }, []);

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            if (selectedId !== null) {
                const res = await fetch(`api/auth/permissions/${selectedId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data)
                })
                const updatedItem = await res.json();

                setPermissions((prev) =>
                    prev.map((item) =>
                        item.id === Number(selectedId)
                            ? updatedItem.data.data ?? updatedItem.data
                            : item
                    )
                );
            } else {
                const res = await fetch("api/auth/permissions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data)
                })

                const newItem = await res.json();
                console.log(newItem)

                setPermissions((prev) => [...prev, newItem.data]);
            }
            setOpenAddDialog(false);
            setSelectedId(null);
            form.reset();
        } catch(err) {
            console.error("Failed to save category:", err);
        }
    }
    
    const handleDelete = async (id: number) => {
        const ok = await confrim()
        if (!ok) return;

        try {
            await fetch(`api/auth/permissions/${id}`, {
                method: "DELETE",
            });

            setPermissions((prev) =>
                prev.filter((item) => item.id !== id)
            );
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const filteredData = React.useMemo(() => {
        return permissions.filter((item) => {
            const matchesName = name === "" || item.name.toLowerCase().includes(name.toLowerCase());
            return matchesName;
        })
    }, [permissions, name]);

    const columns = React.useMemo<ColumnDef<Permission>[]>(() => [
        {
            id: "name",
            accessorKey: "name",
            header: ({ column } : { column: Column<Permission, unknown> }) => (
                <DataTableColumnHeader column={column} label={t("table.header.name")}/>
            ),
            cell: ({ cell }) => <div>{cell.getValue<Permission["name"]>()}</div>,
            meta: {
                label: "Name", 
                placeholder: "Search Permission...",
                variant: "text",
                icon: Text,
            },
            enableColumnFilter: true,
        },
        {
            id: "assigned_to",
            accessorKey: "assigned_to",
            header: ({ column } : { column: Column<Permission, unknown> }) => (
                <DataTableColumnHeader column={column} label={t("table.header.assigned_to")}/>
            ),
            cell: ({ cell }) => <div></div>,
            enableColumnFilter: true,
        },
        {
            id: "created_date",
            accessorKey: "created_date",
            header: ({ column } : { column: Column<Permission, unknown> }) => (
                <DataTableColumnHeader column={column} label={t("table.header.created_date")}/>
            ),
            cell: ({ cell }) => <div></div>,
            enableColumnFilter: true,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className="flex items-center gap-1">
                        <Button size="sm"><Pencil className="h-5 w-5"/>{t('table.body.actions.edit')}</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-5 w-5"/>{t('table.body.actions.delete')}</Button>
                    </div>
                )
            }
        }
    ],[]);

    const { table } = useDataTable({
        data: filteredData,
        columns,
        pageCount: 1,
        getRowId: (row) => row.id.toString(),
    });

    return (
        <>
            <div>
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold tracking-tight">{t('header.title')}</h2>
                            <p className="mt-1 text-sm text-muted-foreground">{t('header.subtitle')}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button><Plus className="h-5 w-5"/>{t('header.addButton')}</Button>
                        </div>
                    </div>
                </div>
                <DataTable table={table}>
                    <DataTableToolbar table={table} />
                </DataTable>
            </div>
        </>
    )
}