import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/dashboard/AppSidebar";
import Header from "@/components/dashboard/header";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth_token')?.value;
    if (!authToken) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-background min-w-90">
            <div className="flex min-h-screen">
                <SidebarProvider>
                    <AppSidebar/>
                    <div className="flex flex-1 flex-col transition-all duration-300">
                        <Header/>
                        <main id="main-content" className="flex-1 p-4 sm:p-6">
                            {children}
                        </main>
                    </div>
                </SidebarProvider>
            </div>
        </div>
    );
}
