"use client";

import { getChallenge } from "@/app/_services/challenge-service";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChallengeSchema } from "@/schemas/challengeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ChallengeEditPage = () => {
    const params = useParams();

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ChallengeSchema>>({
        resolver: zodResolver(ChallengeSchema),
        defaultValues: {
            question: "",
            type:'',
            _id: ""
        }
    });

    const { fields:optionFields, append, remove } = useFieldArray({
        control: form.control,
        name: "optionList"
    });

    const { reset } = form;

    useEffect(() => {
        startTransition(async () => {
            async function loadData() {
                const challenge = await getChallenge(params.challengeId);
                reset(challenge);

                console.log(challenge)
            }

            loadData();
        });

    }, [params.challengeId, reset]);





    const onSubmit = () => {
        console.log(form.getValues())
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
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <Link href="/" className="text-blue-500 hover:underline">Dashboard</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <Link href="./" className="text-blue-500 hover:underline">Challenges</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Create</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className="flex justify-between">
                    <div>
                        <h1 className="text-lg">Challenge Create</h1>
                    </div>
                    <div>
                        <Link href="../..">
                            <Button size='sm' variant='sidebarOutline'>
                                <BiArrowBack /><span> Back</span>
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
                                    name="question"
                                    render={({ field }) => (
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
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type - Select | Assist</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                disabled={isPending}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder={"Select Type"}/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value={"SELECT"}>SELECT</SelectItem>
                                                    <SelectItem value={"ASSIST"}>ASSIST</SelectItem>

                                                </SelectContent>

                                            </Select>

                                        </FormItem>
                                    )}
                                />

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
                                                                    onCheckedChange={(checked:boolean) => field.onChange(checked)}
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



                                <div className="col-span-2 mt-5 flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        className="w-3/6"
                                        variant="super"
                                        disabled={isPending}
                                        onClick={() => router.push('../..')}
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

export default ChallengeEditPage;

