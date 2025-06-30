"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import * as z from "zod";
import { AcademyMcqSchema } from "@/schemas/academy/academyMcqSchema";
import { getAcademyMcq, upsertAcademyMcq } from "@/app/_services/academy/academyMcqService";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import { Separator } from "@/components/ui/separator";
import { getAcademyModelTest, loadAcademicInstitute } from "@/app/_services/academy/academyInstituteService";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const AcademyMcqEditPage = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [modelTestId, setModelTestId] = useState(searchParams.get('modelTestId'));
    const [modelTest, setModelTest] = useState<any>();

    const [imageUrl, setImageUrl] = useState();

    const [instituteYearList, setInstituteYearList] = useState<{ instituteId: string; title: string; year: number | null }[]>([]);


    const form = useForm<z.infer<typeof AcademyMcqSchema>>({
        resolver: zodResolver(AcademyMcqSchema),
        defaultValues: {
            question: "",
            _id: ""
        }
    });

    const { fields: optionFields, append, remove } = useFieldArray({
        control: form.control,
        name: "optionList"
    });


    useEffect(() => {
        // setValue('lessonId', lessonId!);
        // setValue('subjectId', subjectId!);
        if (modelTestId) {
            startTransition(async () => {
                const _modelTest = await getAcademyModelTest(modelTestId);
                // console.log(_modelTest);
                // if(!_modelTest){
                //     router.push('.');
                // }
                setModelTest(_modelTest);

                setValue('subjectId', _modelTest.subjectId);

                setInstituteYearList([{
                    instituteId: _modelTest.instituteId,
                    title: _modelTest.institute.title,
                    year: _modelTest.year
                }])
            })

        }

    }, [modelTestId]);

    // useEffect(() => {
    //     // console.log(instituteYearList)
    //     setValue("instituteIds", instituteYearList);

    // }, [instituteYearList])


    const { reset, setValue } = form;

    useEffect(() => {
        startTransition(async () => {
            async function loadData() {
                const _mcq = await getAcademyMcq(params.mcqId);
                reset(_mcq);
                setImageUrl(_mcq.imageUrl)
                // console.log(_mcq)
            }

            loadData();
        });

    }, [params.mcqId, reset]);


    const onSubmit = (values: z.infer<typeof AcademyMcqSchema>) => {
        // console.log('upsert mcq: ', values);

        const file = form.getValues('imageData');
        if (file && file.size > 50000) {
            toast.error('Image size too large');
            return null;
        }

        // need to send form data because of image
        const formData = new FormData();

        formData.append("question", values.question);
        if (values._id) formData.append("_id", values._id);
        if (values.order !== undefined) formData.append("order", values.order.toString());
        formData.append("subjectId", values.subjectId);
        // formData.append("lessonId", values.lessonId!);
        if (values.description) formData.append("description", values.description);
        if (values.passage) formData.append("passage", values.passage);
        if (file) formData.append("imageData", file);
        formData.append('optionList', JSON.stringify(values.optionList))
        if (instituteYearList && instituteYearList.length > 0) formData.append("instituteIds", JSON.stringify(instituteYearList));

        // console.log(formData.get('instituteIds'));
        // return;

        startTransition(async () => {
            await upsertAcademyMcq(formData).then(res => {
                if (res.success) {
                    toast.success(res.success, {
                        duration: 5000,
                        style: {
                            background: 'green',
                            color: 'white'
                        }
                    });

                    // router.push(`/modules/${moduleId}`);
                }
                else {
                    toast.error('Something went wrong', {
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
        let msg = "Please add some option";

        if (err && err.optionList && err.optionList.message) {
            msg = err.optionList.message;
        } else if (err && err.optionList && err.optionList.root && err.optionList.root.message) {
            msg = err.optionList.root.message;
        }
        else if (err && err.optionList && Array.isArray(err.optionList) && err.optionList.length > 0) {
            msg = err.optionList[0].text.message;
        }

        toast.error(msg, {
            duration: 5000,
            style: {
                background: 'red',
                color: 'white'
            }
        });
    }


    return (
        <>
            <div className="w-full my-5 p-5 border">



                <div className="grid grid-cols-1 space-2 ">
                    <div>
                        <h1 className="text-lg">{modelTest?.title}</h1>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <div>
                            Board: {modelTest?.institute?.title}
                        </div>

                        <div>
                            Subject: {modelTest?.subject?.title}
                        </div>

                        <div>
                            Year: {modelTest?.year}
                        </div>

                    </div>
                </div>

                <Separator className="my-2" />



                <div className="flex justify-between mt-5">
                    <div>
                        <h1 className="text-lg">MCQ Update</h1>
                    </div>
                    <div>
                        <Link href="..">
                            <Button size='sm' variant='sidebarOutline'>
                                <BiArrowBack /><span> Back</span>
                            </Button>
                        </Link>

                    </div>
                </div>

                <div className="w-full">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
                            className='space-y-4'
                            encType="multipart/form-data"
                        >
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

                                <div className="md:col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="question"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Question</FormLabel>
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

                                <div className="col-span-4">
                                    <FormField
                                        control={form.control}
                                        name="passage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Passage</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        placeholder="Enter Passage"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-4">
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        placeholder="Enter title"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>


                                <div className="col-span-2">
                                    <FormLabel>
                                        <h1 className="my-2 text-2xl">Options</h1>
                                    </FormLabel>
                                    <div className="space-y-2">
                                        {optionFields.map((option, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`optionList.${index}.text`}
                                                    render={({ field }) => (
                                                        <FormItem className="w-full">
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    placeholder={`Option ${index + 1}`}
                                                                    type="text"
                                                                    disabled={isPending}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name={`optionList.${index}.correct`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex items-center gap-2 p-1">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={(checked: boolean) => field.onChange(checked)}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="">Correct</FormLabel>
                                                        </FormItem>
                                                    )}
                                                />

                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    disabled={optionFields.length <= 2 || isPending}
                                                    onClick={() => remove(index)}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>

                                            </div>
                                        ))}

                                        <Button
                                            type="button"
                                            variant="default"
                                            onClick={() => append({ text: "", correct: false })}
                                            disabled={isPending}
                                        >
                                            <Plus className="h-4 w-4 mr-2" /> Add Option
                                        </Button>


                                    </div>

                                </div>

                                <div className="col-span-2">
                                    <FormLabel>
                                        <Label className="my-2 text-2xl">Image</Label>
                                    </FormLabel>

                                    <FormField
                                        control={form.control}
                                        name="imageData"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>max size 200 kb</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        className="w-full cursor-pointer bg-muted file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white hover:file:bg-primary/80"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0] ?? null;
                                                            field.onChange(file);
                                                        }}
                                                        onBlur={field.onBlur}
                                                        ref={field.ref}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {
                                        imageUrl && (
                                            <>
                                                <Image
                                                    src={imageUrl || "noimage"}
                                                    alt="question image"
                                                    height={100}
                                                    width={120}
                                                    className="mt-2 rounded-md border p-2 w-fit"
                                                />

                                            </>
                                        )
                                    }

                                </div>


                                <div className="col-span-4">
                                    <Separator orientation='horizontal' className="h-[5px] w-full" />
                                </div>


                                <div className="col-span-4 mt-5">
                                    <div className="flex flex-col sm:flex-row justify-end gap-2">
                                        <Button
                                            type="button"
                                            className="w-full"
                                            variant="super"
                                            disabled={isPending}
                                            onClick={() => router.push('..')}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="w-full"
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

export default AcademyMcqEditPage;

