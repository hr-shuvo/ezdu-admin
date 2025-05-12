import React from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";

type Props = {
    className: React.ReactNode
};


export const Sidebar = ({className}: Props) =>{
    return (
        <div className={cn('flex h-full lg:w-[256px] w-[256px] ' +
            'lg:fixed left-0 top-0 px-4 border-r-2 flex-col', className)}>

            <Link href='/'>
                <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
                    <Image src='/logo/logo.png' height={40} width={40} alt='logo'/>
                    <h1 className='text-2xl font-extrabold text-sky-400 tracking-wide'>
                        ez du
                    </h1>

                </div>
            </Link>


            <div className='flex flex-col gap-y-2 flex-1'>
                <SidebarItem label='Dashboard' href='/dashboard' iconSrc='/common/learn.svg'/>
                <SidebarItem label='Learn' href='/learn' iconSrc='/common/learn.svg'/>
                <SidebarItem label='Leaderboard' href='/leaderboard' iconSrc='/common/leaderboard.svg'/>
                <SidebarItem label='Quests' href='/quests' iconSrc='/common/quests.svg'/>
                <SidebarItem label='Shop' href='/shop' iconSrc='/common/shop.svg'/>

            </div>


        </div>
    )
}

