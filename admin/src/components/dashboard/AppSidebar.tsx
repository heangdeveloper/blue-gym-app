"use client"

import * as React from "react";
import Link from 'next/link'
import { useRouter } from "next/navigation";
import NavUser from "@/components/dashboard/nav-user";
import { navigationItems } from "@/lib/navigation";

import {
    Dumbbell,
    ChevronDown
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
                    <Link href="/dashboard" className="flex items-center h-16 px-8 gap-3">
                        <div className="flex justify-center items-center shrink-0 w-8 h-8 rounded-lg bg-sidebar-primary">
                            <Dumbbell className="h-5 w-5 text-white"/>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-sm font-bold tracking-tight text-sidebar-foreground">BlueGym</h1>
                            <p className="text-[10px] font-medium tracking-widest uppercase text-sidebar-foreground/40">Dashboard</p>
                        </div>
                    </Link>
                </SidebarHeader>
                <SidebarContent className="py-2.5">
                    {navigationItems.map((group, i) => (
                        <SidebarGroup className="p-0" key={i}>
                            <SidebarGroupLabel className="pt-4 px-7 pb-1 text-[11px] font-medium uppercase">{group.group}</SidebarGroupLabel>
                            {group.items.map((item, j) => (
                                <SidebarMenu key={j}>
                                    {item.children?.length ? (
                                        <Collapsible
                                            key={item.label}
                                            className="group">
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger
                                                    render={
                                                        <SidebarMenuButton className="group w-full h-auto py-3 pl-8 pr-7 text-[13px] gap-4 [&>svg]:text-sidebar-foreground/50 [&>svg]:size-5 group-data-open:bg-sidebar-accent" tooltip={item.label}>
                                                            {item.icon && <item.icon />}
                                                            <span className="w-full text-[13px] font-normal">{item.label}</span>
                                                            <ChevronDown className="transition-transform duration-200 group-data-open:rotate-180" />
                                                        </SidebarMenuButton>
                                                    }
                                                />
                                                <CollapsibleContent>
                                                    <SidebarMenuSub className="m-0 p-0 gap-0 group-data-open:border-l-0">
                                                        {item.children.map((sub, k) => (
                                                            <SidebarMenuSubItem key={k}>
                                                                <SidebarMenuSubButton
                                                                    className="h-auto py-2 pr-4 pl-14"
                                                                    render={
                                                                        <Link href={sub.href}>
                                                                            <span className="w-full px-4 text-[13px] leading-5 text-sidebar-foreground/70">{sub.label}</span>
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
                                            className="w-full h-auto py-3 pl-8 pr-7 text-[13px] gap-4 [&>svg]:size-5 [&>svg]:text-sidebar-foreground/50"
                                            render={
                                                <Link href={item.href!}>
                                                    {item.icon && <item.icon/>}
                                                    <span className="w-full text-[13px] font-normal">{item.label}</span>
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
                {/* <SidebarFooter>
                    <NavUser />
                </SidebarFooter> */}
            </Sidebar>
        </>
    )
}