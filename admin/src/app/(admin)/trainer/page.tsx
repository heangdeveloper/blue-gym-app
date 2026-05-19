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
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import { trainerSchema } from "@/schema/trainer";
import { useConfirm } from "@/app/provider/ConfirmDialogProvider";
import { getColumns, Trainer } from "./components/datatable-header";

type Branch = {
    id: number,
    name: string
}

export default function Page() {
    const t = useTranslations('TrainerPage');
    const formSchema = React.useMemo(() => trainerSchema(t), [t]);
    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            specialty: "",
            phone: "",
            branch: "",
            status: "active",
        }
    })
    const [trainers, setTrainers] = React.useState<Trainer[]>([]);
    const [branchs, setBranchs] = React.useState<Branch[]>([]);
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
                    specialty: item.specialty,
                    phone: item.phone,
                    status: item.status,
                });
            },
            async (item) => {
                const ok = await confrim()
                if (!ok) return;
                try {
                    await fetch(`/api/trainer/${item.id}`, {
                        method: "DELETE",
                    });

                    setTrainers((prev) =>
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
        async function fetchTrainers() {
            try {
                const res = await fetch(`api/trainer`, {
                    headers: {
                        Accept: "application/json",
                    },
                });
                const json = await res.json();
                setTrainers(json.data.map((item: any) => item.data ?? item));
            } catch (err) {
                console.error("Failed to fetch:", err);
            }
        }

        async function fetchBranchs() {
            try {
                const res = await fetch(`api/branch`, {
                    headers: {
                        Accept: "application/json",
                    },
                });
                const json = await res.json();
                setBranchs(json.data.map((item: any) => item.data ?? item));
            } catch (err) {
                console.error("Failed to fetch:", err);
            }
        }

        fetchTrainers();
        fetchBranchs();
    }, []);
    
    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            if (selectedId !== null) {
                const res = await fetch(`api/trainer/${selectedId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data)
                })
                const updatedItem = await res.json();

                setTrainers((prev) =>
                    prev.map((item) =>
                        item.id === Number(selectedId)
                            ? updatedItem.data.data ?? updatedItem.data
                            : item
                    )
                );
            } else {
                const res = await fetch("api/trainer", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data)
                })

                const newItem = await res.json();
                setTrainers((prev) => [...prev, newItem.data]);
            }
            setOpenAddDialog(false);
            setSelectedId(null);
            reset();
        } catch(err) {
            console.error("Failed to save:", err);
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
                            <Button onClick={() => {setOpenAddDialog(true)}}><Plus className="h-5 w-5"/>{t('header.addButton')}</Button>
                        </div>
                    </div>
                </div>
                <div className="relative w-full overflow-x-auto">
                    <Suspense
                        fallback={
                            <></>
                        }
                    >
                        <DataTable data={trainers} columns={columns}/>
                    </Suspense>
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
                <form id="form-trainer" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                                        <FieldLabel htmlFor="form-trainer-name">
                                            {t('dialog.form.name')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-trainer-name"
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
                                name="specialty"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-trainer-specialty">
                                            {t('dialog.form.specialty')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-trainer-specialty"
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
                                        <FieldLabel htmlFor="form-trainer-phone">
                                            {t('dialog.form.phone')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-trainer-phone"
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
                                        <FieldLabel htmlFor="form-trainer-branch">
                                            {t('dialog.form.branch.label')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Combobox
                                            id="form-trainer-branch"
                                            value={field.value ?? ""}
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <ComboboxInput placeholder={t('dialog.form.branch.placeholder')} />
                                            <ComboboxContent>
                                                {branchs.length === 0 ? (
                                                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                                                ): (
                                                    <ComboboxList>
                                                        {branchs.map((label) => (
                                                            <ComboboxItem key={label.id} value={label.id.toString()}>{label.name}</ComboboxItem>
                                                        ))}
                                                    </ComboboxList>
                                                )}
                                            </ComboboxContent>
                                        </Combobox>
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
                                        <FieldLabel htmlFor="form-trainer-status">
                                            {t('dialog.form.status')}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Select
                                            id="form-trainer-status"
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
                            <Button type="submit" form="form-trainer" disabled={isSubmitting}>{isSubmitting ? selectedId ? t('dialog.button.updating') : t("dialog.button.saving") : selectedId ? t("dialog.button.update") : t("dialog.button.save")}</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}