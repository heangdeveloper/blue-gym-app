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
import { Textarea } from "@/components/ui/textarea"
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
    Status,
    StatusIndicator,
    StatusLabel,
} from "@/components/ui/status";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup
} from "@/components/ui/select"
import { useConfirm } from "@/app/provider/ConfirmDialogProvider";

interface Package {
    id: number;
    name: string;
    duration: string;
    price: string;
    description: string;
    status: "active" | "inactive";
}
const createFormSchema = (t: any) => 
    z.object({
        name: z
            .string()
            .trim()
            .min(1, { message: t('dialog.form.validation.name.min') }),
        duration: z
            .string({
                error: t('dialog.form.validation.duration.min')
            }),
        price: z
            .string({
                error: t('dialog.form.validation.price.min') 
            }),
        description: z
            .string()
            .trim()
            .max(200, { message: t('dialog.form.validation.description.max') })
            .optional()
            .or(z.literal("")),
        status: z.enum(["active", "inactive"]),
    });

export default function Page() {
    const t = useTranslations('PackagePage');
    const formSchema = React.useMemo(() => createFormSchema(t), [t]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            duration: "",
            price: "",
            description: "",
            status: "active",
        },
    })
    const [packages, setPackages] = React.useState<Package[]>([]);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const [name] = useQueryState("name", parseAsString.withDefault(""));
    const [status] = useQueryState("status", parseAsArrayOf(parseAsString).withDefault([]));
    const confrim = useConfirm();

    React.useEffect(() => {
        async function fetchPackages() {
            try {
                const res = await fetch(`api/package`, {
                    headers: {
                        Accept: "application/json",
                    },
                });
                const json = await res.json();
                setPackages(json.data.map((item: any) => item.data ?? item));
            } catch (err) {
                console.error("Failed to fetch package:", err);
            }
        }
        fetchPackages();
    }, []);

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            if (selectedId !== null) {
                const res = await fetch(`api/package/${selectedId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data)
                })
                const updatedItem = await res.json();

                setPackages((prev) =>
                    prev.map((item) =>
                        item.id === Number(selectedId)
                            ? updatedItem.data.data ?? updatedItem.data
                            : item
                    )
                );
            } else {
                const res = await fetch("api/package", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data)
                })

                const newItem = await res.json();
                console.log(newItem)

                setPackages((prev) => [...prev, newItem.data]);
            }
            setOpenAddDialog(false);
            setSelectedId(null);
            form.reset();
        } catch(err) {
            console.error("Failed to save package:", err);
        }
    }

    const handleDelete = async (id: number) => {
        const ok = await confrim()
        if (!ok) return;

        try {
            await fetch(`/api/package/${id}`, {
                method: "DELETE",
            });

            setPackages((prev) =>
                prev.filter((item) => item.id !== id)
            );
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const filteredData = React.useMemo(() => {
        return packages.filter((item) => {
            const matchesName = name === "" || item.name.toLowerCase().includes(name.toLowerCase());
            const matchesStatus = status.length === 0 || status.includes(item.status);

            return matchesName && matchesStatus;
        })
    }, [packages, name, status]);

    const columns = React.useMemo<ColumnDef<Package>[]>(
        () => [
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
                            <Button size="sm" onClick={() => {
                                setSelectedId(item.id);
                                form.reset({
                                    name: item.name,
                                    duration: item.duration,
                                    price: item.price,
                                    description: item.description,
                                    status: item.status,
                                });
                                setOpenAddDialog(true);
                            }}><Pencil className="h-5 w-5"/>{t('table.body.actions.edit')}</Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-5 w-5"/>{t('table.body.actions.delete')}</Button>
                        </div>
                    )
                },
            }
        ],[form],
    )

    const { table } = useDataTable({
        data: filteredData,
        columns,
        pageCount: Math.ceil(filteredData.length / 10),
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
                                    name: "",
                                    duration: "",
                                    price: "",
                                    description: "",
                                    status: "active",
                                })
                                setOpenAddDialog(true)
                            }}><Plus className="h-5 w-5"/>{t('header.addButton')}</Button>
                        </div>
                    </div>
                </div>
                <DataTable table={table}>
                    <DataTableToolbar table={table} />
                </DataTable>
            </div>

            <Dialog
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
                            <DialogTitle>{selectedId ? t('dialog.editTitle') : t('dialog.addTitle')}</DialogTitle>
                        </DialogHeader>
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-name">
                                            {t('dialog.form.name')}
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
                            <Controller
                                name="duration"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-duration">
                                            {t('dialog.form.duration')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-duration"
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
                                name="price"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-price">
                                            {t('dialog.form.price')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-price"
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
                                name="description"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-description">
                                            {t('dialog.form.description')}
                                        </FieldLabel>
                                        <Textarea
                                            {...field}
                                            id="form-description"
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
                            <Button type="submit" form="form-package">{selectedId ? t('dialog.button.update') : t('dialog.button.save')}</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}