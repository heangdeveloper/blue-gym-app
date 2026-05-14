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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup
} from "@/components/ui/select"
import { branchSchema } from "@/schema/branche";
import { useConfirm } from "@/app/provider/ConfirmDialogProvider";

interface Branche {
    id: number;
    name: string;
    location: string;
    phone: string;
    status: "active" | "inactive";
}

export default function Page() {
    const t = useTranslations('BranchPage');
    const formSchema = React.useMemo(() => branchSchema(t), [t]);
    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            location: "",
            phone: "",
            status: "active",
        },
    })
    const [branches, setBranches] = React.useState<Branche[]>([]);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const confrim = useConfirm();


    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {

        } catch(e) {
            
        }
    }
    return (
        <>
            <div className="relative flex flex-col w-full mx-auto px-4 min-[768px]:px-4 min-[0]:px-0">
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold tracking-tight">{t('header.title')}</h2>
                            <p className="mt-1 text-sm text-muted-foreground">{t('header.subtitle')}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button onClick={() => {
                                reset({
                                    name: "",
                                    location: "",
                                    phone: "",
                                    status: "active"
                                })
                                setOpenAddDialog(true)
                            }}><Plus className="h-5 w-5"/>{t('header.addButton')}</Button>
                        </div>
                    </div>
                </div>
                
            </div>

            <Dialog
                open={openAddDialog}
                onOpenChange={(open) => {
                    setOpenAddDialog(open);
                    if(!open) {
                        reset();
                        setSelectedId(null);
                    }
                }}
            >
                <form id="form-category" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <DialogContent className="p-6.5 rounded-md ring-0">
                        <DialogHeader>
                            <DialogTitle>{selectedId ? t('dialog.editTitle') : t('dialog.addTitle')}</DialogTitle>
                        </DialogHeader>
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-branch-name">
                                            {t('dialog.form.name')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-branch-name"
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
                                name="location"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-branch-location">
                                            {t('dialog.form.location')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-branch-location"
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
                                name="phone"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-branch-phone">
                                            {t('dialog.form.phone')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-branch-phone"
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
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-branch-status">
                                            {t('dialog.form.status')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Select
                                            id="form-branch-status"
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
                            <Button type="submit" form="form-category" disabled={isSubmitting}>{isSubmitting ? selectedId ? t('dialog.button.updating') : t("dialog.button.saving") : selectedId ? t("dialog.button.update") : t("dialog.button.save")}</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}