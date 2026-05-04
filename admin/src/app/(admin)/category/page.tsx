"use client";

import * as React from "react";
import {
    CheckCircle,
    CheckCircle2,
    Text,
    XCircle,
    Plus,
    Pencil,
    Trash2,
    X,
    Download,
    MoreHorizontal
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
import { Badge } from "@/components/ui/badge";
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
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ActionBar,
    ActionBarClose,
    ActionBarGroup,
    ActionBarItem,
    ActionBarSelection,
    ActionBarSeparator
} from "@/components/ui/action-bar";

interface Category{
    id: string;
    name: string;
    status: "active" | "inactive";
}

const formSchema = z.object({
    name: z.string()
})

export default function Page() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

    const t = useTranslations('CategoryPage');
    const [categorys, setCategorys] = React.useState<Category[]>([]);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [name] = useQueryState("name", parseAsString.withDefault(""));
    const [status] = useQueryState("status", parseAsArrayOf(parseAsString).withDefault([]));

    React.useEffect(() => {
        async function fetchPackages() {
            try {
                const res = await fetch("api/category", {
                    headers: {
                        Accept: "application/json",
                    },
                });
                const json = await res.json();
                setCategorys(json.data);
            } catch (err) {
                console.error("Failed to fetch packages:", err);
            }
        }
        fetchPackages();
    }, []);

    async function onSubmit(data: z.infer<typeof formSchema>) {

    }

    const filteredData = React.useMemo(() => {
        return categorys.filter((item) => {
            const matchesName = name === "" || item.name.toLowerCase().includes(name.toLowerCase());

            return matchesName;
        })
    }, [categorys, name]);

    const columns = React.useMemo<ColumnDef<Category>[]>(
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
                size: 64,
                enableSorting: false,
                enableHiding: false
            },
            {
                id: "name",
                accessorKey: "name",
                header: ({ column } : { column: Column<Category, unknown> }) => (
                    <DataTableColumnHeader column={column} label="Name"/>
                ),
                cell: ({ cell }) => <div>{cell.getValue<Category["name"]>()}</div>,
                meta: {
                    label: "Name", 
                    placeholder: "Search names...",
                    variant: "text",
                    icon: Text,
                },
                enableColumnFilter: true,
                size: 200
            },
            {
                id: "status",
                accessorKey: "status",
                header: ({ column } : { column: Column<Category, unknown> }) => (
                    <DataTableColumnHeader column={column} label="Status"/>
                ),
                cell: ({ cell }) => {
                    const status = cell.getValue<Category["status"]>();
                    const statusClass = status === "active"
                        ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                        : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";

                    return (
                        <Badge variant="outline" className={`capitalize gap-1 ${statusClass}`}>
                            {status}
                        </Badge>
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
                size: 200
            },
            {
                id: "actions",
                cell: ({ row }) => {
                    const item = row.original;
                    return (
                        <div className="flex items-center gap-1">
                            <Button size="sm"><Pencil className="h-5 w-5"/>Edit</Button>
                            <Button size="sm" variant="destructive"><Trash2 className="h-5 w-5"/>Delete</Button>
                        </div>
                    )
                },
                size: 167
            }
        ],[]
    )

    const { table } = useDataTable({
        data: filteredData,
        columns,
        pageCount: Math.ceil(filteredData.length / 10),
        initialState: {
            sorting: [{ id: "name", desc: true }],
            columnPinning: { right: ["actions"] },
        },
        getRowId: (row) => row.id,
    });

    function TableActionBar({ table }: { table: Table<Category> }) {
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
                    <ActionBarItem variant="destructive">
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
                            <h2 className="text-2xl font-bold tracking-tight">{t('header.title')}</h2>
                            <p className="mt-1 text-sm text-muted-foreground">{t('header.subtitle')}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button onClick={() => {
                                form.reset({
                                    name: ""
                                })
                                setOpenAddDialog(true)
                            }}><Plus className="h-5 w-5"/>{t('header.addButton')}</Button>
                        </div>
                    </div>
                </div>
                <div className="relative w-full overflow-x-auto">
                    <DataTable
                        table={table}
                        actionBar={<TableActionBar table={table} 
                    />}>
                        <DataTableToolbar table={table}/>
                    </DataTable>
                </div>
            </div>

            <Dialog
                open={openAddDialog}
                onOpenChange={(open) => {
                    setOpenAddDialog(open);
                    if(!open) {
                        form.reset();
                    }
                }}
            >
                <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{t('dialog.title')}</DialogTitle>
                        </DialogHeader>
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-category-name">
                                            {t('dialog.form.name')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-category-name"
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
                        <DialogFooter>
                            <DialogClose render={<Button variant="outline">{t('dialog.button.cancel')}</Button>} />
                            <Button type="submit" form="form-package">{t('dialog.button.save')}</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}