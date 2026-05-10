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
    branch: {
        id: number;
        name: string;
    };
    name: string;
    specialty: string;
    phone: string;
    status: "active" | "inactive";
}

export default function Page() {
    return (
        <>
            <div>
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold tracking-tight">Trainers</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Manage fitness trainers.</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button><Plus className="h-5 w-5"/>Add Trainer</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}