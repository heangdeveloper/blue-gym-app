"use client";

import React, { Suspense } from "react";
import {
    Plus
} from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
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

import { useConfirm } from "@/app/provider/ConfirmDialogProvider";
import { categorySchema } from "@/schema/category";

import { getColumns, Category } from "./components/datatable-header";

export default function Page() {
    const t = useTranslations('CategoryPage');
    const formSchema = React.useMemo(() => categorySchema(t), [t]);
    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            status: "active",
        }
    })
    const [categorys, setCategorys] = React.useState<Category[]>([]);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const confrim = useConfirm();

    const columns = React.useMemo(
        () =>
        getColumns(
            t,
            async (item) => {
                setSelectedId(item.id);
                setOpenAddDialog(true);
                reset({
                    name: item.name,
                    status: item.status,
                });
            },
            async (item) => {
                const ok = await confrim()
                if (!ok) return;
                try {
                    await fetch(`/api/category/${item.id}`, {
                        method: "DELETE",
                    });

                    setCategorys((prev) =>
                        prev.filter((p) => p.id !== item.id)
                    );
                } catch (err) {
                    console.error("Delete failed:", err);
                }
            }
        ),
        [t, confrim, reset]
    );

    React.useEffect(() => {
        async function fetchCategorys() {
            try {
                const res = await fetch(`api/category`, {
                    headers: {
                        Accept: "application/json",
                    },
                });
                const json = await res.json();
                setCategorys(json.data.map((item: any) => item.data ?? item));
            } catch (err) {
                console.error("Failed to fetch categorys:", err);
            }
        }
        fetchCategorys();
    }, []);

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            if (selectedId !== null) {
                const res = await fetch(`api/category/${selectedId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data)
                })
                const updatedItem = await res.json();

                setCategorys((prev) =>
                    prev.map((item) =>
                        item.id === Number(selectedId)
                            ? updatedItem.data.data ?? updatedItem.data
                            : item
                    )
                );
            } else {
                const res = await fetch("api/category", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data)
                })

                const newItem = await res.json();
                setCategorys((prev) => [...prev, newItem.data]);
            }
            setOpenAddDialog(false);
            setSelectedId(null);
            reset();
        } catch(err) {
            console.error("Failed to save category:", err);
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
                                    name: ""
                                })
                                setOpenAddDialog(true)
                            }}><Plus className="h-5 w-5"/>{t('header.addButton')}</Button>
                        </div>
                    </div>
                </div>
                <Suspense
                    fallback={
                        <></>
                    }
                >
                    <DataTable data={categorys} columns={columns}/>
                </Suspense>
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
                                        <FieldLabel htmlFor="form-category-name">
                                            {t('dialog.form.name')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-category-name"
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
                                        <FieldLabel htmlFor="form-category-status">
                                            {t('dialog.form.status')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Select
                                            id="form-category-status"
                                            value={field.value ?? ""}
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger aria-invalid={fieldState.invalid}>
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