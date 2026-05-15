import z from "zod"

export const userSchema = (t: any) => 
    z.object({
        name: z
            .string()
            .min(2, t('dialog.form.validation.name.min')),
        email: z
            .string()
            .email("Invalid email format")
            .nullable()
            .optional()
            .or(z.literal("")),
        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(50, "Username is too long")
            .regex(
                /^[a-zA-Z0-9_]+$/,
                "Username can only contain letters, numbers, and underscores"
            ),
        phone: z
            .string()
            .nullable()
            .optional()
            .or(z.literal(""))
            .refine(
                (val) => !val || /^[0-9]{8,15}$/.test(val),
                "Phone must be 8–15 digits"
            ),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters"),
        avatar: z
            .string()
            .url("Avatar must be a valid URL")
            .nullable()
            .optional()
            .or(z.literal("")),

        status: z
            .enum(["active", "inactive"])
            .default("active"),
    });

export type UserFormValues = z.infer<ReturnType<typeof userSchema>>;