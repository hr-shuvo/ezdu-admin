'use client';

import Loading from "@/app/(dashboard)/loading";
import { getAcademyModelTest } from "@/app/_services/academy/academyInstituteService";
import { getAcademyLesson } from "@/app/_services/academy/academyLessonService";
import { loadAcamemicMcq } from "@/app/_services/academy/academyMcqService";
import { getAcademySubject } from "@/app/_services/academy/academySubjectService";
import CustomPagination from "@/components/common/pagination";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Pencil, PlusCircle, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { IoArrowBack } from "react-icons/io5";

const ModelTestMcqPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const modelTestId = searchParams.get('modelTestId');
    const [subjectId, setSubjectId] = useState('');
    const [instituteId, setInstituteId] = useState('');

    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const [modelTest, setModelTest] = useState<any>();
    // const [subject, setSubject] = useState<any>();
    const [mcqList, setMcqList] = useState<any[]>([]);

    useEffect(() => {
        startTransition(async () => {
            if (modelTestId) {
                const _modelTest = await getAcademyModelTest(modelTestId);
                setModelTest(_modelTest);
                // console.log(_modelTest);
                setSubjectId(_modelTest.subjectId);
                setInstituteId(_modelTest.instituteId);
            } else {
                router.push('.');
            }
        })
    }, [currentPage, pageSize, searchParams]);

    useEffect(() => {
        if (modelTest && modelTest.instituteId) {
            const _instituteIds = [modelTest.instituteId];
            // console.log(_instituteIds)
            
            startTransition(async () => {
                const _mcqList = await loadAcamemicMcq(currentPage, pageSize, subjectId!,"", _instituteIds, modelTest.year);
                setMcqList(_mcqList.data);
                setTotalCount(_mcqList.totalCount);
                setTotalPage(_mcqList.totalPage);
            })
        }

    }, [modelTest])

    if (isPending) {
        return <Loading />
    }



    return (
        <>
            <div className="w-full flex-col">
                <div className="w-full my-5 p-5 border">

                    <div className="flex justify-between">
                        <h1 className="text-4xl">Model Test</h1>

                        <div className="gap-2 flex">
                            <Link href={`.`}>
                                <Button size='sm'> <IoArrowBack /> <span>Back</span></Button>
                            </Link>
                            <Link href={`..`}>
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
                            <h1 className="text-4xl font-bold">{modelTest?.title}</h1>
                            {/* <h3>{course?.subTitle}</h3> */}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 text-xl gap-2">

                            <div className="flex gap-2">
                                <div>
                                    Subject :
                                </div>
                                <h1>
                                    {modelTest?.subject?.title}
                                </h1>
                            </div>

                            <div className="flex gap-2">
                                <div>
                                    Institute :
                                </div>
                                <h1 >
                                    {modelTest?.institute?.title}
                                </h1>
                            </div>

                            <div className="flex gap-2">
                                <div>
                                    Year :
                                </div>
                                <h1>
                                    {modelTest?.year}
                                </h1>
                            </div>

                        </div>

                    </div>


                </div>

                <div className="w-full my-5 p-5 border">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="text-lg">Mcq List</h1>
                        </div>
                        <div>
                            <Link href={`./mcq/form?modelTestId=${modelTestId}`}>
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
                            <Table className='w-full border-collapse [&>tbody>tr:nth-child(even)]:bg-gray-50'>
                                <TableHeader>
                                    <TableRow className="text-center">
                                        <TableHead className='text-center'>Sl</TableHead>
                                        <TableHead className='text-center'>Question</TableHead>
                                        <TableHead className='text-center'>Options</TableHead>
                                        <TableHead className='text-center'>Description</TableHead>
                                        <TableHead className='text-center'>Action</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {
                                        mcqList.length ? (

                                            mcqList.map((data: any, index) => (
                                                <TableRow key={index}>
                                                    <TableCell
                                                        className='border-r text-center'>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                                                    <TableCell className='border-r'>{data.question}</TableCell>
                                                    <TableCell className='border-r'>
                                                        <div>
                                                            {data.optionList.length ? (
                                                                data.optionList.map((option: any, optIdx: number) => (
                                                                    <div key={optIdx}
                                                                        className='flex flex-col gap-y-1'>
                                                                        <Badge
                                                                            className={option.correct ? 'bg-green-500 w-full my-1' : 'bg-gray-500 w-full'}>{option.text}</Badge>
                                                                    </div>
                                                                ))
                                                            ) :
                                                                (
                                                                    <span>No Options, Please add</span>
                                                                )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className='border-r'>{data.description}</TableCell>
                                                    <TableCell className='text-center'>
                                                        <div className="flex justify-center gap-1">
                                                            <Link href={`../challenges/${data._id}`}><Button
                                                                variant='default'
                                                                size='sm'><Eye /></Button></Link>

                                                            <Link href={`./mcq/form/${data._id}?modelTestId=${modelTestId}`}><Button
                                                                variant='default'
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

export default ModelTestMcqPage;