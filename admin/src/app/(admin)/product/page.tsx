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
    DollarSign,
    X,
    Download
} from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/format-currency";

import { ActionBar, ActionBarClose, ActionBarGroup, ActionBarItem, ActionBarSelection, ActionBarSeparator } from "@/components/ui/action-bar";
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Avatar,
    AvatarImage
} from "@/components/ui/avatar"

interface Product {
    id: number;
    name: string;
    description: string;
    cost_price: string;
    sell_price: string;
    stock_qty: string;
    image: string;
    created_at: string;
    category: {
        id: number;
        name: string;
    };
}


export default function Page() {
    const [products, setProducts] = React.useState<Product[]>([]);

    const [name] = useQueryState("name", parseAsString.withDefault(""));

    React.useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch(`api/products`, {
                    headers: {
                        Accept: "application/json",
                    },
                });
                const json = await res.json();
                console.log(json)
                setProducts(json.data.map((item: any) => item.data ?? item));
            } catch (err) {
                console.error("Failed to fetch products:", err);
            }
        }
        fetchProducts();
    }, []);

    const filteredData = React.useMemo(() => {
        return products.filter((item) => {
            const matchesName = name === "" || item.name.toLowerCase().includes(name.toLowerCase());

            return matchesName;
        })
    }, [products, name]);

    const columns = React.useMemo<ColumnDef<Product>[]>(() => [
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
            size: 50,
            enableSorting: false,
            enableHiding: false
        },
        {
            id: "products",
            accessorKey: "products",
            header: ({ column } : { column: Column<Product, unknown> }) => (
                <DataTableColumnHeader column={column} label="Products"/>
            ),
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className="flex items-center w-full gap-3.5 py-4">
                        <Avatar className="h-16 w-16 rounded-xl">
                            <AvatarImage className="rounded-xl" src="https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-1.webp" />
                        </Avatar>
                        <div className="flex-[1 1 auto] min-w-0 m-0">
                            <span className="block m-0 text-sm font-semibold leading-5.5 text-ellipsis whitespace-nowrap overflow-hidden">{item.name}</span>
                            <span className="block m-0 text-sm font-normal text-foreground/50">{item.category?.name}</span>
                        </div>
                    </div>
                )
            },
            meta: {
                label: "Products", 
                placeholder: "Search products...",
                variant: "text",
                icon: Text,
            },
            enableColumnFilter: true,
            size: 360,
        },
        {
            id: "created_at",
            accessorKey: "created_at",
            header: ({ column } : { column: Column<Product, unknown> }) => (
                <DataTableColumnHeader column={column} label="Create at"/>
            ),
            cell: ({ cell }) => {
                const date = new Date(cell.getValue<string>());
                return (
                    <div>
                        {date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }).replace(",", "")}
                    </div>
                );
    },
            meta: {
                label: "Create at", 
            },
        },
        {
            id: "cost_price",
            accessorKey: "cost_price",
            header: ({ column } : { column: Column<Product, unknown> }) => (
                <DataTableColumnHeader column={column} label="Cost Price"/>
            ),
            cell: ({ row }) => (
                <div className="font-medium">
                    {formatCurrency(row.getValue("cost_price"))}
                </div>
            ),
            meta: {
                label: "Cost Price", 
            },
        },
        {
            id: "sell_price",
            accessorKey: "sell_price",
            header: ({ column } : { column: Column<Product, unknown> }) => (
                <DataTableColumnHeader column={column} label="Sell Price"/>
            ),
            cell: ({ row }) => (
                <div className="font-medium">
                    {formatCurrency(row.getValue("sell_price"))}
                </div>
            ),
            meta: {
                label: "Sell Price", 
            },
        },
        {
            id: "stock_qty",
            accessorKey: "stock_qty",
            header: ({ column } : { column: Column<Product, unknown> }) => (
                <DataTableColumnHeader column={column} label="Quantity"/>
            ),
            cell: ({ cell }) => <div>{cell.getValue<Product["stock_qty"]>()}</div>,
            meta: {
                label: "Quantity", 
            },
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
            }
        }
    ],[])

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
                            <h2 className="text-2xl font-bold tracking-tight">Products</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Manage fitness products.</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button><Plus className="h-5 w-5"/>Add Product</Button>
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
        </>
    )
}