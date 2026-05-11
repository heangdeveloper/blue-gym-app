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

interface Branche {
    id: number;
    name: string;
    location: string;
    phone: string;
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
    const [branches, setBranches] = React.useState<Branche[]>([]);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const [name] = useQueryState("name", parseAsString.withDefault(""));
    const [status] = useQueryState("status", parseAsArrayOf(parseAsString).withDefault([]));
    const confrim = useConfirm();
    return (
        <>
            <div>
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold tracking-tight">Branchs</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Manage the fitness club branch.</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button><Plus className="h-5 w-5"/>Add Branch</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}