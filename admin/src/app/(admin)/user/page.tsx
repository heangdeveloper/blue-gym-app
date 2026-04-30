"use client";

import * as React from "react";
import type { Column, ColumnDef, Table } from "@tanstack/react-table";
import {
    CheckCircle,
    CheckCircle2,
    Text,
    XCircle,
    Plus,
    Pencil,
    Trash2,
    X,
    Download
} from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { useRouter } from "next/navigation";

import { ActionBar, ActionBarClose, ActionBarGroup, ActionBarItem, ActionBarSelection, ActionBarSeparator } from "@/components/ui/action-bar";
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    status: "active" | "inactive";
}

const data: User[] = [
    {
        id: "1",
        name: "Aigars Silkalns",
        email: "aigars@company.com",
        phone: "+855 11 757 061",
        role: "admin",
        status: "active",
    },
    {
        id: "2",
        name: "Emma Wilson",
        email: "emma@company.com",
        phone: "+855 15 464 772",
        role: "admin",
        status: "inactive",
    },
    {
        id: "3",
        name: "James Chen",
        email: "james@company.com",
        phone: "+855 23 992 481",
        role: "admin",
        status: "active",
    },
    {
        id: "4",
        name: "Sofia Garcia",
        email: "sofia@company.com",
        phone: "+855 98 695 413",
        role: "admin",
        status: "active",
    },
    {
        id: "5",
        name: "Alex Thompson",
        email: "alex@company.com",
        phone: "+855 98 695 413",
        role: "admin",
        status: "inactive",
    },
    {
        id: "6",
        name: "Maria Santos",
        email: "maria@company.com",
        phone: "+855 98 695 413",
        role: "admin",
        status: "inactive",
    },
    {
        id: "7",
        name: "David Kim",
        email: "david@company.com",
        phone: "+855 98 695 413",
        role: "admin",
        status: "inactive",
    },
    {
        id: "8",
        name: "Lisa Park",
        email: "lisa@company.com",
        phone: "+855 98 695 413",
        role: "admin",
        status: "inactive",
    },
    {
        id: "9",
        name: "Ryan Mitchell",
        email: "ryan@company.com",
        phone: "+855 98 695 413",
        role: "admin",
        status: "inactive",
    },
    {
        id: "10",
        name: "Nina Patel",
        email: "nina@company.com",
        phone: "+855 98 695 413",
        role: "admin",
        status: "inactive",
    },
    {
        id: "11",
        name: "Tom Bradley",
        email: "tom@company.com",
        phone: "+855 98 695 413",
        role: "admin",
        status: "inactive",
    },
    {
        id: "12",
        name: "Anna Kowalski",
        email: "anna@company.com",
        phone: "+855 98 695 413",
        role: "admin",
        status: "inactive",
    },
];

