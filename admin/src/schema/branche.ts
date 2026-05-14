import z from "zod"

export const branchSchema = (t: any) => 
    z.object({
        name: z
            .string()
            .min(2, t('dialog.form.validation.name.min'))
            .max(100, t('dialog.form.validation.name.max')),
        location: z
            .string()
            .min(5, t('dialog.form.validation.location.min'))
            .max(255, t('dialog.form.validation.location.max')),
        phone: z
            .string()
            .regex(
            /^[0-9+\-\s()]{8,20}$/,
                t('dialog.form.validation.phone.regex')      //"+855 12 345 678"
            ),
        status: z.enum(["active", "inactive"], {
            message: t('dialog.form.validation.status.error') ,
        }),
    });

export type BranchFormValues = z.infer<ReturnType<typeof branchSchema>>;