'use client'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Moon, Bell, Menu } from 'lucide-react';
import Link from 'next/link'

export default function Header() {
    return (
        <>
            <div className="sticky top-0 z-30">
                <header className="flex justify-between items-center h-16 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6">
                    <div className="flex items-center gap-3">
                        <SidebarTrigger className="-ml-1">
                            <Menu className="h-5 w-5" />
                        </SidebarTrigger>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Moon className="h-5 w-5" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger render={
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Bell className="h-5 w-5" />
                                </Button>
                            }>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <div className="">

                                </div>
                                <div className="">
                                    
                                </div>
                                <div className="border-t border-border">
                                    <Link href="/profile" className="flex justify-center items-center py-2.5">View all notifications</Link>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
            </div>
        </>
    )
}