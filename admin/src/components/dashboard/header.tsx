import { Button } from "@/components/ui/button"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import {
    SidebarTrigger,
} from "@/components/ui/sidebar"
import LocaleSwitcher from "@/components/dashboard/LocaleSwitcher"
import { Icon } from "@iconify/react";
import { Locale } from "next-intl"
import { cookies } from 'next/headers';

export default async function Header() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value || "en";

    async function changeLocalAction(locale: Locale) {
        "use server";
        const cookieStore = await cookies();
        cookieStore.set("locale", locale);
    }

    return (
        <>
            <div className="sticky top-0 z-30">
                <header className="flex justify-between items-center h-16 px-4 backdrop-blur-xl sm:px-6">
                    <div className="flex items-center gap-3">
                        <SidebarTrigger className="-ml-1"/>
                    </div>
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Icon icon="duo-icons:sun" />
                        </Button>
                        <LocaleSwitcher changeLocalAction={changeLocalAction} currentLocale={locale as Locale} />
                        <DropdownMenu>
                            <DropdownMenuTrigger render={
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Avatar className="rounded-full">
                                        <AvatarImage className="rounded-full" src="https://mira.bootlab.io/static/img/avatars/avatar-1.jpg" />
                                        <AvatarFallback className="rounded-full">CN</AvatarFallback>
                                    </Avatar>
                                </Button>
                            }/>
                            <DropdownMenuContent
                                className="min-w-50 max-w-57.5 w-full py-2 rounded-xl ring-0"
                            >
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel className="flex items-center pt-2 px-4 pb-4 gap-2">
                                        <Avatar className="w-9 h-9 rounded-full">
                                            <AvatarImage src="https://mira.bootlab.io/static/img/avatars/avatar-1.jpg" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="text-sm font-medium text-gray-950">Sim Kimheang</span>
                                            <span className="text-xs font-light">Administration</span>
                                        </div>
                                    </DropdownMenuLabel>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup className="pt-2">
                                    <DropdownMenuItem className="py-1.25 px-4 leading-5">
                                        Profile & Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="py-1.25 px-4 leading-5">
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="py-1.25 px-4 leading-5">
                                        Manage Team
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator className="my-2" />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="py-1.25 px-4 leading-5">
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
            </div>
        </>
    )
}