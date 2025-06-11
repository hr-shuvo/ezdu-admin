'use client'

import { useRouter } from "next/navigation";
import { useTransition } from "react";
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
import { AcademicInstituteType } from "@/utils/common";
import { Separator } from "@/components/ui/separator";
import { AcademyInstituteSchema } from "@/schemas/academy/academyQuestionBankSchema";
import { Textarea } from "@/components/ui/textarea";
import { upsertAcademyInstitute } from "@/app/_services/academy/academyInstituteService";

const AcademyInstituteCreatePage = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof AcademyInstituteSchema>>({
        resolver: zodResolver(AcademyInstituteSchema),
        defaultValues: {
            title: "",
            subTitle: "",
            type: "",
            description: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof AcademyInstituteSchema>) => {

        startTransition(async () => {
            await upsertAcademyInstitute(values).then(res => {
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


    return (
        <>
            <div className="w-full my-5 p-5 border">

                <div className="flex justify-between">
                    <div>
                        <h1 className="text-5xl font-bold">Create - Academy Institute</h1>
                    </div>
                    <div>
                        <Link href="./">
                            <Button size='sm' variant='sidebarOutline'>
                                <BiArrowBack/><span> Back</span>
                            </Button>
                        </Link>

                    </div>
                </div>

                <Separator className='my-5'/>

                <div className="w-full mt-5">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <div className="grid grid-cols-4 gap-4">

                                <div className='col-span-4 md:col-span-2'>
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({field}) => (
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
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                

                                <div className='col-span-4 md:col-span-2'>
                                    <FormField
                                        control={form.control}
                                        name="subTitle"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>subtitle</FormLabel>
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
                                </div>

                                <div className='col-span-4 md:col-span-2'>
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        placeholder="Enter Desctiption"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>


                                <div className='col-span-4 md:col-span-1'>
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Select Level *</FormLabel>
                                                <Select
                                                    name={field.name}
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    disabled={isPending}
                                                >
                                                    <SelectTrigger className={'w-full'}>
                                                        <SelectValue placeholder={"Select Level"}/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            AcademicInstituteType.map((item) => (
                                                                <SelectItem value={item.value}
                                                                            key={item.value}>{item.text}</SelectItem>
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
                                            onClick={() => router.push('./')}
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

export default AcademyInstituteCreatePage;