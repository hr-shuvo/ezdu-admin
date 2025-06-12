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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AcademicClassLevelType } from "@/utils/common";
import { Separator } from "@/components/ui/separator";
import { AcademySubjectSchema } from "@/schemas/academy/academySubjectSchema";
import {
    getAcademySubject,
    loadAcademicSubject,
    upsertAcademySubject
} from "@/app/_services/academy/academySubjectService";
import { useBreadcrumb } from "@/components/common/breadcrumb";
import { loadAcademicClass } from "@/app/_services/academy/academyClassService";
import { AcademyModelTestSchema } from "@/schemas/academy/academyQuestionBankSchema";
import { getAcademyModelTest, loadAcademicInstitute, upsertAcademyModelTest } from "@/app/_services/academy/academyInstituteService";
import { Textarea } from "@/components/ui/textarea";

const AcademyModelTestEditPage = () => {
    const params = useParams();
    const { setBreadcrumbList } = useBreadcrumb();

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [level, setLevel] = useState('all');
    const [classId, setClassId] = useState('');
    const [classes, setClasses] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [institutes, setInstitutes] = useState<any[]>([]);

    useEffect(() => {
        setBreadcrumbList([
            { title: 'Home', link: '/' },
            { title: 'Model Test', link: '/academy/model-test' },
            { title: 'Edit', link: '/academy/model-test' },
        ]);

    }, [setBreadcrumbList]);

    const form = useForm<z.infer<typeof AcademyModelTestSchema>>({
        resolver: zodResolver(AcademyModelTestSchema),
        defaultValues: {
            title: "",
            subTitle: "",
            subjectId: "",
            instituteId: "",
            // order: 1,
        }
    });

    const { reset } = form;

    useEffect(() => {
        startTransition(async () => {
            const _institutes = await loadAcademicInstitute(1, 1000);
            setInstitutes(_institutes.data);

            const _classes = await loadAcademicClass(1, 100, level);
            setClasses(_classes.data);

            const _subjects = await loadAcademicSubject(1, 100, level, classId);
            setSubjects(_subjects.data.filter((s: any) => s._id !== params.subjectId));

            const _modelTest = await getAcademyModelTest(params.modelTestId);
            reset(_modelTest);

            if (_modelTest.subjectId) {
                const _subject = await getAcademySubject(_modelTest.subjectId);
                setClassId(_subject.classId);

                const _class: any = _classes.data.find((m: { _id: string, level: string }) => m._id === _subject.classId);
                if (_class) {
                    setLevel(_class.level);
                }
            }



        });

    }, [params.modelTestId, reset]);

    useEffect(() => {
        startTransition(async () => {
            const response = await loadAcademicClass(1, 100, level);
            setClasses(response.data);
        })
    }, [level]);

    useEffect(() => {
        startTransition(async () => {
            const _subjects = await loadAcademicSubject(1, 100, level, classId);
            setSubjects(_subjects.data.filter((s: any) => s._id !== params.subjectId));
        })
    }, [classId]);


    const onSubmit = async (values: z.infer<typeof AcademyModelTestSchema>) => {

        const normalizedValues = {
            ...values,
            subjectId: values.subjectId === "" || values.subjectId === 'none' ? null : values.subjectId,
        }

        console.log(normalizedValues);

        startTransition(async () => {
            await upsertAcademyModelTest(normalizedValues).then(res => {
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
                    console.error("Error while creating model test", res.error);
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

                <div className="flex justify-between">
                    <div>
                        <h1 className="text-5xl font-bold">Edit - Academy Subject</h1>
                    </div>
                    <div>
                        <Link href="../">
                            <Button size='sm' variant='sidebarOutline'>
                                <BiArrowBack /><span> Back</span>
                            </Button>
                        </Link>

                    </div>
                </div>

                <Separator className='my-5' />

                <div className="w-full mt-5">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                                                    <Textarea
                                                        {...field}
                                                        placeholder="Enter description"
                                                        disabled={isPending}
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
                                                            key={item._id}>{item.title}</SelectItem>
                                                    ))
                                                }

                                            </SelectContent>

                                        </Select>

                                    </FormItem>

                                </div>

                                <div className='col-span-4 md:col-span-1 mt-2'>
                                    <FormField
                                        control={form.control}
                                        name="subjectId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Select Subject</FormLabel>
                                                <Select
                                                    name={field.name}
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    disabled={isPending}
                                                >
                                                    <SelectTrigger className={'w-full'}>
                                                        <SelectValue
                                                            placeholder={"Select Subject"}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={'none'}>None</SelectItem>
                                                        {
                                                            subjects.map((item: { _id: string, title: string }) => (
                                                                <SelectItem value={item._id}
                                                                    key={item._id}>{item.title}</SelectItem>
                                                            ))
                                                        }

                                                    </SelectContent>

                                                </Select>

                                            </FormItem>
                                        )}
                                    />

                                </div>

                                <div className='col-span-4 md:col-span-1 mt-2'>
                                    <FormField
                                        control={form.control}
                                        name="instituteId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Select Institute</FormLabel>
                                                <Select
                                                    name={field.name}
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    disabled={isPending}
                                                >
                                                    <SelectTrigger className={'w-full'}>
                                                        <SelectValue
                                                            placeholder={"Select Institute"}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={'none'}>None</SelectItem>
                                                        {
                                                            institutes.map((item: { _id: string, title: string, subTitle: string }) => (
                                                                <SelectItem value={item._id}
                                                                    key={item._id}>{item.subTitle} - {item.title}</SelectItem>
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
                                            Update
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

export default AcademyModelTestEditPage;