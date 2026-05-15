"use client";

import React, { Suspense } from "react";
import {
    Plus
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/app/provider/ConfirmDialogProvider";

import { DataTable } from "@/components/data-table/data-table";
import { getColumns, User } from "./components/datatable-header";

export default function page() {
    const router = useRouter();
    const t = useTranslations('UserPage');
    const [users, setUsers] = React.useState<User[]>([]);
    const confrim = useConfirm();

    const columns = React.useMemo(
        () =>
            getColumns(
            t,
            async (item) => {
                
            },
            async (item) => {
                const ok = await confrim()
                if (!ok) return;
                try {
                    await fetch(`/api/auth/user/${item.id}`, {
                        method: "DELETE",
                    });

                    setUsers((prev) =>
                        prev.filter((p) => p.id !== item.id)
                    );
                } catch (err) {
                    console.error("Delete failed:", err);
                }
            }
        ),
        [t, confrim]
    );
    
    React.useEffect(() => {
        async function fetchPermissions() {
            try {
                const res = await fetch("api/auth/user", {
                    headers: {
                        Accept: "application/json",
                    },
                });
                const json = await res.json();
                setUsers(json.data.map((item: any) => item.data ?? item));
            } catch (err) {
                console.error("Failed to fetch:", err);
            }
        }
        fetchPermissions();
    }, []);
    return (
        <>
            <div className="relative flex flex-col w-full mx-auto px-4 min-[768px]:px-4 min-[0]:px-0">
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold tracking-tight">{t('header.title')}</h2>
                            <p className="mt-1 text-sm text-muted-foreground">{t('header.subtitle')}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button onClick={() => router.push("/user/create")}><Plus className="h-5 w-5"/>{t('header.addButton')}</Button>
                        </div>
                    </div>
                </div>
                <Suspense
                    fallback={
                        <></>
                    }
                >
                    <DataTable data={users} columns={columns}/>
                </Suspense>
            </div>
        </>
    )
}