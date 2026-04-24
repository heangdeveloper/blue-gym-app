import {
    ShieldUser,
    FileSliders,
    Store,
    User
} from "lucide-react"
import type { LucideIcon } from "lucide-react";

type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href?: string;
  icon?: LucideIcon;
  children?: NavChild[];
};

type NavGroup = {
  group: string;
  items: NavItem[];
};

export const navigationItems: NavGroup[] = [
    {
        group: "Overview",
            items: [
                {
                    label: "Dashboard",
                    icon: ShieldUser,
                    href: "/dashboard",
                },
            ],
    },
    {
        group: "Management",
        items: [
            {
                label: "Customers",
                icon: User,
                children: [
                    { label: "Membership", href: "/membership" },
                    { label: "Walkin", href: "/walkin" },
                ],
            },
            {
                label: "E-commerce",
                icon: Store,
                children: [
                    { label: "Category", href: "/category" },
                    { label: "Product", href: "/product" },
                ],
            },
        ]
    },
    {
    group: "Other",
        items: [
            {
                label: "Authentication",
                icon: ShieldUser,
                children: [
                    { label: "User", href: "/users" },
                    { label: "Role", href: "/role" },
                    { label: "Permission", href: "/permission" },
                ],
            },
            {
                label: "Report",
                icon: FileSliders,
                children: [
                    { label: "Income", href: "/income" },
                    { label: "Expense", href: "/expense" },
                ],
            },
        ],
    },
];