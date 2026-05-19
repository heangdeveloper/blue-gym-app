import z from "zod";

export const loginSchema = (t: any) =>
    z.object({
        username: z
            .string()
            .nonempty(t('form.validation.username.nonempty')),
        password: z
            .string()
            .nonempty(t('form.validation.password.nonempty'))
    });

export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;