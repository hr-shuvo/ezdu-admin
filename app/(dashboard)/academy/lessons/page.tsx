'use client';

import { useEffect, useState, useTransition } from "react";
import { useBreadcrumb } from "@/components/common/breadcrumb";
import Loading from "@/app/(dashboard)/modules/loading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, PlusCircle, Trash } from "lucide-react";
import { TiTick } from "react-icons/ti";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomPagination from "@/components/common/pagination";
import { AcademicClassLevelType } from "@/utils/common";
import { loadAcademicLesson } from "@/app/_services/academy/academyLessonService";
import { loadAcademicClass } from "@/app/_services/academy/academyClassService";
import { loadAcademicSubject } from "@/app/_services/academy/academySubjectService";

const AcademyLessonPage = () => {
    const { setBreadcrumbList } = useBreadcrumb();

    const [lessons, setLessons] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isPending, startTransition] = useTransition();

    const [level, setLevel] = useState('all');
    const [classId, setClassId] = useState('');
    const [classes, setClasses] = useState([]);
    const [subjectId, setSubjectId] = useState('');
    const [subjects, setSubjects] = useState([]);


    useEffect(() => {
        setBreadcrumbList([
            { title: 'Home', link: '/' },
            { title: 'Lessons', link: '/academy/lessons' },
            { title: 'Manage', link: '/academy/lessons' },
        ]);

    }, [setBreadcrumbList]);

    useEffect(() => {
        startTransition(async () => {
            const response = await loadAcademicLesson(currentPage, pageSize, subjectId);
            setLessons(response.data);
            setTotalCount(response.totalCount);
            setTotalPage(response.totalPage);
            setCurrentPage(response.currentPage);

        })
    }, [currentPage, pageSize, level, subjectId]);

    useEffect(() => {
        startTransition(async () => {
            const response = await loadAcademicClass(1, 100, level);
            setClasses(response.data);
        })
    }, [level]);

    useEffect(() => {
        startTransition(async () => {
            const response = await loadAcademicSubject(1, 100, level, classId);
            setSubjects(response.data);
        })
    }, [classId]);

    return (
        <>
            <div className='w-full flex-col'>
                <div className='w-full my-5 p-5 border'>

                    <div className="flex justify-between mt-5">
                        <div>
                            <h1 className="text-5xl font-bold">Lesson List</h1>
                        </div>
                        <div>
                            <Link href="./lessons/form">
                                <Button size='sm' variant='sidebarOutline'>
                                    <PlusCircle /><span> Add</span>
                                </Button>
                            </Link>

                        </div>
                    </div>

                    <div className="w-full">
                        <div className="flex items-center py-4 gap-5">
                            <div>
                                <Input placeholder="Search" className={'w-full min-w-[200px]'} />
                            </div>
                            <div className='flex flex-row gap-2'>
                                {/*<Label>Level</Label>*/}
                                <Select onValueChange={(level) => setLevel(level)}>
                                    <SelectTrigger className={'w-full min-w-[200px]'}>
                                        <SelectValue placeholder='Choose Level' />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value={'all'}>All Level</SelectItem>
                                        {AcademicClassLevelType.map((item) => (
                                            <SelectItem value={item.value} key={item.value}>{item.text}</SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>
                            </div>

                            <div className='flex flex-row gap-2'>
                                {/*<Label>Level</Label>*/}
                                <Select onValueChange={(data) => {
                                    if (data && data !== 'all') {
                                        setClassId(data)
                                    }
                                }}>
                                    <SelectTrigger className={'w-full min-w-[200px]'}>
                                        <SelectValue placeholder='Choose Class' />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value={'all'}>All Class</SelectItem>
                                        {classes.map((item: { _id: string, title: string }) => (
                                            <SelectItem value={item._id} key={item._id}>{item.title}</SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>
                            </div>

                            <div className='flex flex-row gap-2'>
                                {/*<Label>Level</Label>*/}
                                <Select onValueChange={(data) => {
                                    if (data && data !== 'all') {
                                        setSubjectId(data)
                                    } else {
                                        setSubjectId(null!)
                                    }
                                }}>
                                    <SelectTrigger className={'w-full min-w-[200px]'}>
                                        <SelectValue placeholder='Choose Subject' />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value={'all'}>All Subject</SelectItem>
                                        {subjects.map((item: { _id: string, title: string }) => (
                                            <SelectItem value={item._id} key={item._id}>{item.title}</SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>
                            </div>


                        </div>

                        <div className="rounded-md border">
                            {
                                isPending ? (
                                    <Loading />
                                ) : (
                                    <Table className='w-full border [&>tbody>tr:nth-child(even)]:bg-gray-50'>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className='text-center'>Sl</TableHead>
                                                <TableHead className='text-center'>Title</TableHead>
                                                <TableHead className='text-center'>Action</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {
                                                lessons.length ? (

                                                    lessons.map((data: any, index) => (
                                                        <TableRow key={data._id}>
                                                            <TableCell
                                                                className='border-r text-center'>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                                                            <TableCell className='border-r '>{data.title}</TableCell>

                                                            <TableCell>
                                                                <div className="flex justify-center gap-1">
                                                                    <Link href={`../lessons/${data._id}`}><Button
                                                                        variant='default'
                                                                        size='sm'><Eye /></Button></Link>

                                                                    <Link href={`./lessons/form/${data._id}`}><Button
                                                                        variant='default'
                                                                        size='sm'><span><Pencil /></span></Button></Link>

                                                                    <Link href={'#'}><Button
                                                                        variant='destructiveOutline'
                                                                        size='sm'><span><Trash /></span></Button></Link>

                                                                    <Link href={`./lessons/mcq?subjectId=${subjectId}&lessonId=${data._id}`}><Button
                                                                        variant='secondary'
                                                                        size='sm'>
                                                                        <span><TiTick /></span> MCQ
                                                                    </Button>
                                                                    </Link>


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
};


export default AcademyLessonPage;