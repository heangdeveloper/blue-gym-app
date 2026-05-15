"use client";

import React, { Suspense } from "react";
import {
    ArrowLeft
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form";
import * as z from "zod"
import { useRouter } from "next/navigation";

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
    Card,
    CardContent
} from "@/components/ui/card"

import { userSchema } from "@/schema/user";
import { User } from "../components/datatable-header";

export default function page() {
    const router = useRouter();
    const t = useTranslations('UserPage');
    const formSchema = React.useMemo(() => userSchema(t), [t]);
    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "",
            username: "",
            phone: "",
            password: "",
            avatar: "",
            status: "active"
        }
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {

        } catch(err) {

        }
    }
    return(
        <>
            <div className="relative flex flex-col w-full mx-auto px-4 min-[768px]:px-4 min-[0]:px-0">
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold tracking-tight">{t('header.title')}</h2>
                            <p className="mt-1 text-sm text-muted-foreground">{t('header.subtitle')}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button onClick={() => router.push("/user")}><ArrowLeft className="h-5 w-5"/>{t('header.addButton')}</Button>
                        </div>
                    </div>
                </div>
                <Card>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <CardContent>
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
                            </FieldGroup>
                        </CardContent>
                    </form>
                </Card>
            </div>
            
        </>
    )
}