'use client';

import { useEffect, useState, useTransition } from "react";
import { useBreadcrumb } from "@/components/common/breadcrumb";
import Loading from "@/app/(dashboard)/modules/loading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, PlusCircle, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomPagination from "@/components/common/pagination";
import { AcademicInstituteType } from "@/utils/common";
import { loadAcademicInstitute } from "@/app/_services/academy/academyInstituteService";

const AcademyInstitutePage = () => {
    const {setBreadcrumbList} = useBreadcrumb();

    const [institutes, setInstitutes] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isPending, startTransition] = useTransition();

    const [level, setLevel] = useState('UNI');

    useEffect(() => {
        setBreadcrumbList([
            {title: 'Home', link: '/'},
            {title: 'Institutes', link: '/academy/institutes'},
            {title: 'Manage', link: '/academy/institutes'},
        ]);

    }, [setBreadcrumbList]);

    useEffect(() => {
        startTransition(async () => {
            const response = await loadAcademicInstitute(currentPage, pageSize, level);
            setInstitutes(response.data);
            setTotalCount(response.totalCount);
            setTotalPage(response.totalPage);
            setCurrentPage(response.currentPage);
        })
    }, [currentPage, pageSize, level]);

    // if (isPending) {
    //     return <Loading/>
    // }

    return (
        <>
            <div className='w-full flex-col'>
                <div className='w-full my-5 p-5 border'>

                    <div className="flex justify-between mt-5">
                        <div>
                            <h1 className="text-lg">Institute List</h1>
                        </div>
                        <div>
                            <Link href="./institutes/form">
                                <Button size='sm' variant='sidebarOutline'>
                                    <PlusCircle/><span> Add</span>
                                </Button>
                            </Link>

                        </div>
                    </div>

                    <div className="w-full">
                        <div className="flex items-center py-4 gap-5">
                            <div>
                                <Input placeholder="Search" className={'w-full min-w-[200px]'}/>
                            </div>
                            <div className='flex flex-row gap-2'>
                                {/*<Label>Level</Label>*/}
                                <Select onValueChange={(level) => setLevel(level)}>
                                    <SelectTrigger className={'w-full min-w-[200px]'}>
                                        <SelectValue placeholder='Choose Level'/>
                                    </SelectTrigger>

                                    <SelectContent>
                                        {/* <SelectItem value={'all'}>All</SelectItem> */}
                                        {AcademicInstituteType.map((item) => (
                                            <SelectItem value={item.value} key={item.value}>{item.text}</SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>
                            </div>
                            
                        </div>

                        <div className="rounded-md border">
                            {
                                isPending ? (
                                    <Loading/>
                                ) : (
                                    <Table className='w-full border [&>tbody>tr:nth-child(even)]:bg-gray-50'>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className='text-center'>Sl</TableHead>
                                                <TableHead className='text-center'>Title</TableHead>
                                                <TableHead className='text-center'>SubTitle</TableHead>
                                                <TableHead className='text-center'>Type</TableHead>
                                                <TableHead className='text-center'>Action</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {
                                                institutes.length ? (

                                                    institutes.map((data: any, index) => (
                                                        <TableRow key={data._id}>
                                                            <TableCell
                                                                className='border-r text-center'>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                                                            <TableCell className='border-r'>{data.title}</TableCell>
                                                            <TableCell className='border-r'>{data.subTitle}</TableCell>
                                                            <TableCell className='border-r'>{data.type}</TableCell>
                                                            <TableCell>
                                                                <div className="flex justify-center gap-1">
                                                                    <Link href={`../institutes/${data._id}`}><Button
                                                                        variant='default'
                                                                        size='sm'><Eye/></Button></Link>

                                                                    <Link href={`./institutes/form/${data._id}`}><Button
                                                                        variant='default'
                                                                        size='sm'><span><Pencil/></span></Button></Link>
                                                                    <Link href={'#'}><Button
                                                                        variant='destructiveOutline'
                                                                        size='sm'><span><Trash/></span></Button></Link>


                                                                </div>
                                                            </TableCell>

                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell
                                                            colSpan={3}
                                                            className="h-24 text-center"
                                                        >
                                                            No results.
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }


                                        </TableBody>
                                    </Table>
                                )
                            }

                        </div>

                        <div className="flex items-center justify-between space-x-2 py-4">
                            <div className="flex items-center text-sm text-muted-foreground gap-2">
                                <div>{totalCount} items found</div>
                                <div>
                                    <Select value={pageSize.toString()}
                                            onValueChange={(value) => setPageSize(Number(value))}>
                                        <SelectTrigger className="w-[100px]">
                                            <SelectValue placeholder="Theme"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="5">5</SelectItem>
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="20">20</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-x-2">
                                <CustomPagination
                                    totalPage={totalPage}
                                    currentPage={currentPage}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </div>

                    </div>


                </div>

            </div>
        </>
    )
};


export default AcademyInstitutePage;