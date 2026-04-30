"use client";

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Locale } from "next-intl";
import { Icon } from "@iconify/react";

type Props = {
    changeLocalAction: (locale: Locale) => Promise<void>;
}

export default function LocaleSwitcher({ changeLocalAction }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Icon icon="circle-flags:kh" />
                </Button>
            }>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-42 w-full py-2 rounded-xl ring-0">
                <DropdownMenuGroup>
                    {["en", "kh"].map((lang) => (
                        <DropdownMenuItem
                            key={lang}
                            className="flex items-center mx-2 p-1.5 leading-5 rounded-lg gap-2 [&_svg:not([class*='size-'])]:size-5"
                            onClick={() => changeLocalAction(lang as Locale)}
                        >
                            <Icon icon={`circle-flags:${lang}`} />
                            <span className="text-sm font-medium text-gray-950">{lang === "en" ? "English" : "Khmer"}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}