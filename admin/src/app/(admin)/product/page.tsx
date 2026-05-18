"use client";

import React, { Suspense } from "react";
import {
    Plus
} from "lucide-react";
import { useTranslations } from 'next-intl';
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";

import { useConfirm } from "@/app/provider/ConfirmDialogProvider";
import { getColumns, Product } from "./components/datatable-header";

export default function Page() {
    const t = useTranslations('ProductPage');
    const [products, setProducts] = React.useState<Product[]>([]);
    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const confrim = useConfirm();

    const columns = React.useMemo(
        () =>
        getColumns(
            t,
            async (item) => {
                setSelectedId(item.id);
            },
            async (item) => {
                const ok = await confrim()
                if (!ok) return;
                try {
                    await fetch(`/api/category/${item.id}`, {
                        method: "DELETE",
                    });

                    setProducts((prev) =>
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
        async function fetchProducts() {
            try {
                const res = await fetch(`api/products`, {
                    headers: {
                        Accept: "application/json",
                    },
                });
                const json = await res.json();
                setProducts(json.data.map((item: any) => item.data ?? item));
            } catch (err) {
                console.error("Failed to fetch products:", err);
            }
        }
        fetchProducts();
    }, []);

    return (
        <>
            <div>
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold tracking-tight">{t('header.title')}</h2>
                            <p className="mt-1 text-sm text-muted-foreground">{t('header.list_page.subtitle')}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button><Plus className="h-5 w-5"/>{t('header.list_page.addButton')}</Button>
                        </div>
                    </div>
                </div>
                <div className="relative w-full overflow-x-auto">
                    <Suspense
                        fallback={
                            <></>
                        }
                    >
                        <DataTable data={products} columns={columns}/>
                    </Suspense>
                </div>
            </div>
        </>
    )
}