"use client"

import * as React from "react";
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { NavUser } from "@/components/dashboard/nav-user";
import { navigationItems } from "@/lib/navigation";

import {
    Dumbbell,
    ChevronRight
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarGroup,
    SidebarMenuSubButton,
    SidebarGroupLabel,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem
} from "@/components/ui/sidebar"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const router = useRouter();
    const [user, setUser] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        async function fetchUser() {
            const res = await fetch("/api/auth/me", {
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            }
        }
        fetchUser()
    }, [])

    async function handleLogout() {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            })
            router.push("/login");
        } catch(err) {
            console.error("Failed to logout:", err);
        }
    }
    return (
        <>
            <Sidebar collapsible="icon" {...props}>
                <SidebarHeader className="p-0">
                    <Link href="/dashboard" className="flex items-center px-12 gap-3">
                        <div className="flex justify-center items-center shrink-0 w-8 h-8 rounded-lg bg-sidebar-primary">
                            <Dumbbell className="h-5 w-5 text-white"/>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-sm font-bold tracking-tight text-sidebar-foreground">BlueGym</h1>
                            <p className="text-[10px] font-medium tracking-widest uppercase text-sidebar-foreground/40">Dashboard</p>
                        </div>
                    </Link>
                </SidebarHeader>
                <SidebarContent className="px-4">
                    {navigationItems.map((group, i) => (
                        <SidebarGroup className="p-0 gap-0.5" key={i}>
                            <SidebarGroupLabel className="py-2 pl-4 pr-0 text-xs font-bold uppercase">{group.group}</SidebarGroupLabel>
                            {group.items.map((item, j) => (
                                <SidebarMenu key={j}>
                                    {item.children?.length ? (
                                        <Collapsible>
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger
                                                    render={
                                                    <SidebarMenuButton className="py-1 px-4" tooltip={item.label}>
                                                        {item.icon && <item.icon />}
                                                        <span>{item.label}</span>
                                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                    </SidebarMenuButton>
                                                    }
                                                />
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.children.map((sub, k) => (
                                                            <SidebarMenuSubItem key={k}>
                                                                <SidebarMenuSubButton
                                                                    render={
                                                                        <Link href={sub.href}>
                                                                            <span>{sub.label}</span>
                                                                        </Link>
                                                                    }
                                                                />
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    ) : (
                                    <SidebarMenuItem>
                                        <SidebarMenuSubButton
                                            className="py-1 px-4"
                                            render={
                                                <Link href={item.href!}>
                                                    {item.icon && <item.icon />}
                                                    <span>{item.label}</span>
                                                </Link>
                                            }
                                        />
                                    </SidebarMenuItem>
                                    )}
                                </SidebarMenu>
                            ))}
                        </SidebarGroup>
                    ))}
                </SidebarContent>
                <SidebarFooter>
                    <NavUser />
                </SidebarFooter>
            </Sidebar>
        </>
    )
}