import z from "zod"

export const packageSchema = (t: any) => 
    z.object({
        name: z
            .string()
            .trim()
            .min(1, { message: t('dialog.form.validation.name.min') }),
        duration: z
            .string()
            .min(1, { message: t('dialog.form.validation.duration.min') }),
        price: z
            .string()
            .min(1, { message: t('dialog.form.validation.price.min') }),
        description: z
            .string()
            .trim()
            .max(200, { message: t('dialog.form.validation.description.max') })
            .optional()
            .or(z.literal("")),
        status: z.enum(["active", "inactive"], {
            message: t('dialog.form.validation.status.error'),
        }),
    });

export type PackageFormValues = z.infer<ReturnType<typeof packageSchema>>;