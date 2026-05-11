import z from "zod";

export const categorySchema = (t: any) =>
    z.object({
        name: z
            .string()
            .min(1, { message: t('dialog.form.validation.name') }),
            status: z.enum(["active", "inactive"]).optional(),
    });

export type CategoryFormValues = z.infer<ReturnType<typeof categorySchema>>;