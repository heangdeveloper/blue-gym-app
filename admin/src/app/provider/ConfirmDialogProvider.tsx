"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';

type ConfirmOptions = {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
};

type ConfirmContextType = {
    confirm: (options?: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = React.createContext<ConfirmContextType | null>(null);

export function ConfirmDialogProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<ConfirmOptions>({});
    const [resolver, setResolver] = React.useState<(value: boolean) => void>();
    const t = useTranslations('removeDialog');

    const confirm = (opts?: ConfirmOptions) => {
        setOptions(opts || {});
        setOpen(true);

        return new Promise<boolean>((resolve) => {
            setResolver(() => resolve);
        });
    };

    const handleClose = (result: boolean) => {
        setOpen(false);
        resolver?.(result);
    };

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    className="p-6.5 rounded-md ring-0"
                >
                    <DialogHeader>
                        <DialogTitle>{options.title || t("title")}</DialogTitle>
                        <DialogDescription>
                            {options.description || t("description")}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => handleClose(false)}>{options.cancelText || t("cancel")}</Button>
                        <Button variant="destructive" onClick={() => handleClose(true)}>{options.confirmText || t("submit")}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ConfirmContext.Provider>
    )
}

export function useConfirm() {
    const ctx = React.useContext(ConfirmContext);
    if (!ctx) {
        throw new Error("useConfirm must be used inside ConfirmDialogProvider");
    }
    return ctx.confirm;
}