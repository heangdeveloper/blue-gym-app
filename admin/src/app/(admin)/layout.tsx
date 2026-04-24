import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/dashboard/AppSidebar";
import Header from "@/components/dashboard/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
