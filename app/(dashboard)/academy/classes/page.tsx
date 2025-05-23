'use client';

import { useEffect } from "react";
import { useBreadcrumb } from "@/components/common/breadcrumb";

const AcademyClassPage = () => {
    const {setBreadcrumbList} = useBreadcrumb();

    useEffect(() => {
        setBreadcrumbList([
            {title: 'Home', link: '/'},
            {title: 'Classes', link: '/academy/classes'},
        ]);

    }, [setBreadcrumbList]);


    return (
        <div>
            academy class page
        </div>
    )
};


export default AcademyClassPage;