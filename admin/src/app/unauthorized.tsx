"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import { useTranslations } from 'next-intl';
import IcNotFound from "@/assets/img/not-found.svg"

export default function Unauthorized() {
    const router = useRouter();
    const t = useTranslations('unauthorizedPage');
    return (
        <>
            <main className="flex items-center justify-center flex-col min-h-screen py-16">
                <div className="flex flex-col gap-12">
                    <div className="flex justify-center">
                        <Image className="w-50 h-full rounded-none object-fill" src={IcNotFound} alt=""/>
                    </div>
                    <div className="flex flex-col text-center gap-2">
                        <h4 className="text-2xl font-medium leading-10">{t('title')}</h4>
                        <p className="text-sm font-normal leading-5">{t('subTitle')}</p>
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={() => router.push("/dashboard")}>{t('button')}</Button>
                    </div>
                </div>
            </main>
        </>
    )
}