export default function Page() {
    const router = useRouter();

    const [users, setUsers] =React.useState<User[]>(data);
    const [openDelete, setOpenDelete] = React.useState(false);

    const [name] = useQueryState("name", parseAsString.withDefault(""));
    const [status] = useQueryState("status", parseAsArrayOf(parseAsString).withDefault([]));

    const filteredData = React.useMemo(() => {
        return users.filter((user) => {
            const matchesName = name === "" || user.name.toLowerCase().includes(name.toLowerCase());
            const matchesStatus = status.length === 0 || status.includes(user.status);

            return matchesName && matchesStatus;
        })
    }, [users, name, status]);

    const columns = React.useMemo<ColumnDef<User>[]>(
        () => [
            {
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => 
                            table.toggleAllPageRowsSelected(!!value)
                        }
                        aria-label="Select all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                size: 32,
                enableSorting: false,
                enableHiding: false
            },
            {
                id: "name",
                accessorKey: "name",
                header: ({ column } : { column: Column<User, unknown> }) => (
                    <DataTableColumnHeader column={column} label="Name"/>
                ),
                cell: ({ cell, row }) => {
                    return(
                        <div className="flex items-center gap-2.5">
                            <div className="flex justify-center items-center shrink-0 w-8 h-8 rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                {cell.getValue<User["name"]>()?.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-medium">{cell.getValue<User["name"]>()}</p>
                                <span className="text-xs text-muted-foreground">{row.original.email}</span>
                            </div>
                        </div>
                    )
                },
                meta: {
                    label: "Name", 
                    placeholder: "Search names...",
                    variant: "text",
                    icon: Text,
                },
                enableColumnFilter: true,
            },
            {
                id: "phone",
                accessorKey: "phone",
                header: ({ column } : { column: Column<User, unknown> }) => (
                    <DataTableColumnHeader column={column} label="Phone"/>
                ),
                cell: ({ cell }) => <div>{cell.getValue<User["phone"]>()}</div>,
                meta: {
                    label: "Phone", 
                },
            },
            {
                id: "role",
                accessorKey: "role",
                header: ({ column } : { column: Column<User, unknown> }) => (
                    <DataTableColumnHeader column={column} label="Role"/>
                ),
                cell: ({ cell }) => <div className="capitalize">{cell.getValue<User["role"]>()}</div>,
                meta: {
                    label: "Role", 
                },
            },
            {
                id: "status",
                accessorKey: "status",
                header: ({ column } : { column: Column<User, unknown> }) => (
                    <DataTableColumnHeader column={column} label="Status"/>
                ),
                cell: ({ cell }) => {
                    const status = cell.getValue<User["status"]>();
                    const Icon = status === "active" ? CheckCircle2 : XCircle;
                    const statusClass = status === "active"
                        ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                        : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";

                    return (
                        <Badge variant="outline" className={`capitalize gap-1 ${statusClass}`}>
                            <Icon />
                            {status}
                        </Badge>
                    );
                },
                meta: {
                    label: "Status",
                    variant: "multiSelect",
                    options: [
                        { label: "Active", value: "active", icon: CheckCircle },
                        { label: "Inactive", value: "inactive", icon: XCircle },
                    ],
                },
                enableColumnFilter: true,
            },
            {
                id: "actions",
                cell: function Cell() {
                    return (
                        <div className="flex items-center gap-1">
                            <Button size="icon" variant="ghost">
                                <Pencil />
                            </Button>
                            <Button size="icon" variant="destructive">
                                <Trash2 />
                            </Button>
                        </div>
                    )
                }
            }
        ],
        [],
    )

    const { table } = useDataTable({
        data: filteredData,
        columns,
        pageCount: Math.ceil(filteredData.length / 10),
        initialState: {
            sorting: [{ id: "name", desc: true }],
            columnPinning: { right: ["actions"] },
            pagination: { 
                pageIndex: 0,
                pageSize: 10
            },
        },
        getRowId: (row) => row.id,
    });

    const onDelete = React.useCallback(() => {
        const rows = table.getFilteredSelectedRowModel().rows;
        const ids = rows.map((r) => r.original.id);

        setUsers((prev) => prev.filter((u) => !ids.includes(u.id)));
        setOpenDelete(false);
    }, [table])

    function TableActionBar({ table }: { table: Table<User> }) {
            const rows = table.getFilteredSelectedRowModel().rows;
            const onOpenChange = React.useCallback((open: boolean) => {
                if (!open) {
                    table.toggleAllRowsSelected(false);
                }
            },[table],
        );

        return (
            <ActionBar open={rows.length > 0} onOpenChange={onOpenChange}>
                <ActionBarSelection>
                    {rows.length} selected
                    <ActionBarSeparator/>
                    <ActionBarClose>
                        <X />
                    </ActionBarClose>
                </ActionBarSelection>
                <ActionBarGroup>
                    <ActionBarItem variant="outline">
                        <Download />
                        Export
                    </ActionBarItem>
                    <ActionBarItem variant="destructive" onSelect={onDelete}>
                        <Trash2 />
                        Delete
                    </ActionBarItem>
                </ActionBarGroup>
            </ActionBar>
        )
    }

    return (
        <>
            <div>
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold tracking-tight">Users</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Manage team members, roles, and permissions.</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button onClick={() => router.push("/users/create")}><Plus className="h-5 w-5"/>Add User</Button>
                        </div>
                    </div>
                </div>
                <div className="relative w-full overflow-x-auto">
                    <DataTable
                        table={table}
                        actionBar={<TableActionBar table={table} />}
                    >
                        <DataTableToolbar table={table} />
                    </DataTable>
                </div>
            </div>
        </>
    );
}
