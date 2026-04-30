"use client";

import * as React from "react";
import type { Column, ColumnDef } from "@tanstack/react-table";
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

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form";
import * as z from "zod"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError
} from "@/components/ui/field"

interface Permission {
    id: number;
    name: string;
}

const formSchema = z.object({
    name: z.string()
});

export default function Page() {
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

    React.useEffect(() => {
        async function fetchPermissions() {
            try {
                const res = await fetch("api/auth/permissions", {
                    headers: {
                        Accept: "application/json",
                    },
                });
                const json = await res.json();
                setPermissions(json.data);
            } catch (err) {
                console.error("Failed to fetch permissions:", err);
            }
        }
        fetchPermissions();
    }, []);

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {

        } catch (err) {
            console.error("Failed to save permission:", err);
        } 
    }

    const filteredData = React.useMemo(() => {
        return permissions.filter((item) => {
            const matchesName = name === "" || item.name.toLowerCase().includes(name.toLowerCase());

            return matchesName;
        })
    }, [permissions, name]);

    const columns = React.useMemo<ColumnDef<Permission>[]>(() => [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
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
            header: ({ column } : { column: Column<Permission, unknown> }) => (
                <DataTableColumnHeader column={column} label="Name"/>
            ),
            cell: ({ cell }) => <div>{cell.getValue<Permission["name"]>()}</div>,
            meta: {
                label: "Name", 
                placeholder: "Search names...",
                variant: "text",
                icon: Text,
            },
            enableColumnFilter: true,
        },
        {
            id: "actions",
            header: ({ column } : { column: Column<Permission, unknown> }) => (
                <DataTableColumnHeader column={column} label="Actions"/>
            ),
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className="flex items-center gap-1">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                                setSelectedId(item.id);
                                form.reset({
                                    name: item.name,
                                });
                                setOpenAddDialog(true);
                            }}
                        >
                            <Pencil />
                        </Button>
                        <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => {
                                setSelectedId(item.id);
                            }}
                        >
                            <Trash2 />
                        </Button>
                    </div>
                )
            }
        }
    ],[]);

    const { table } = useDataTable({
        data: filteredData,
        columns,
        pageCount: 1,
        initialState: {
            sorting: [{ id: "name", desc: true }],
            columnPinning: { right: ["actions"] },
        },
        getRowId: (row) => row.id.toString(),
    });

    return (
        <>
            <div>
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold tracking-tight">Permissions</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Manage user permissions.</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button><Plus className="h-5 w-5"/>Add Permission</Button>
                        </div>
                    </div>
                </div>
                <div className="relative w-full overflow-x-auto">
                    <DataTable
                        table={table}
                    >
                        <DataTableToolbar table={table} />
                    </DataTable>
                </div>
            </div>

            {/* <Dialog
                open={openAddDialog}
                onOpenChange={(open) => {
                    setOpenAddDialog(open);
                    if (!open) {
                        form.reset();
                        setSelectedId(null);
                    }
                }}
            >
                <form id="form-package" onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedId ? "Update Package" : "Add Package"}</DialogTitle>
                        </DialogHeader>
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-name">
                                            Name
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-name"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </DialogContent>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <Button type="submit" form="form-package"> {selectedId ? "Update" : "Save changes"}</Button>
                    </DialogFooter>
                </form>
            </Dialog> */}
        </>
    )
}