"use client"

import { loadAcademicClass } from "@/app/_services/academy/academyClassService";
import { loadAcademicLessonContent } from "@/app/_services/academy/academyLessonContentService";
import { loadAcademicLesson } from "@/app/_services/academy/academyLessonService";
import { loadAcademicSubject } from "@/app/_services/academy/academySubjectService";
import { useBreadcrumb } from "@/components/common/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AcademicClassLevelType } from "@/utils/common";
import { Eye, Pencil, PlusCircle, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import Loading from "../../loading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CustomPagination from "@/components/common/pagination";

const AcademyLessonContentPage = () => {

    const { setBreadcrumbList } = useBreadcrumb();

    const [lessonContents, setLessonContents] = useState([]);
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
    const [lessonId, setLessonId] = useState('');
    const [lessons, setLessons] = useState([]);


    useEffect(() => {
        setBreadcrumbList([
            {title: 'Home', link: '/'},
            {title: 'Lessons', link: '/academy/lessons'},
            {title: 'Contents', link: '/academy/lesson-content'},
            {title: 'Manage', link: '/academy/lesson-content'},
        ]);

    }, [setBreadcrumbList]);

    useEffect(() => {
            startTransition(async () => {
                const response = await loadAcademicLessonContent(currentPage, pageSize, lessonId);
                setLessonContents(response.data);
                setTotalCount(response.totalCount);
                setTotalPage(response.totalPage);
                setCurrentPage(response.currentPage);    
            })
        }, [currentPage, pageSize, level, lessonId]);
    

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
    
        useEffect(() => {
            if(subjectId){

            }
            startTransition(async () => {
                const response = await loadAcademicLesson(1, 100, subjectId);
                setLessons(response.data);
            })
        }, [subjectId]);


    return (
        <>
            <div className='w-full flex-col'>
                <div className='w-full my-5 p-5 border'>

                    <div className="flex justify-between mt-5">
                        <div>
                            <h1 className="text-5xl font-bold">Lesson Content List</h1>
                        </div>
                        <div>
                            <Link href="./lesson-content/form">
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
                                        <SelectValue placeholder='Choose Class'/>
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
                                    }else{
                                        setSubjectId(null!)}
                                }}>
                                    <SelectTrigger className={'w-full min-w-[200px]'}>
                                        <SelectValue placeholder='Choose Subject'/>
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value={'all'}>All Subject</SelectItem>
                                        {subjects.map((item: { _id: string, title: string }) => (
                                            <SelectItem value={item._id} key={item._id}>{item.title}</SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>
                            </div>

                            <div className='flex flex-row gap-2'>
                                {/*<Label>Level</Label>*/}
                                <Select onValueChange={(data) => {
                                    if (data && data !== 'all') {
                                        setLessonId(data)
                                    }else{
                                        setLessonId(null!)}
                                }}>
                                    <SelectTrigger className={'w-full min-w-[200px]'}>
                                        <SelectValue placeholder='Choose Lesson'/>
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value={'all'}>All Lesson</SelectItem>
                                        {lessons.map((item: { _id: string, title: string }) => (
                                            <SelectItem value={item._id} key={item._id}>{item.title}</SelectItem>
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
                                                <TableHead className='text-center'>Lesson</TableHead>
                                                <TableHead className='text-center'>Description</TableHead>
                                                <TableHead className='text-center'>Action</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {
                                                lessonContents.length ? (

                                                    lessonContents.map((data: any, index) => (
                                                        <TableRow key={data._id}>
                                                            <TableCell
                                                                className='border-r text-center'>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                                                            <TableCell className='border-r '>{data?.title}</TableCell>
                                                            <TableCell className='border-r '>{data.lesson?.title}</TableCell>
                                                            <TableCell className='border-r '>
                                                                <div dangerouslySetInnerHTML={{ __html: data.description }} />
                                                            </TableCell>

                                                            <TableCell>
                                                                <div className="flex justify-center gap-1">
                                                                    <Link href={`../lesson-content/${data._id}`}><Button
                                                                        variant='default'
                                                                        size='sm'><Eye/></Button></Link>

                                                                    <Link href={`./lesson-content/form/${data._id}`}><Button
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

export default AcademyLessonContentPage;