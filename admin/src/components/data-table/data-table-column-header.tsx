"use client";

import type { Column } from "@tanstack/react-table";
import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue> extends React.ComponentProps<typeof Button> {
    column: Column<TData, TValue>;
    label: string;
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    label,
    className,
    ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort() && !column.getCanHide()) {
        return <div className={cn(className)}>{label}</div>;
    }

    return (
        <span
            className={cn(
                "flex items-center text-sm font-medium gap-1 focus:outline-none data-[state=open]:bg-accent [&_svg]:size-4.5 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
                className,
            )}
            {...props}
        >
            {label}
            {column.getCanSort() &&
                (column.getIsSorted() === "desc" ? (
                    <Icon icon="solar:arrow-down-linear" />
                ) : column.getIsSorted() === "asc" ? (
                    <Icon icon="solar:arrow-up-linear" />
                ) : (
                    ""
            ))}
        </span>
    );
}
