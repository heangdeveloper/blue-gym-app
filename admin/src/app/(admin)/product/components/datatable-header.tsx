"use client";

import {
    Pencil,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarImage
} from "@/components/ui/avatar"

import type { Column, ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { formatCurrency } from "@/lib/format-currency";

export interface Product {
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

export const getColumns = (
    t: (key: string) => string,
    onEdit: (item: Product) => void,
    onDelete: (item: Product) => void
): ColumnDef<Product>[] => [
    {
        id: "products",
        accessorKey: "products",
        header: ({ column } : { column: Column<Product, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.name")}/>
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
                        <span className="block m-0 text-sm font-normal text-gray-500">{item.category?.name}</span>
                    </div>
                </div>
            )
        },
    },
    {
        id: "created_at",
        accessorKey: "created_at",
        header: ({ column } : { column: Column<Product, unknown> }) => (
            <DataTableColumnHeader column={column} label={t("table.header.create_at")}/>
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
            <DataTableColumnHeader column={column} label={t("table.header.cost_price")}/>
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
            <DataTableColumnHeader column={column} label={t("table.header.sell_price")}/>
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
            <DataTableColumnHeader column={column} label={t("table.header.quantity")}/>
        ),
        cell: ({ cell }) => <div>{cell.getValue<Product["stock_qty"]>()}</div>,
        meta: {
            label: "Quantity", 
        },
    },
    {
        id: "actions",
        header: ({ column } : { column: Column<Product, unknown> }) => (
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
        }
    }
]