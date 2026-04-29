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
                const res = await fetch("/api/products", {
                    headers: {
                        Accept: "application/json",
                    },
                });
                const json = await res.json();
                setProducts(json.data);
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
            id: "products",
            accessorKey: "products",
            header: ({ column } : { column: Column<Product, unknown> }) => (
                <DataTableColumnHeader column={column} label="Products"/>
            ),
            cell: ({ cell }) => {
                <div>
                    <Avatar className="h-16 w-16 rounded-3xl">
                        <AvatarImage className="rounded-3xl" src="https://niceadmin-mui-nextjs-main.vercel.app/images/products/s5.jpg" />
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="text-sm font-semibold">{cell.getValue<Product["name"]>()}</span>
                        <span className="text-sm font-normal">{cell.getValue<Product["category"]["name"]>()}</span>
                    </div>
                </div>
            },
            meta: {
                label: "Products", 
                placeholder: "Search products...",
                variant: "text",
                icon: Text,
            },
            enableColumnFilter: true,
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
            cell: ({ cell }) => <div>{cell.getValue<Product["cost_price"]>()}</div>,
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
            cell: ({ cell }) => <div>{cell.getValue<Product["sell_price"]>()}</div>,
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
                        <Button
                            size="icon"
                            variant="ghost"
                        >
                            <Pencil />
                        </Button>
                        <Button
                            size="icon"
                            variant="destructive"
                        >
                            <Trash2 />
                        </Button>
                    </div>
                )
            }
        }
    ],[])

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