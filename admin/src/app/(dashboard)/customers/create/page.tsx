"use client"

import * as React from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form";
import * as z from "zod"

import {
    Plus
} from "lucide-react";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const genders = [
    {
        id: "male",
        label: "Male"
    },
    {
        id: "female",
        label: "Female"
    }
] as const

const formSchema = z.object({
    name: z.string(),
    genders: z
        .array(z.string())
        .min(1, "Please select at least one gender.")
        .refine(
            (value) => value.every((gender) => genders.some((t) => t.id === gender)),
            {
                message: "Invalid gender selected.",
            }
        ),
    phone: z.string(),
    package: z.string(),
    payment_method: z.string(),
    trainer: z.string(),
});

interface Package {
    id: number;
    name: string;
    duration: string;
    price: string;
    description: string;
    status: "active" | "inactive";
}

export default function Page() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            genders: [],
            package: "",
        },
    });
    const router = useRouter();
    const [packages, setPackages] = React.useState<Package[]>([]);

    async function onSubmit(data: z.infer<typeof formSchema>) {

    }

    // FETCH PACKAGES
    React.useEffect(() => {
        async function fetchPackages() {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/packages`, {
                    headers: {
                        Accept: "application/json",
                    },
                })
                const json = await res.json();
                const getActive = json.data.filter(
                    (pkg: Package) => pkg.status === "active"
                )
                setPackages(getActive)
            } catch(err) {
                console.error("Failed to fetch packages:", err);
            }
        }
        fetchPackages();
    }, []);

    return (
        <>
            <div>
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold tracking-tight">New Customers</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Add a new customers.</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button onClick={() => router.push("/customers")}><Plus className="h-5 w-5"/>List Customer</Button>
                        </div>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Customer Details</CardTitle>
                        <CardDescription>Fill in the information below to create a new Customer.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id="form-customer" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FieldGroup className="grid grid-cols-none gap-4 sm:grid-cols-2">
                                <Controller
                                    name="name"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-name">
                                                Name
                                                <span className="text-destructive">*</span>
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="form-name"
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
                                    name="genders"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <FieldGroup>
                                            <FieldSet data-invalid={fieldState.invalid}>
                                                <FieldLegend variant="label">
                                                    Gender
                                                    <span className="text-destructive ml-2">*</span>
                                                </FieldLegend>
                                                <FieldGroup data-slot="checkbox-group" className="grid grid-cols-none gap-4 sm:grid-cols-2">
                                                    {genders.map((item) => (
                                                        <Field
                                                            key={item.id}
                                                            orientation="horizontal"
                                                            data-invalid={fieldState.invalid}
                                                        >
                                                            <Checkbox
                                                                id={`form-rhf-checkbox-${item.id}`}
                                                                name={field.name}
                                                                aria-invalid={fieldState.invalid}
                                                                onCheckedChange={(checked) => {
                                                                    const newValue = checked
                                                                        ? [...field.value, item.id]
                                                                        : field.value.filter(
                                                                            (value) => value !== item.id
                                                                        )
                                                                    field.onChange(newValue)
                                                                }}
                                                            />
                                                            <FieldLabel
                                                                htmlFor={`form-rhf-checkbox-${item.id}`}
                                                                className="font-normal"
                                                            >
                                                                {item.label}
                                                            </FieldLabel>
                                                        </Field>
                                                    ))}
                                                </FieldGroup>
                                            </FieldSet>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </FieldGroup>
                                    )}
                                />
                            </FieldGroup>
                            <FieldGroup className="grid grid-cols-none gap-4 sm:grid-cols-2">
                                <Controller
                                    name="phone"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-phone">
                                                Phone
                                                <span className="text-destructive">*</span>
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="form-phone"
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
                                    name="package"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-package">
                                                Packages
                                            </FieldLabel>
                                            <Select
                                                name={field.name}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger
                                                    id="form-rhf-select-language"
                                                    aria-invalid={fieldState.invalid}
                                                >
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {packages.map((item) => (
                                                        <SelectItem key={item.id} value={item.name}>
                                                            {item.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                            <FieldGroup className="grid grid-cols-none gap-4 sm:grid-cols-2">
                                <Controller
                                    name="payment_method"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-payment_method">
                                                Payment Method
                                            </FieldLabel>
                                            <Select
                                                name={field.name}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger
                                                    id="form-payment_method"
                                                    aria-invalid={fieldState.invalid}
                                                >
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem>Cash</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="trainer"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-trainer">
                                                Trainer
                                            </FieldLabel>
                                            <Select
                                                name={field.name}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger
                                                    id="form-trainer"
                                                    aria-invalid={fieldState.invalid}
                                                >
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem>Not needed​</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                            <div className="flex justify-end items-center pt-2 gap-3">
                                <Button variant="secondary" type="submit">Cancel</Button>
                                <Button variant="default" type="submit">Create Customer</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
