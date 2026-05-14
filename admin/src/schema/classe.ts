import z from "zod"

export const classeSchema = (t: any) => 
    z.object({
        name: z
            .string()
            .min(2, t('dialog.form.validation.name.min'))
            .max(100, t('dialog.form.validation.name.max')),
        branch: z
            .string()
            .min(1, t('dialog.form.validation.branch.min')),
        trainer: z
            .string()
            .min(1, t('dialog.form.validation.trainer.min')),
        start_date: z
            .string()
            .min(1, t('dialog.form.validation.start_date.min')),
        start_time: z
            .string()
            .min(1, t('dialog.form.validation.start_time.min')),
        end_time: z
            .string()
            .min(1, t('dialog.form.validation.end_time.min')),
        status: z.enum(["active", "inactive"], {
            message: t('dialog.form.validation.status.error') ,
        }),
    });

export type ClasseFormValues = z.infer<ReturnType<typeof classeSchema>>;