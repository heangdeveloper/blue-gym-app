import z from "zod"

export const permissionSchema = (t: any) => 
    z.object({
        name: z
            .string()
            .min(2, t('dialog.form.validation.name.min')),
    });

export type PermissionFormValues = z.infer<ReturnType<typeof permissionSchema>>;