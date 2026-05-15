import z from "zod"

export const roleSchema = (t: any) => 
    z.object({
        name: z
            .string()
            .min(2, t('dialog.form.validation.name.min')),
        permission: z
            .array(z.string())
            .optional(),
    });

export type RoleFormValues = z.infer<ReturnType<typeof roleSchema>>;