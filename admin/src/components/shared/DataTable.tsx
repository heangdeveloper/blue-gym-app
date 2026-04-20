"use client"

import { Field, FieldLabel } from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function DataTable() {
    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center flex-1 gap-2">

                    </div>
                    <div className="flex items-center gap-2">

                    </div>
                </div>
                <div className="rounded-md border">

                </div>
                <div className="flex justify-between items-center flex-col gap-4 sm:flex-row">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>Showing 1-10 of 25 results</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Field orientation="horizontal" className="w-fit">
                                <FieldLabel htmlFor="select-rows-per-page" className="text-sm text-muted-foreground">Rows</FieldLabel>
                                <Select defaultValue="10">
                                    <SelectTrigger className="w-20" id="select-rows-per-page">
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {[10, 20, 30, 40, 50].map((pageSize) => (
                                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                                {pageSize}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>
                        <div className="flex items-center gap-1">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#" isActive>1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">2</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">3</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}