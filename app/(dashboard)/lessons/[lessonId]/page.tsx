'use client';

import Link from "next/link";
import { getLesson } from "@/app/_services/lesson-service";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, PlusCircle, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { IoArrowBack } from "react-icons/io5";
import { loadChallenges } from "@/app/_services/challenge-service";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomPagination from "@/components/common/pagination";
import Loading from "../../modules/loading";


const LessonDetailsPage = () => {
    const params = useParams();
    const [course, setCourse] = useState<any>();

    const [challenges, setChallenges] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [isPending, startTransition] = useTransition();


    useEffect(() => {
        startTransition(async () => {
            const lessonId = Array.isArray(params.lessonId) ? params.lessonId[0] : params.lessonId;
            const lesson = await getLesson(lessonId);
            setCourse(lesson);

            const response = await loadChallenges(currentPage, pageSize, lessonId);
            setChallenges(response.data);
            setTotalCount(response.totalCount);
            setTotalPage(response.totalPage);
            setCurrentPage(response.currentPage);

        })
    }, [currentPage, pageSize, params.lessonId]);

    if (isPending) {
        return <Loading />
    }

    return (
        <>
            <div className="w-full flex-col">
                <div className="w-full my-5 p-5 border">

                    <div className="flex justify-between">
                        <h1 className="text-4xl">Lesson Details</h1>
                        <div className="gap-2 flex">
                            <Link href={`../modules/${course?.moduleId}`}>
                                <Button size='sm'> <IoArrowBack /> <span>Back</span></Button>
                            </Link>
                            <Link href={`./form/${course?._id}`}>
                                <Button variant='sidebarOutline' size='sm'> <Pencil /> <span>Edit</span></Button>
                            </Link>
                        </div>
                    </div>

                    <div className="my-5">
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
                                    <Link href="./" className="text-blue-500 hover:underline">Courses</Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Details</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="my-5">
                        <div className="my-5">
                            <h1 className="text-4xl font-bold">{course?.title}</h1>
                            {/* <h3>{course?.subTitle}</h3> */}
                        </div>
                        <div className="flex justify-start text-xl gap-2">
                            <div>2348 learner</div>
                            <div className="flex justify-between gap-2"> 22 courses</div>

                        </div>

                    </div>


                </div>

                <div className="w-full my-5 p-5 border">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="text-lg">Challenge List</h1>
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
                                    <TableRow className="text-center">
                                        <TableHead>Question</TableHead>
                                        <TableHead>type</TableHead>
                                        <TableHead>Options</TableHead>
                                        <TableHead>Actiion</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {
                                        challenges.length ? (

                                            challenges.map((data: any) => (
                                                <TableRow key={data._id}>
                                                    <TableCell>{data.question}</TableCell>
                                                    <TableCell>{data.type}</TableCell>
                                                    <TableCell>{'optionns'}</TableCell>
                                                    <TableCell>
                                                        <div className="flex justify-center gap-1">
                                                            <Link href={`../challenges/${data._id}`}><Button variant='default'
                                                                size='sm'><Eye /></Button></Link>

                                                            <Link href={`./${data._id}/challenges/form/${data._id}`}><Button variant='default'
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
    )
}

export default LessonDetailsPage;