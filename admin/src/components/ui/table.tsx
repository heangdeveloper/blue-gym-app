"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
    return (
        <div
            data-slot="table-container"
            className="relative flex flex-col w-full grow"
        >
            <div
                data-slot="table"
                className={cn("relative flex flex-col h-full grow z-0", className)}
                {...props}
            />
        </div>
    )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
    return (
        <div
            data-slot="table-header"
            className={cn("flex flex-col w-fit", className)}
            {...props}
        />
    )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
    return (
        <div
            data-slot="table-body"
            className={cn("flex flex-col", className)}
            {...props}
        />
    )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
    return (
        <div
            data-slot="table-row"
            className={cn(
                "flex hover:bg-foreground",
                className
            )}
            {...props}
        />
    )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
    return (
        <div
            data-slot="table-head"
            className={cn(
                "relative flex items-center px-2.5 text-left whitespace-nowrap text-ellipsis text-foreground border-b border-[rgba(145 158 171 / 20%)] bg-[#F4F6F8] [&:has([role=checkbox])]:p-0 [&:has([role=checkbox])]:justify-center",
                className
            )}
            {...props}
        />
    )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <div
        data-slot="table-cell"
        className={cn(
            "flex-auto h-auto p-2.5 align-middle whitespace-normal border-b border-dashed [&:has([role=checkbox])]:p-0 [&:has([role=checkbox])]:justify-center",
            className
        )}
        {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
