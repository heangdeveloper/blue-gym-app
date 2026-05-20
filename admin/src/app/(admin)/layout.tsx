import React from "react";
import {
    SidebarProvider,
} from "@/components/ui/sidebar"
import AppSidebar from "@/components/dashboard/AppSidebar";
import Header from "@/components/dashboard/header";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('apiToken')?.value;
    if (!authToken) redirect('/login');
    
    return (
        <div className="min-h-screen">
            <div className="flex min-h-screen">
                <SidebarProvider
                    style={
                        {
                        "--sidebar-width": "16rem",
                        "--sidebar-width-mobile": "16rem",
                        } as React.CSSProperties
                    }
                >
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
