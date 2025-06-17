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
import {
    loadAcademicSubject
} from "@/app/_services/academy/academySubjectService";
import { useBreadcrumb } from "@/components/common/breadcrumb";
import { loadAcademicClass } from "@/app/_services/academy/academyClassService";
import { AdmissionCategoryUnitSchema } from "@/schemas/academy/admission-category-schema";
import { loadAdmissionCategory, upsertAdmissionCategoryUnit } from "@/app/_services/admission/admission-category-service";
import { MultiSelect } from "@/components/ui/multi-select";
import { Label } from "@/components/ui/label";

const AdmissionCategoryUnitCreatePage = () => {
    const params = useParams();
    const { setBreadcrumbList } = useBreadcrumb();

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [level, setLevel] = useState('all');
    const [classId, setClassId] = useState('');
    const [classes, setClasses] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);

    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        setBreadcrumbList([
            { title: 'Home', link: '/' },
            { title: 'Admission Category Unit', link: '/admission/category' },
            { title: 'Edit', link: '/admission/category' },
        ]);

    }, [setBreadcrumbList]);


    const form = useForm<z.infer<typeof AdmissionCategoryUnitSchema>>({
        resolver: zodResolver(AdmissionCategoryUnitSchema),
        defaultValues: {
            title: "",
            id: "",
            description: "",
            categoryId: "",
            segment: "ADMISSION",
            subjects: [],
            // order: 1,
        }
    });

    const { reset, setValue } = form;

    useEffect(() => {
        startTransition(async () => {
            const _classes = await loadAcademicClass(1, 100, level);
            setClasses(_classes.data);

            const _subjects = await loadAcademicSubject(1, 100, level, classId, 'ADMISSION');
            const _formattedSubjectList = _subjects.data.map((sub: any) => ({ value: sub._id, label: sub.title }));
            setSubjects(_formattedSubjectList);

            const _categories = await loadAdmissionCategory(1, 100, "ADMISSION");
            setCategories(_categories.data);

            // const _category = await getAdmissionCategory(params.categoryId);
            // reset(_category);

            // console.log(_category)


            // setClassId(_subject.classId);

            // const _class: any = _classes.data.find((m: { _id: string, level: string }) => m._id === _subject.classId);
            // if (_class) {
            //     setLevel(_class.level);
            // }
        });

    }, []);

    useEffect(() => {
        const _selectedSubjects = subjects
            .filter(subject => selectedSubjectIds.includes(subject.value))
            .map(({ value, label }) => ({ subjectId: value, title: label }));

        if (_selectedSubjects) {
            setValue('subjects', _selectedSubjects);
        }

    }, [selectedSubjectIds])


    useEffect(() => {
        startTransition(async () => {
            const response = await loadAcademicClass(1, 100, level);
            setClasses(response.data);
        })
    }, [level]);

    useEffect(() => {
        startTransition(async () => {
            const _subjects = await loadAcademicSubject(1, 100, level, classId, form.getValues('segment'));
            const _formattedSubjectList = _subjects.data.map((sub: any) => ({ value: sub._id, label: sub.title }));
            setSubjects(_formattedSubjectList);
        })
    }, [classId]);


    const onSubmit = async (values: z.infer<typeof AdmissionCategoryUnitSchema>) => {

        const normalizedValues = {
            ...values,
            // subjects: values.subjectId === "" || 'none' ? null : values.subjectId,
        }

        // console.log(normalizedValues);
        // return;

        startTransition(async () => {
            await upsertAdmissionCategoryUnit(normalizedValues).then(res => {
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

    const onInvalid = (err: any) => {
        console.error(err);
    }


    return (
        <>
            <div className="w-full my-5 p-5 border">

                <div className="flex justify-between">
                    <div>
                        <h1 className="text-5xl font-bold">Edit - Admission Category Unit</h1>
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
                        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className='space-y-4'>
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
                                        name="id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Unique Name Id</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter Id"
                                                        type="text"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-4 md:col-span-2 mt-2">
                                    <FormField
                                        control={form.control}
                                        name="categoryId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Select Category</FormLabel>
                                                <Select
                                                    name={field.name}
                                                    onValueChange={val => {
                                                        field.onChange(val);
                                                    }}
                                                    value={field.value}
                                                    disabled={isPending}
                                                >
                                                    <SelectTrigger className={'w-full'}>
                                                        <SelectValue
                                                            placeholder={"Select Category"}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            categories.map((item: { _id: string, title: string }) => (
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

                                <div className='col-span-4 md:col-span-2 mt-2'>
                                    <Label>Select Subjects</Label>
                                    <MultiSelect
                                        options={subjects}
                                        onValueChange={setSelectedSubjectIds}
                                        // defaultValue={selectedFrameworks}
                                        placeholder="Select Subject"
                                        variant="inverted"
                                        animation={2}
                                        maxCount={5}
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

export default AdmissionCategoryUnitCreatePage;