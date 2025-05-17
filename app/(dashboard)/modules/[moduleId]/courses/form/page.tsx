"use client";


import * as z from "zod";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CourseSchema} from "@/schemas/courseSchema";
import {toast} from "sonner";
import {upsertCourse} from "@/app/_services/course-services";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {BiArrowBack} from "react-icons/bi";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

const CourseCreatePage = () => {
    const router = useRouter();
    const params = useParams();
    const [isPending, startTransition] = useTransition();
    const [moduleId, setModuleId] = useState<string>();

    const form = useForm<z.infer<typeof CourseSchema>>({
        resolver: zodResolver(CourseSchema),
        defaultValues: {
            title: "",
            subTitle: "",
            imageSrc: "/globe.svg",
            moduleId: undefined,
        }
    });

    const {setValue} = form;

    useEffect(() => {
        const _moduleId = Array.isArray(params.moduleId) ? params.moduleId[0] : params.moduleId;
        setModuleId(_moduleId);

        if (moduleId) {
            setValue('moduleId', moduleId);
        }
    }, [moduleId, setValue]);


    const onSubmit = async (values: z.infer<typeof CourseSchema>) => {

        startTransition(async () => {
            await upsertCourse(values).then(res => {
                if (res.success) {
                    toast.success(res.success, {
                        duration: 5000,
                        style: {
                            background: 'green',
                            color: 'white'
                        }
                    });

                    router.push(`/modules/${moduleId}`);
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
                                <Link href="/dashboard" className="text-blue-500 hover:underline">Dashboard</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <Link href="./" className="text-blue-500 hover:underline">Modules</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Create</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className="flex justify-between">
                    <div>
                        <h1 className="text-lg">Course Create</h1>
                    </div>
                    <div>
                        <Link href="../">
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

                                <FormField
                                    control={form.control}
                                    name="subTitle"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>SubTitle</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter subtitle"
                                                    type="text"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="imageSrc"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Image Src</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter Image Path / Name"
                                                    type="text"
                                                    disabled={isPending}
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
                                        onClick={() => router.push('../')}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="w-3/6"
                                        variant="secondary"
                                        disabled={isPending}
                                    >
                                        Create
                                    </Button>
                                </div>


                            </div>

                        </form>

                    </Form>
                </div>


            </div>
        </>
    )

};


export default CourseCreatePage;