import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import React from "react";
import { createContext, ReactNode, useContext, useState } from "react";


type BreadcrumbItem = {
    title: string;
    link: string;
};

type BreadcrumbContextType = {
    breadcrumbList: BreadcrumbItem[];
    setBreadcrumbList: (list: BreadcrumbItem[]) => void;
};

export const BreadcrumbContext = createContext<BreadcrumbContextType>(undefined!);

export const BreadcrumbProvider = ({children}: { children: ReactNode }) => {
    const [breadcrumbList, setBreadcrumbList] = useState<BreadcrumbItem[]>([]);

    return (
        <BreadcrumbContext.Provider value={{breadcrumbList, setBreadcrumbList}}>
            {children}
        </BreadcrumbContext.Provider>
    );
};

export const useBreadcrumb = () => {
    const context = useContext(BreadcrumbContext);
    if (!context) throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
    return context;
};

export const CustomBreadcrumb = () => {
    const {breadcrumbList} = useBreadcrumb();

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    {
                        breadcrumbList.map((b, i) => (
                            <React.Fragment key={i}>
                                {i != 0 && (
                                    <BreadcrumbSeparator className="hidden md:block"/>
                                )}

                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        {b.title}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </React.Fragment>
                        ))
                    }

                </BreadcrumbList>
            </Breadcrumb>
        </>
    )
}