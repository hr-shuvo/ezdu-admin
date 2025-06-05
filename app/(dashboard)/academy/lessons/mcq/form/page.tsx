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
import { upsertAcademyMcq } from "@/app/_services/academy/academyMcqService";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const AcademyMcqCreatePage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const lessonId = searchParams.get('lessonId');
    const subjectId = searchParams.get('subjectId');

    const form = useForm<z.infer<typeof AcademyMcqSchema>>({
        resolver: zodResolver(AcademyMcqSchema),
        defaultValues: {
            question: "",
            order: 1,
            optionList: [
                {text: "", correct: false},
                {text: "", correct: false},
            ]
        }
    });

    const { fields: optionFields, append, remove } = useFieldArray({
        control: form.control,
        name: "optionList"
    });

    const { reset, setValue } = form;

    useEffect(() => {
        setValue('lessonId', lessonId!);
        setValue('subjectId', subjectId!);
    }, []);


    const onSubmit = (values: z.infer<typeof AcademyMcqSchema>) => {
        // console.log('upsert mcq: ', values);

        startTransition(async () => {
            await upsertAcademyMcq(values).then(res => {
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
        console.error(err)

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
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-lg">Challenge Create</h1>
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
                        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className='space-y-4'>
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
                                            variant="outline"
                                            onClick={() => append({ text: "", correct: false })}
                                            disabled={isPending}
                                        >
                                            <Plus className="h-4 w-4 mr-2" /> Add Option
                                        </Button>


                                    </div>

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

export default AcademyMcqCreatePage;

