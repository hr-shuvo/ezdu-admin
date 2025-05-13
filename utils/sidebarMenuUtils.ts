import {
    BookOpen,
    Bot,
    Frame,
    GalleryVerticalEnd, Map, PieChart,
    Settings2,
    SquareTerminal
} from "lucide-react";


export const SidebarMenuList = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/logo/logo.png",
    },
    teams: [
        {
            name: "Ez Du",
            logo: GalleryVerticalEnd,
            plan: "Dashboard | Admin",
        },
        // {
        //     name: "Acme Corp.",
        //     logo: AudioWaveform,
        //     plan: "Startup",
        // },
        // {
        //     name: "Evil Corp.",
        //     logo: Command,
        //     plan: "Free",
        // },
    ],
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Dashboard",
                    url: "/dashboard",
                },
                {
                    title: "Stats",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Modules",
                    url: "/modules",
                },
                {
                    title: "Courses",
                    url: "#",
                }
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "User View",
            url: "/",
            icon: Map,
        },
    ],
}