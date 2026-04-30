type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href?: string;
  icon?: string;
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
                    icon: "duo-icons:compass",
                    href: "/dashboard",
                },
            ],
    },
    {
        group: "Management",
        items: [
            {
                label: "Customers",
                icon: "duo-icons:user",
                children: [
                    { label: "Membership", href: "/membership" },
                    { label: "Walkin", href: "/walkin" },
                ],
            },
            {
                label: "E-commerce",
                icon: "duo-icons:shopping-bag",
                children: [
                    { label: "Category", href: "/category" },
                    { label: "Product", href: "/product" },
                ],
            },
            {
                label: "Gym",
                icon: "duo-icons:building",
                children: [
                    { label: "Packages", href: "/packages" },
                    { label: "Trainers", href: "/trainers" },
                    { label: "Classes", href: "/classes" },
                ],
            },
            {
                label: "Authentication",
                icon: "duo-icons:settings",
                children: [
                    { label: "User", href: "/user" },
                    { label: "Role", href: "/role" },
                    { label: "Permission", href: "/permission" },
                ],
            },
            {
                label: "Report",
                icon: "duo-icons:box",
                children: [
                    { label: "Income", href: "/income" },
                    { label: "Expense", href: "/expense" },
                ],
            },
        ]
    },
];