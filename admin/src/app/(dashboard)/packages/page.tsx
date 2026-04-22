"use client";

import * as React from "react";
import { Suspense } from "react";
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
import { Spinner } from "@/components/ui/spinner"
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

interface Package {
    id: number;
    name: string;
    duration: string;
    price: string;
    description: string;
    status: "active" | "inactive";
}

const formSchema = z.object({
    name: z
        .string()
        .min(5, "Package name must be at least 5 characters.")
        .max(32, "Package name must be at most 32 characters."),
    duration: z
        .string()
        .min(0),
    price: z
        .string()
        .min(0),
    description: z
        .string()
        .max(200),
    status: z
        .enum(["active", "inactive"])
});

export default function Page() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            duration: "0",
            price: "0",
            description: "",
            status: "active",
        }
    })

    const [packages, setPackages] = React.useState<Package[]>([]);
    const [deletingId, setDeletingId] = React.useState<number | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState<number | null>(null);

    const [name] = useQueryState("name", parseAsString.withDefault(""));
    const [status] = useQueryState("status", parseAsArrayOf(parseAsString).withDefault([]));

    // ✅ FETCH DATA
    React.useEffect(() => {
        async function fetchPackages() {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/packages", {
                    headers: {
                        Accept: "application/json",
                    },
                });
                const json = await res.json();
                setPackages(json.data);
            } catch (err) {
                console.error("Failed to fetch packages:", err);
            }
        }
        fetchPackages();
    }, []);

    // ✅ DELETE DATA
    const confirmDelete = async () => {
        if (!selectedId) return;

        setDeletingId(selectedId);

        try {
            await fetch(`http://127.0.0.1:8000/api/packages/${selectedId}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                },
            });
            setPackages((prev) => prev.filter((item) => item.id !== selectedId));

        } catch (err) {
            console.error("Delete failed:", err);
        } finally {
            setDeletingId(null);
            setOpenDeleteDialog(false);
            setSelectedId(null);
        }
    };

    // ✅ ADD DATA
    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            if (selectedId !== null) {
                // UPDATE
                const res = await fetch(`http://127.0.0.1:8000/api/packages/${selectedId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data)
                })

                const updatedPackage = await res.json();

                setPackages((prev) =>
                    prev.map((pkg) => (pkg.id === selectedId ? updatedPackage.data : pkg))
                );
            } else {
                // ADD
                const res = await fetch(`http://127.0.0.1:8000/api/packages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data)
                })

                const newPackage = await res.json();

                setPackages((prev) => [...prev, newPackage.data]);
            }

            setOpenAddDialog(false);
            setSelectedId(null);
            form.reset(); // reset form and validation
        } catch (err) {
            console.error("Failed to save package:", err);
        } 
    }

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
                header: ({ column } : { column: Column<Package, unknown> }) => (
                    <DataTableColumnHeader column={column} label="Name"/>
                ),
                cell: ({ cell }) => <div>{cell.getValue<Package["name"]>()}</div>,
                meta: {
                    label: "Name", 
                    placeholder: "Search names...",
                    variant: "text",
                    icon: Text,
                },
                enableColumnFilter: true,
            },
            {
                id: "duration",
                accessorKey: "duration",
                header: ({ column } : { column: Column<Package, unknown> }) => (
                    <DataTableColumnHeader column={column} label="Duration"/>
                ),
                cell: ({ cell }) => <div>{cell.getValue<Package["duration"]>()}</div>,
                meta: {
                    label: "Duration", 
                },
            },
            {
                id: "price",
                accessorKey: "price",
                header: ({ column } : { column: Column<Package, unknown> }) => (
                    <DataTableColumnHeader column={column} label="Price"/>
                ),
                cell: ({ cell }) => <div>{cell.getValue<Package["price"]>()}</div>,
                meta: {
                    label: "Price", 
                },
            },
            {
                id: "description",
                accessorKey: "description",
                header: ({ column } : { column: Column<Package, unknown> }) => (
                    <DataTableColumnHeader column={column} label="Description"/>
                ),
                cell: ({ cell }) => {
                    const value = cell.getValue<Package["description"]>();
                    return <div>{value ? value : "-"}</div>;
                },
                meta: {
                    label: "Description", 
                },
            },
            {
                id: "status",
                accessorKey: "status",
                header: ({ column } : { column: Column<Package, unknown> }) => (
                    <DataTableColumnHeader column={column} label="Status"/>
                ),
                cell: ({ cell }) => {
                    const status = cell.getValue<Package["status"]>();
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
                                    duration: item.duration,
                                    price: item.price,
                                    description: item.description,
                                    status: item.status,
                                }); // prefill form with selected item
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
                                setOpenDeleteDialog(true);
                            }}
                        >
                            <Trash2 />
                        </Button>
                    </div>
                )
            }
        }
        ],[],
    )

    const { table } = useDataTable({
        data: filteredData,
        columns,
        pageCount: Math.ceil(filteredData.length / 10),
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
                            <h2 className="text-2xl font-bold tracking-tight">Packages</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Manage pricing packages for gym customers.</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button
                                onClick={() => {
                                    setSelectedId(null); // make sure no package is selected
                                    form.reset({         // reset all fields to default values
                                        name: "",
                                        duration: "0",
                                        price: "0",
                                        description: "",
                                        status: "active",
                                    });
                                    setOpenAddDialog(true);
                                }}
                            ><Plus className="h-5 w-5"/>Add Package</Button>
                        </div>
                    </div>
                </div>
                <div className="relative w-full overflow-x-auto">
                        <DataTable table={table}>
                            <DataTableToolbar table={table} />
                        </DataTable>
                </div>
            </div>
            <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={deletingId !== null}
                        >
                            {deletingId ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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
                            <Controller
                                name="duration"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-duration">
                                            Duration
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
                                            Price
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
                                            Description
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
                            {
                                selectedId ?
                                    <Controller
                                        name="status"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Field>
                                                <FieldLabel>Status</FieldLabel>
                                                <select {...field} className="w-full p-2 border rounded">
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </Field>
                                        )}
                                    />
                                :
                                    ""
                            }
                            
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose render={<Button variant="outline">Cancel</Button>} />
                            <Button type="submit" form="form-package"> {selectedId ? "Update" : "Save changes"}</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}