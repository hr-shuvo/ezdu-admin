"use client"

import * as React from "react"

import {NavMain} from "@/components/layout/nav-main";
import {NavProjects} from "@/components/layout/nav-projects"
import {NavUser} from "@/components/layout/nav-user"
import {TeamSwitcher} from "@/components/layout/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import {SidebarMenuList} from "@/utils/sidebarMenuUtils";


// This is sample data.
const data = SidebarMenuList;


export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams}/>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={data.navMain}/>
                <NavProjects projects={data.projects}/>
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={data.user}/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
