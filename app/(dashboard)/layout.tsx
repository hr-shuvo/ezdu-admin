'use client'

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { BreadcrumbProvider, CustomBreadcrumb } from "@/components/common/breadcrumb";


type Props = {
    children: React.ReactNode
}

export default function DashboardLayout({children}: Props) {


    return (
        <SidebarProvider>
            <AppSidebar/>

            <SidebarInset>
                <BreadcrumbProvider>
                    <header
                        className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1"/>
                            <Separator orientation="vertical" className="mr-2 h-4"/>

                            {/*<Breadcrumb>*/}
                            {/*    <BreadcrumbList>*/}
                            {/*        <BreadcrumbItem className="hidden md:block">*/}
                            {/*            <BreadcrumbLink href="#">*/}
                            {/*                Building Your Application*/}
                            {/*            </BreadcrumbLink>*/}
                            {/*        </BreadcrumbItem>*/}
                            {/*        <BreadcrumbSeparator className="hidden md:block"/>*/}
                            {/*        <BreadcrumbItem>*/}
                            {/*            <BreadcrumbPage>Data Fetching</BreadcrumbPage>*/}
                            {/*        </BreadcrumbItem>*/}
                            {/*    </BreadcrumbList>*/}
                            {/*</Breadcrumb>*/}

                            <CustomBreadcrumb/>

                        </div>
                    </header>

                    <div className="p-4 pt-0">
                        {children}

                    </div>

                </BreadcrumbProvider>


            </SidebarInset>

        </SidebarProvider>
    )
}
