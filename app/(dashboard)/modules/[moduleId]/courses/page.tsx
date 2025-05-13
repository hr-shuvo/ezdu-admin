'use client';

import { loadCourses } from "@/app/_services/course-services";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import Loading from "../../../(dashboard)/modules/loading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, PlusCircle, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomPagination from "@/components/common/pagination";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const DashboardCoursePage = () => {
    const params = useParams();

    const [courses, setCourses] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [isPending, startTransition] = useTransition();


    useEffect(() => {
        startTransition(async () => {
            const moduleId = Array.isArray(params.moduleId) ? params.moduleId[0] : params.moduleId;

            const response = await loadCourses(currentPage, pageSize, moduleId);
            setCourses(response.data);
            setTotalCount(response.totalCount);
            setTotalPage(response.totalPage);
            setCurrentPage(response.currentPage);
        })
    }, [currentPage, pageSize, params.moduleId]);

    if (isPending) {
        return <Loading />
    }



    return (
        <>
            <div className="w-full flex-col">

                <div className="w-full my-5 p-5 border">

                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <Link href="/" className="text-blue-500 hover:underline">Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <Link href="/dashboard" className="text-blue-500 hover:underline">Dashboard</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <Link href="./" className="text-blue-500 hover:underline">Modules</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Details</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>



                    <div className="flex justify-between mt-5">
                        <div>
                            <h1 className="text-lg">Course List</h1>
                        </div>
                        <div>
                            <Link href="./modules/form">
                                <Button size='sm' variant='sidebarOutline'>
                                    <PlusCircle /><span> Add</span>
                                </Button>
                            </Link>

                        </div>
                    </div>

                    <div className="w-full">
                        <div className="flex items-center py-4">
                            <Input placeholder="Search" className="max-w-sm" />
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Modified At</TableHead>
                                        <TableHead>Actiion</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {
                                        courses.length ? (

                                            courses.map((course: any) => (
                                                <TableRow key={course._id}>
                                                    <TableCell>{course.title}</TableCell>
                                                    <TableCell>
                                                        <div className="flex-col flex">
                                                            <span>{new Date(course.createdAt).toLocaleString('en', {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "2-digit",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}</span>
                                                            {course.createdAt === course.updatedAt ? <></> : (
                                                                <span>{new Date(course.updatedAt).toLocaleString('en', {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "2-digit",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}</span>
                                                            )}

                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex justify-center gap-1">
                                                            <Link href={`../courses/${course._id}`}><Button variant='default'
                                                                size='sm'><Eye /></Button></Link>

                                                            <Link href={`./courses/form/${course._id}`}><Button variant='default'
                                                                size='sm'><span><Pencil /></span></Button></Link>
                                                            <Link href={'#'}><Button variant='destructiveOutline'
                                                                size='sm'><span><Trash /></span></Button></Link>


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
                        </div>

                        <div className="flex items-center justify-between space-x-2 py-4">
                            <div className="flex items-center text-sm text-muted-foreground gap-2">
                                <div>{totalCount} items found</div>
                                <div>
                                    <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                                        <SelectTrigger className="w-[100px]">
                                            <SelectValue placeholder="Theme" />
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
    );


}


export default DashboardCoursePage;