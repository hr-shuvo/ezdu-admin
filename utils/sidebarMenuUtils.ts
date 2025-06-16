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
        // {
        //     name: "Ez Du",
        //     logo: GalleryVerticalEnd,
        //     plan: "Dashboard | Admin",
        // },
    ],
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            items: [
                {
                    title: "Dashboard",
                    url: "/",
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
            title: "Academy",
            url: "academy",
            icon: BookOpen,
            items: [
                {
                    title: "Class",
                    url: "/academy/classes"
                },
                {
                    title: "Subject",
                    url: "/academy/subjects",
                },
                {
                    title: "Lesson & MCQ",
                    url: "/academy/lessons",
                },
                {
                    title: "Lesson Content",
                    url: "/academy/lesson-content",
                },
                {
                    title: "Institues",
                    url: "/academy/institutes",
                },
                {
                    title: "Model Test",
                    url: "/academy/model-test",
                },
            ],
        },        
        {
            title: "Admission",
            url: "admission",
            icon: BookOpen,
            items: [
                {
                    title: "Category",
                    url: "/admission/category"
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