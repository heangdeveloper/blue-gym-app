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
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
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

interface Category{
    id: number;
    name: string;
    status: "active" | "inactive";
}

const createFormSchema = (t: any) =>
    z.object({
        name: z
        .string()
        .min(1, { message: t('dialog.form.validation.name') }),
        status: z.enum(["active", "inactive"]).optional(),
    });

export default function Page() {
    const t = useTranslations('CategoryPage');
    const formSchema = React.useMemo(() => createFormSchema(t), [t]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            status: "active",
        }
    })
    const [categorys, setCategorys] = React.useState<Category[]>([]);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const [name] = useQueryState("name", parseAsString.withDefault(""));
    const [status] = useQueryState("status", parseAsArrayOf(parseAsString).withDefault([]));

    const confrim = useConfirm();

    React.useEffect(() => {
        async function fetchCategorys() {
            try {
                const res = await fetch(`api/category`, {
                    headers: {
                        Accept: "application/json",
                    },
                });
                const json = await res.json();
                setCategorys(json.data.map((item: any) => item.data ?? item));
            } catch (err) {
                console.error("Failed to fetch categorys:", err);
            }
        }
        fetchCategorys();
    }, []);

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            if (selectedId !== null) {
                const res = await fetch(`api/category/${selectedId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data)
                })
                const updatedItem = await res.json();

                setCategorys((prev) =>
                    prev.map((item) =>
                        item.id === Number(selectedId)
                            ? updatedItem.data.data ?? updatedItem.data
                            : item
                    )
                );
            } else {
                const res = await fetch("api/category", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data)
                })

                const newItem = await res.json();
                console.log(newItem)

                setCategorys((prev) => [...prev, newItem.data]);
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
            await fetch(`/api/category/${id}`, {
                method: "DELETE",
            });

            setCategorys((prev) =>
                prev.filter((item) => item.id !== id)
            );
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const filteredData = React.useMemo(() => {
        return categorys.filter((item) => {
            const matchesName = name === "" || item.name.toLowerCase().includes(name.toLowerCase());
            const matchesStatus = status.length === 0 || status.includes(item.status);
            return matchesName && matchesStatus;
        })
    }, [categorys, name, status]);

    const columns = React.useMemo<ColumnDef<Category>[]>(
        () => [
            {
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected())
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
                    <DataTableColumnHeader column={column} label={t("table.header.name")}/>
                ),
                cell: ({ cell }) => <div className="w-full py-4">{cell.getValue<Category["name"]>()}</div>,
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
                            <Button size="sm" onClick={() => {
                                setSelectedId(item.id);
                                form.reset({
                                    name: item.name,
                                    status: item.status,
                                });
                                setOpenAddDialog(true);
                            }}><Pencil className="h-5 w-5"/>{t('table.body.actions.edit')}</Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-5 w-5"/>{t('table.body.actions.delete')}</Button>
                        </div>
                    )
                },
                size: 167,
            }
        ],[form]
    )

    const { table } = useDataTable({
        data: filteredData,
        columns,
        pageCount: 10,
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
                            <Button onClick={() => {
                                form.reset({
                                    name: ""
                                })
                                setOpenAddDialog(true)
                            }}><Plus className="h-5 w-5"/>{t('header.addButton')}</Button>
                        </div>
                    </div>
                </div>
                <DataTable table={table}>
                    <DataTableToolbar table={table}/>
                </DataTable>
            </div>

            <Dialog
                open={openAddDialog}
                onOpenChange={(open) => {
                    setOpenAddDialog(open);
                    if(!open) {
                        form.reset();
                        setSelectedId(null);
                    }
                }}
            >
                <form id="form-category" onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
                    <DialogContent className="p-6.5 rounded-md ring-0">
                        <DialogHeader>
                            <DialogTitle>{selectedId ? t('dialog.editTitle') : t('dialog.addTitle')}</DialogTitle>
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
                            <Controller
                                name="status"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-category-status">
                                            {t('dialog.form.status')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Select
                                            value={field.value ?? ""}
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('dialog.form.select.placeholder')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="active">{t('dialog.form.select.item.active')}</SelectItem>
                                                    <SelectItem value="inactive">{t('dialog.form.select.item.inactive')}</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose render={<Button variant="outline">{t('dialog.button.cancel')}</Button>} />
                            <Button type="submit" form="form-category">{selectedId ? t('dialog.button.update') : t('dialog.button.save')}</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}