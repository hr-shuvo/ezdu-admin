'use client';

import Link from "next/link";
import { getLesson, upsertLesson } from "@/app/_services/lesson-service";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { LessonSchema } from "@/schemas/lessonSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiArrowBack } from "react-icons/bi";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import Loading from "../../../../../modules/loading";
import { toast } from "sonner";


const LessonEditPage = () => {
    const router = useRouter();
    const params = useParams();
    const [isPending, startTransition] = useTransition();
    const [unitId, setUnitId] = useState<string>();

    const form = useForm<z.infer<typeof LessonSchema>>({
        resolver: zodResolver(LessonSchema),
        defaultValues: {
            title: "",
            // description: "",
            order: 1,

            unitId: undefined
        }

    });
    const {setValue, reset} = form;


    useEffect(() => {
        const _unitId = Array.isArray(params.unitId) ? params.unitId[0] : params.unitId;
        setUnitId(_unitId);

        if (unitId) {
            setValue('unitId', unitId);
        }

        const lessonId = Array.isArray(params.lessonId) ? params.lessonId[0] : params.lessonId;

        startTransition(async () => {
            const _lesson = await getLesson(lessonId);
            reset(_lesson);
        });
    }, [unitId, setValue]);

    const onSubmit = async (values: z.infer<typeof LessonSchema>) => {
        startTransition(async () => {
            await upsertLesson(values).then(res => {
                if (res.success) {
                    toast.success(res.success, {
                        duration: 5000,
                        style: {
                            background: 'green',
                            color: 'white'
                        }
                    });

                    // router.push(`/courses/${courseId}`);
                } else {
                    console.error("Error while creating course", res.error);
                    toast.error(res.error, {
                        duration: 5000,
                        style: {
                            background: 'red',
                            color: 'white'
                        }
                    });
                }
            });
        });
    }


    if (isPending) {
        return <Loading/>
    }

    return (
        <>
            <div className="w-full my-5 p-5 border">

                <div className="my-5">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <Link href="/" className="text-blue-500 hover:underline">Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <Link href="/" className="text-blue-500 hover:underline">Dashboard</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <Link href="../.." className="text-blue-500 hover:underline">Modules</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Edit</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className="flex justify-between">
                    <div>
                        <h1 className="text-lg">Lesson Edit</h1>
                    </div>
                    <div>
                        <Link href="../..">
                            <Button size='sm' variant='sidebarOutline'>
                                <BiArrowBack/><span> Back</span>
                            </Button>
                        </Link>

                    </div>
                </div>

                <div className="w-full">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter title"
                                                    type="text"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/*<FormField*/}
                                {/*    control={form.control}*/}
                                {/*    name="description"*/}
                                {/*    render={({field}) => (*/}
                                {/*        <FormItem>*/}
                                {/*            <FormLabel>Description</FormLabel>*/}
                                {/*            <FormControl>*/}
                                {/*                <Input*/}
                                {/*                    {...field}*/}
                                {/*                    placeholder="Enter subtitle"*/}
                                {/*                    type="text"*/}
                                {/*                    disabled={isPending}*/}
                                {/*                />*/}
                                {/*            </FormControl>*/}
                                {/*            <FormMessage/>*/}
                                {/*        </FormItem>*/}
                                {/*    )}*/}
                                {/*/>*/}

                                <FormField
                                    control={form.control}
                                    name="order"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Order</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="order"
                                                    type="number"
                                                    disabled={isPending}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />


                                <div className="col-span-2 mt-5 flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        className="w-3/6"
                                        variant="super"
                                        disabled={isPending}
                                        onClick={() => router.push('../../')}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="w-3/6"
                                        variant="secondary"
                                        disabled={isPending}
                                    >
                                        Update
                                    </Button>
                                </div>


                            </div>

                        </form>

                    </Form>
                </div>


            </div>
        </>
    )
}

export default LessonEditPage;