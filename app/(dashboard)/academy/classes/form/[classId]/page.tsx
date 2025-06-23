'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BiArrowBack } from "react-icons/bi";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AcademyClassSchema } from "@/schemas/academy/academyClassSchema";
import { getAcademyClass, upsertAcademyClass } from "@/app/_services/academy/academyClassService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AcademicClassLevelType, AcademyGroupType, AcademySegmentType } from "@/utils/common";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

const AcademyClassEditPage = () => {
    const params = useParams();

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // const [showGroup, setShowGroup] = useState(false);

    const form = useForm<z.infer<typeof AcademyClassSchema>>({
        resolver: zodResolver(AcademyClassSchema),
        defaultValues: {
            id: "",
            title: "",
            level: "",
            // order: 1,
            version: "BN",
            segment: "JUNIOR"
        }
    });

    const { reset } = form;

    useEffect(() => {
        startTransition(async () => {
            async function loadData() {
                const result = await getAcademyClass(params.classId);
                reset(result);
                // console.log(result);
            }

            loadData();
        });

    }, [params.challengeId, reset]);

    const onSubmit = async (values: z.infer<typeof AcademyClassSchema>) => {

        console.log(values);

        startTransition(async () => {
            await upsertAcademyClass(values).then(res => {
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


    const handleSegmentChange = (val: string) => {
        // console.log(val)
        // setShowGroup(val === 'SSC' || val === 'HSC')
    }

    return (
        <>
            <div className="w-full my-5 p-5 border">

                <div className="flex justify-between">
                    <div>
                        <h1 className="text-5xl font-bold">Edit - Academy Class</h1>
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
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <div className="grid grid-cols-4 gap-4">

                                <div className='col-span-4 md:col-span-2'>
                                    <FormField
                                        control={form.control}
                                        name="id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Unique name *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter unique id"
                                                        type="text"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='col-span-4 md:col-span-2'>
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

                                <div className='col-span-4 md:col-span-1'>
                                    <FormField
                                        control={form.control}
                                        name="level"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Select Level *</FormLabel>
                                                <Select
                                                    name={field.name}
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    disabled={isPending}
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
                                        )}
                                    />

                                </div>

                                <div className='col-span-4 md:col-span-1'>
                                    <FormField
                                        control={form.control}
                                        name="version"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Select Version</FormLabel>
                                                <Select
                                                    name={field.name}
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    disabled={isPending}
                                                >
                                                    <SelectTrigger className={'w-full'}>
                                                        <SelectValue placeholder={"Select Version"} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={"BN"}>Bangla</SelectItem>
                                                        <SelectItem value={"EN"}>English</SelectItem>

                                                    </SelectContent>

                                                </Select>

                                            </FormItem>
                                        )}
                                    />
                                </div>


                                <div className='col-span-4 md:col-span-1'>
                                    <FormField
                                        control={form.control}
                                        name="segment"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Select Segment *</FormLabel>
                                                <Select
                                                    name={field.name}
                                                    onValueChange={(val) => {
                                                        field.onChange(val)
                                                        handleSegmentChange(val)
                                                    }}
                                                    value={field.value}
                                                    disabled={isPending}
                                                >
                                                    <SelectTrigger className={'w-full'}>
                                                        <SelectValue placeholder={"Select Level"} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            AcademySegmentType.map((item) => (
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


                                <div className="col-span-4 md:col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="groups"
                                        defaultValue={[]}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Select Groups</FormLabel>
                                                <div className="flex justify-between items-center gap-2">
                                                    {AcademyGroupType.map((group) => (
                                                        <FormItem key={group.value} className="flex items-center space-x-2 border p-2 cursor-pointer w-1/3">
                                                            <Checkbox
                                                                id={group.value}
                                                                checked={field.value?.includes(group.value)}
                                                                onCheckedChange={(checked) => {
                                                                    const newValue = checked
                                                                        ? [...(field.value || []), group.value]
                                                                        : (field.value || []).filter((v) => v !== group.value);
                                                                    field.onChange(newValue);
                                                                }}
                                                            />
                                                            <label htmlFor={group.value} className="text-sm cursor-pointer w-full">
                                                                {group.text}
                                                            </label>
                                                        </FormItem>
                                                    ))}
                                                </div>
                                                <FormMessage />
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

export default AcademyClassEditPage;