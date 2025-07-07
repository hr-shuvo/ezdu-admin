'use client';

import { useBreadcrumb } from "@/components/common/breadcrumb";
import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, PlusCircle, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Loading from "@/app/(dashboard)/loading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CustomPagination from "@/components/common/pagination";
import { loadBlogPost } from "@/app/_services/public/blog-post-service";

const BlogPage = () => {
    const {setBreadcrumbList} = useBreadcrumb();

    const [blogPosts, setBlogPosts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isPending, startTransition] = useTransition();


    useEffect(() => {
        setBreadcrumbList([
            {title: 'Home', link: '/'},
            {title: 'Blog', link: '/blog'},
            {title: 'Manage', link: '/blog'},
        ]);
    }, [setBreadcrumbList]);

    useEffect(() => {
        startTransition(async () => {
            const response = await loadBlogPost(currentPage, pageSize);
            setBlogPosts(response.data);
            setTotalCount(response.totalCount);
            setTotalPage(response.totalPage);
            setCurrentPage(response.currentPage);

            console.log(response.data);
        })
    }, [currentPage, pageSize]);

    return (
        <>
            <div className='w-full flex-col'>
                <div className='w-full my-5 p-5 border'>

                    <div className="flex justify-between mt-5">
                        <div>
                            <h1 className="text-5xl font-bold">Blog List</h1>
                        </div>
                        <div>
                            <Link href="./blog/form">
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
                                                <TableHead className='text-center'>Modified at</TableHead>
                                                <TableHead className='text-center'>Action</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {
                                                blogPosts.length ? (

                                                    blogPosts.map((data: any, index) => (
                                                        <TableRow key={data._id}>
                                                            <TableCell
                                                                className='border-r text-center'>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                                                            <TableCell className='border-r '>{data.title}</TableCell>
                                                            <TableCell className='border-r '>{data.updatedAt}</TableCell>

                                                            <TableCell>
                                                                <div className="flex justify-center gap-1">
                                                                    <Link href={`../blog/${data._id}`}><Button
                                                                        variant='default'
                                                                        size='sm'><Eye /></Button></Link>

                                                                    <Link href={`./blog/form/${data._id}`}><Button
                                                                        variant='default'
                                                                        size='sm'><span><Pencil /></span></Button></Link>
                                                                    <Link href={'#'}><Button
                                                                        variant='destructiveOutline'
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
}

export default BlogPage;