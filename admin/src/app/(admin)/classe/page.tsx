"use client";

import * as React from "react";
import {
    Text,
    Plus,
    Pencil,
    Trash2,
    CalendarIcon
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
import { Calendar } from "@/components/ui/calendar"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
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
import { classeSchema } from "@/schema/classe";
import { useConfirm } from "@/app/provider/ConfirmDialogProvider";

interface Classe {
    id: number;
    branch: {
        id: number;
        name: string;
    };
    trainer: {
        id: number;
        name: string;
    };
    name: string;
    schedule: string;
    start_date: string;
    start_time: string;
    end_time: string;
    capacity: string;
    status: "active" | "inactive";
}

export default function Page() {
    const t = useTranslations('ClassePage');
    const formSchema = React.useMemo(() => classeSchema(t), [t]);
    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            branch: "",
            trainer: "",
            start_date: "",
            start_time: "00:00:00",
            end_time: "00:00:00",
            status: "active",
        },
    })
    const [classes, setClasses] = React.useState<Classe[]>([]);
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
            <div>
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
                                    branch: "",
                                    trainer: "",
                                    start_date: "",
                                    start_time: "",
                                    end_time: "",
                                    status: "active",
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
                                        <FieldLabel htmlFor="form-class-name">
                                            {t('dialog.form.name')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-class-name"
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
                                name="branch"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-class-branch">
                                            {t('dialog.form.trainer')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Select
                                            id="form-class-branch"
                                            value={field.value ?? ""}
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('dialog.form.selectBranch.placeholder')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="trainer"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-class-trainer">
                                            {t('dialog.form.trainer')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Select
                                            id="form-class-trainer"
                                            value={field.value ?? ""}
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('dialog.form.selectTrainer.placeholder')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="start_date"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-class-start_date">
                                            {t('dialog.form.start_date')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-class-start_date"
                                            aria-invalid={fieldState.invalid}
                                            type="time"
                                            defaultValue={field.value}
                                            className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <FieldGroup className="max-w-xs flex-row">
                                <Controller
                                    name="start_time"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-class-start_time">
                                                {t('dialog.form.start_time')}
                                                <span className="text-destructive">*</span>
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="form-class-start_time"
                                                aria-invalid={fieldState.invalid}
                                                type="time"
                                                defaultValue={field.value}
                                                className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="end_time"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-class-end_time">
                                                {t('dialog.form.end_time')}
                                                <span className="text-destructive">*</span>
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="form-class-end_time"
                                                aria-invalid={fieldState.invalid}
                                                type="time"
                                                defaultValue={field.value}
                                                className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-class-status">
                                            {t('dialog.form.status')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Select
                                            id="form-class-status"
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