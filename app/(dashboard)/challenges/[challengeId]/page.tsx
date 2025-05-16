'use client';

import { getChallenge } from "@/app/_services/challenge-service";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import Loading from "../../modules/loading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { Pencil } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ChallengeDetailsPage = () => {
    const params = useParams();
    const [challenge, setChallenge] = useState<any>();

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            const challengeId = Array.isArray(params.challengeId) ? params.challengeId[0] : params.challengeId;
            const challenge = await getChallenge(challengeId);
            setChallenge(challenge);
        })
    }, [params.challengeId]);

    if (isPending) {
        return <Loading />
    }


    return (
        <div className="w-full flex-col">
            <div className="w-full my-5 p-5 border">

                <div className="flex justify-between">
                    <h1 className="text-4xl">Challenge Details</h1>
                    <div className="gap-2 flex">
                        <Link href={`../lessons/${challenge?.lessonId}`}>
                            <Button size='sm'> <IoArrowBack /> <span>Back</span></Button>
                        </Link>
                        <Link href={`../lessons/${challenge?.lessonId}/challenges/form/${challenge?._id}`}>
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
                                <Link href="/dashboard" className="text-blue-500 hover:underline">Units</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <Link href="/dashboard" className="text-blue-500 hover:underline">Lessons</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <Link href="/dashboard" className="text-blue-500 hover:underline">Challenges</Link>
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
                        <h1 className="text-4xl font-bold">{challenge?.question}</h1>
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
                        <h1 className="text-lg">Course List</h1>
                    </div>
                    <div>
                        <Link href={`./form/${challenge?._id}`}>
                            <Button variant='sidebarOutline' size='sm'> <Pencil /> <span>Edit</span></Button>
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
                                    <TableHead>Text</TableHead>
                                    <TableHead>Correct</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {
                                    challenge?.optionList?.length ? (

                                        challenge.optionList.map((option: any, index: number) => (
                                            <TableRow key={index}>
                                                <TableCell>{option.text}</TableCell>
                                                <TableCell>
                                                    {option.correct ?
                                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                                                            True
                                                        </span>
                                                        :
                                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
                                                            False
                                                        </span>
                                                    }
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



                </div>


            </div>

        </div>
    )
}


export default ChallengeDetailsPage;