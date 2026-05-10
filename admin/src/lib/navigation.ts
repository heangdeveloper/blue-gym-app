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
        group: "overview.name",
        items: [
            {
                label: "overview.item.dashboard",
                icon: "duo-icons:compass",
                href: "/dashboard",
            },
        ],
    },
    {
        group: "management.name",
        items: [
            {
                label: "management.item.customers.name",
                icon: "duo-icons:user",
                children: [
                    { label: "management.item.customers.subMenu.membership", href: "/membership" },
                    { label: "management.item.customers.subMenu.walkin", href: "/walkin" },
                ],
            },
            {
                label: "management.item.e-commerce.name",
                icon: "duo-icons:shopping-bag",
                children: [
                    { label: "management.item.e-commerce.subMenu.categorie", href: "/category" },
                    { label: "management.item.e-commerce.subMenu.product", href: "/product" },
                ],
            },
            {
                label: "management.item.gym.name",
                icon: "duo-icons:building",
                children: [
                    { label: "management.item.gym.subMenu.package", href: "/package" },
                    { label: "management.item.gym.subMenu.trainer", href: "/trainer" },
                    { label: "management.item.gym.subMenu.classe", href: "/classes" },
                    { label: "management.item.gym.subMenu.branch", href: "/branch" },
                ],
            },
            {
                label: "management.item.authentication.name",
                icon: "duo-icons:settings",
                children: [
                    { label: "management.item.authentication.subMenu.user", href: "/user" },
                    { label: "management.item.authentication.subMenu.role", href: "/role" },
                    { label: "management.item.authentication.subMenu.permission", href: "/permission" },
                ],
            },
            {
                label: "management.item.report.name",
                icon: "duo-icons:box",
                children: [
                    { label: "management.item.report.subMenu.package", href: "/income" },
                    { label: "management.item.report.subMenu.trainer", href: "/expense" },
                ],
            },
        ],
    },
];