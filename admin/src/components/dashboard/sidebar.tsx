"use client"

import { Dumbbell, LogOut, House, UserRound, Settings, User, Handbag, FileChartColumn, School, Users } from 'lucide-react';
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button"
import clsx from "clsx";

const menu = [
    {
        title: "Overview",
        items: [
            { label: "Dashboard", href: "/dashboard", icon: House },
        ],
    },
    {
        title: "Administration",
        items: [
            { label: "Customers", href: "/customers", icon: User },
            { label: "Packages", href: "/packages", icon: Handbag },
            { label: "Trainers", href: "/trainers", icon: Users },
            { label: "Branchs", href: "/branchs", icon: Dumbbell },
            { label: "Classes", href: "/classes", icon: School },
            
        ],
    },
    {
        title: "System",
        items: [
            { label: "Users", href: "/users", icon: UserRound },
            { label: "Report", href: "/notifications", icon: FileChartColumn },
        ],
    },
]

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <>
            <aside className="fixed top-0 z-40 hidden h-screen flex-col bg-sidebar transition-all duration-300 ease-in-out lg:flex w-65">
                <Link href="/dashboard" className="flex items-center h-16 px-4 border-b border-sidebar-border gap-3">
                    <div className="flex justify-center items-center shrink-0 w-8 h-8 rounded-lg bg-sidebar-primary">
                        <Dumbbell className="h-5 w-5 text-white"/>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-sm font-bold tracking-tight text-sidebar-foreground">BlueGym</h1>
                        <p className="text-[10px] font-medium tracking-widest uppercase text-sidebar-foreground/40">Dashboard</p>
                    </div>
                </Link>
                <nav className="flex-1 space-y-3 px-3 py-4 overflow-y-auto">
                    <ul>
                        {menu.map((section) => (
                            <li key={section.title} className="mb-3 last:mb-0">
                                <dl>
                                    <dt>
                                        <div className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/30">
                                            <h4 className="flex-1 text-start">{section.title}</h4>
                                        </div>
                                    </dt>
                                    <dd>
                                        <div>
                                            <ul className="mt-1 space-y-0.5">
                                                {section.items.map((item) => {
                                                    const Icon = item.icon;
                                                    const isActive = pathname === item.href;
                                                    return (
                                                        <li key={item.href}>
                                                            <Link
                                                                href={item.href}
                                                                className={clsx(
                                                                "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                                                                isActive
                                                                    ? "bg-sidebar-accent text-sidebar-primary"
                                                                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                                                                )}
                                                            >
                                                                <Icon className="h-4.5 w-4.5" />
                                                                <span className="flex-1">{item.label}</span>
                                                            </Link>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </dd>
                                </dl>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="border-t border-sidebar-border p-3">
                    <div className="flex items-center gap-2">
                        <Link href="/profile" className="flex flex-1 items-center gap-3 px-2 py-2 rounded-lg transition-colors">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sidebar-primary/80 to-sidebar-primary text-[11px] font-bold text-sidebar-primary-foreground">KH</div>
                            <div className="flex flex-1 flex-col">
                                <h6 className="text-sm font-medium text-sidebar-foreground">Kimheang S.</h6>
                                <p className="text-xs text-sidebar-foreground/50">Admin</p>
                            </div>
                        </Link>
                        <Button variant="ghost" size="icon"><LogOut className="h-5 w-5"/></Button>
                    </div>
                </div>
            </aside>
        </>
    )
}