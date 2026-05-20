"use client";

import * as React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    
} from "@/components/ui/card"
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field"
import {
    Alert,
    AlertTitle,
} from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertTriangleIcon } from "lucide-react"

import { useTranslations } from 'next-intl';
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form";
import * as z from "zod"

import { useRouter } from "next/navigation";
import { loginSchema } from "@/schema/login";

export default function Page() {
    const t = useTranslations('LoginPage');
    const [serverError, setServerError] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const formSchema = React.useMemo(() => loginSchema(t), [t]);
    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })

    const router = useRouter();

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setServerError(null);
        try {
            const res = await fetch("/api/auth/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Appect": "application/json"
                },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                throw new Error(`Login failed with status: ${res.status}`);
            }
            const result = await res.json();
            if (result.token) {
                setTimeout(() => {
                    router.push("/dashboard");
                }, 100);
            } else {
                setError("Invalid response - no token received");
            }

        } catch(error) {
            console.error("Login Failed: ", error);
            setError("Login failed. Please try again");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-svh w-full p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('title')}</CardTitle>
                        <CardDescription>{t('subTitle')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id="form-signin" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                            {serverError && (
                                <Alert className="max-w-md mb-4 border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50">
                                    <AlertTriangleIcon />
                                    <AlertTitle>{serverError}</AlertTitle>
                                </Alert>
                            )}
                            <FieldGroup>
                                <Controller
                                    name="username"
                                    control={control}
                                    render={({ field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="username">
                                                {t('form.username')}
                                                <span className="text-destructive">*</span>
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="username"
                                                aria-invalid={fieldState.invalid}
                                                type="text"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setServerError(null);
                                                }}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="username">
                                                {t('form.password')}
                                                <span className="text-destructive">*</span>
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="password"
                                                aria-invalid={fieldState.invalid}
                                                type="password"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setServerError(null);
                                                }}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Field>
                                    <Button type="submit" form="form-signin" disabled={isSubmitting}>{isSubmitting ? t('button.logging') : t('button.login')}</Button>
                                </Field>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}