"use client";

import * as React from "react";
import {
    Plus
} from "lucide-react";

import {useTranslations} from 'next-intl';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

export default function Page() {
    const t = useTranslations('CategoryPage');
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    
    return (
        <>
            <div>
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold tracking-tight">{t('header.title')}</h2>
                            <p className="mt-1 text-sm text-muted-foreground">{t('header.subtitle')}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button onClick={() => { setOpenAddDialog(true)}}><Plus className="h-5 w-5"/>{t('header.addButton')}</Button>
                        </div>
                    </div>
                </div>
                <div className="relative w-full overflow-x-auto">
                    
                </div>
            </div>

            <Dialog
                open={openAddDialog}
            >
                <form autoComplete="off">
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Category</DialogTitle>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose render={<Button variant="outline">Cancel</Button>} />
                            <Button type="submit" form="form-package">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}