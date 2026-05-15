"use client";

import React, { Suspense } from "react";
import {
    Plus
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form";
import * as z from "zod"

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
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
import { roleSchema } from "@/schema/role";
import { useConfirm } from "@/app/provider/ConfirmDialogProvider";

import { DataTable } from "@/components/data-table/data-table";
import { getColumns, Role, Permission } from "./components/datatable-header";

export default function Page() {
    const t = useTranslations('RolePage');
    const formSchema = React.useMemo(() => roleSchema(t), [t]);
    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            permission: []
        }
    })
    const [roles, setRoles] = React.useState<Role[]>([]);
    const [permissions, setPermissions] = React.useState<Permission[]>([]);
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
                });
            },
            async (item) => {
                const ok = await confrim()
                if (!ok) return;
                try {
                    await fetch(`/api/auth/role/${item.id}`, {
                        method: "DELETE",
                    });

                    setRoles((prev) =>
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
        async function fetchRoles() {
            try {
                const res = await fetch("api/auth/role", {
                    headers: {
                        Accept: "application/json",
                    },
                });
                const json = await res.json();
                setRoles(json.data.map((item: any) => item.data ?? item));
            } catch (err) {
                console.error("Failed to fetch:", err);
            }
        }

        async function fetchPermissions() {
            try {
                const res = await fetch("api/auth/permission", {
                    headers: {
                        Accept: "application/json",
                    },
                });
                const json = await res.json();
                setPermissions(json.data.map((item: any) => item.data ?? item));
            } catch (err) {
                console.error("Failed to fetch:", err);
            }
        }
        fetchPermissions();
        fetchRoles();
    }, []);
    
    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            if (selectedId) {
                const res = await fetch(`api/auth/role/${selectedId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data),
                })
                const updated = await res.json();

                console.log(updated)
                
            } else {
                const res = await fetch("api/auth/role", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data)
                })

                const newItem = await res.json();

                setRoles((prev) => [...prev, newItem.data]);
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
                    <DataTable data={roles} columns={columns}/>
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
                    <DialogContent className="sm:max-w-187.5 p-6.5 rounded-md ring-0">
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
                                name="permission"
                                control={control}
                                render={({ field }) => (
                                    <Field>
                                        <FieldLabel htmlFor="form-role-permission">
                                            Role Permissions
                                        </FieldLabel>
                                        <div className="flex flex-wrap">
                                            {permissions.map((item, index) => (
                                                <Field className="w-1/4 py-4" orientation="horizontal" key={index}>
                                                    <Checkbox
                                                        checked={(field.value ?? []).includes(item.name)}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                field.onChange([
                                                                ...(field.value ?? []),
                                                                item.name
                                                            ]);
                                                            } else {
                                                                field.onChange(
                                                                    (field.value ?? []).filter(
                                                                        (p) => p !== item.name
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                        id={`select-permission-${item.id}`} name={`select-permission-${item.id}`} />
                                                    <Label htmlFor={`select-permission-${item.id}`} className="capitalize">{item.name}</Label>
                                                </Field>
                                            ))}
                                        </div>
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