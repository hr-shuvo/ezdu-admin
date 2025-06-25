'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BiArrowBack } from "react-icons/bi";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AcademicClassLevelType } from "@/utils/common";
import { Separator } from "@/components/ui/separator";
import {
    loadAcademicSubject
} from "@/app/_services/academy/academySubjectService";
import { useBreadcrumb } from "@/components/common/breadcrumb";
import { loadAcademicClass } from "@/app/_services/academy/academyClassService";
import {
    loadAcademicLesson} from "@/app/_services/academy/academyLessonService";
import { AcademyLessonContentSchema } from "@/schemas/academy/academyLessonContentSchema";
import { upsertAcademyLessonContent } from "@/app/_services/academy/academyLessonContentService";
import { RichTextEditor } from "@/components/rich-text-editor";

const AcademyLessonCreatePage = () => {
    // const params = useParams();
    const { setBreadcrumbList } = useBreadcrumb();

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [level, setLevel] = useState('all');
    const [classId, setClassId] = useState('');
    const [classes, setClasses] = useState<any[]>([]);
    const [subjectId, setSubjectId] = useState('');
    const [subjects, setSubjects] = useState<any[]>([]);
    // const [lessonId, setLessonId] = useState('');
    const [lessons, setLessons] = useState<any[]>([]);

    useEffect(() => {
        setBreadcrumbList([
            { title: 'Home', link: '/' },
            { title: 'Lessons', link: '/academy/subjects' },
            { title: 'Edit', link: '/academy/subjects' },
        ]);

    }, [setBreadcrumbList]);

    const form = useForm<z.infer<typeof AcademyLessonContentSchema>>({
        resolver: zodResolver(AcademyLessonContentSchema),
        defaultValues: {
            title: "",
            subTitle: "",
            description: "",
            text1: "",
            text2: "",
            text3: "",
            text4: "",
            text5: "",
            lessonId: undefined,
            // order: 1,
        }
    });

    useEffect(() => {
        startTransition(async () => {
            const response = await loadAcademicClass(1, 100, level);
            setClasses(response.data);
        })
    }, [level]);

    useEffect(() => {
        startTransition(async () => {
            const _subjects = await loadAcademicSubject(1, 100, level, classId);
            setSubjects(_subjects.data);
        })
    }, [classId]);

    useEffect(() => {
        startTransition(async () => {
            const _lessons = await loadAcademicLesson(1, 100, subjectId);
            setLessons(_lessons.data);
        })
    }, [subjectId]);


    const onSubmit = async (values: z.infer<typeof AcademyLessonContentSchema>) => {

        const normalizedValues = {
            ...values,
            // lessonId: values.lessonId === "" || 'none' ? null : values.lessonId,
        }

        console.log(normalizedValues);

        startTransition(async () => {
            await upsertAcademyLessonContent(normalizedValues).then(res => {
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
    };

    const onError = (err: any) => {
        console.error(err)

    }


    return (
        <>
            <div className="w-full my-5 p-5 border">

                <div className="flex justify-between">
                    <div>
                        <h1 className="text-5xl font-bold">Add - Academy Lesson Content</h1>
                    </div>
                    <div>
                        <Link href="./">
                            <Button size='sm' variant='sidebarOutline'>
                                <BiArrowBack /><span> Back</span>
                            </Button>
                        </Link>

                    </div>
                </div>

                <Separator className='my-5' />

                <div className="w-full mt-5">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit, onError)} className='space-y-4'>
                            <div className="grid grid-cols-4 gap-4">

                                <div className='col-span-4 md:col-span-2 mt-2'>
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter title"
                                                        type="text"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='col-span-4 md:col-span-2 mt-2'>
                                    <FormField
                                        control={form.control}
                                        name="subTitle"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subtitle</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter title"
                                                        type="text"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='col-span-4 md:col-span-4 mt-2'>
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <RichTextEditor
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='col-span-4 md:col-span-1 mt-2'>
                                    <FormItem>
                                        <FormLabel>Select Level</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            value={level}
                                            onValueChange={(level) => setLevel(level)}
                                        >
                                            <SelectTrigger className={'w-full'}>
                                                <SelectValue placeholder={"Select Level"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    AcademicClassLevelType.map((item) => (
                                                        <SelectItem value={item.value}
                                                            key={item.value}>{item.text}</SelectItem>
                                                    ))
                                                }

                                            </SelectContent>

                                        </Select>

                                    </FormItem>


                                </div>

                                <div className='col-span-4 md:col-span-1 mt-2'>
                                    <FormItem>
                                        <FormLabel>Select Class</FormLabel>
                                        <Select
                                            onValueChange={val => {
                                                setClassId(val)
                                            }}
                                            value={classId}
                                            disabled={isPending}
                                        >
                                            <SelectTrigger className={'w-full'}>
                                                <SelectValue
                                                    placeholder={"Select Level"}
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    classes.map((item: { _id: string, title: string }) => (
                                                        <SelectItem value={item._id}
                                                            key={item._id}>{item?.title}</SelectItem>
                                                    ))
                                                }

                                            </SelectContent>

                                        </Select>

                                    </FormItem>

                                </div>

                                <div className='col-span-4 md:col-span-1 mt-2'>
                                    <FormItem>
                                        <FormLabel>Select Subject</FormLabel>
                                        <Select
                                            onValueChange={val => {
                                                setSubjectId(val)
                                            }}
                                            value={subjectId}
                                            disabled={isPending}
                                        >
                                            <SelectTrigger className={'w-full'}>
                                                <SelectValue
                                                    placeholder={"Select Subject"}
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    subjects.map((item: { _id: string, title: string }) => (
                                                        <SelectItem value={item._id}
                                                            key={item._id}>{item?.title}</SelectItem>
                                                    ))
                                                }

                                            </SelectContent>

                                        </Select>

                                    </FormItem>

                                </div>

                                <div className='col-span-4 md:col-span-1 mt-2'>
                                    <FormField
                                        control={form.control}
                                        name="lessonId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Select Lesson</FormLabel>
                                                <Select
                                                    name={field.name}
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    disabled={isPending}
                                                >
                                                    <SelectTrigger className={'w-full'}>
                                                        <SelectValue
                                                            placeholder={"Select Lesson"}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={'none'}>None</SelectItem>
                                                        {
                                                            lessons.map((item: { _id: string, title: string }) => (
                                                                <SelectItem value={item._id}
                                                                    key={item._id}>{item?.title}</SelectItem>
                                                            ))
                                                        }

                                                    </SelectContent>

                                                </Select>

                                            </FormItem>
                                        )}
                                    />

                                </div>

                                <div className='col-span-2'>
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

                            </div>

                        </form>

                    </Form>
                </div>


            </div>
        </>
    )

}

export default AcademyLessonCreatePage;