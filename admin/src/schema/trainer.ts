import z from "zod";

export const trainerSchema = (t: any) =>
    z.object({
        name: z
            .string()
            .min(1, { message: t('dialog.form.validation.name.min') }),
        specialty: z
            .string()
            .min(1, { message: t('dialog.form.validation.specialty.min') }),
        phone: z
            .string()
            .min(1, { message: t('dialog.form.validation.phone.regex') }),
        branch: z
            .string()
            .min(1, {
                message: t('dialog.form.validation.branch.min')
            }),
        status: z.enum(["active", "inactive"], {
            message: t('dialog.form.validation.status.error'),
        }),
    });

export type TrainerFormValues = z.infer<ReturnType<typeof trainerSchema>>;