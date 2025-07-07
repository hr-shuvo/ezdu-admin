'use client';

import { useBreadcrumb } from "@/components/common/breadcrumb";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { BlogSchema } from "@/schemas/public/blogSchema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { upsertBlog } from "@/app/_services/public/blog-post-service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BiArrowBack } from "react-icons/bi";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/rich-text-image-editor";
const BlogCreatePage = () => {
    const { setBreadcrumbList } = useBreadcrumb();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setBreadcrumbList([
            { title: 'Home', link: '/' },
            { title: 'Blog', link: '/blog' },
            { title: 'Create', link: '/blog/form' },
        ]);

    }, [setBreadcrumbList]);

    const form = useForm<z.infer<typeof BlogSchema>>({
        resolver: zodResolver(BlogSchema),
        defaultValues: {
            title: "",
            slug: "",
            content: "",
            published: false,
            metaDescription: "",
            coverImage: "",
            tags: [],
            // omit type to let schema default handle it
        },
    });


    const onSubmit = async (values: z.infer<typeof BlogSchema>) => {

        const normalizedValues = {
            ...values,
            // lessonId: values.lessonId === "" || 'none' ? null : values.lessonId,
        }

        console.log(normalizedValues);
        return;

        startTransition(async () => {
            await upsertBlog(normalizedValues).then(res => {
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
                        <h1 className="text-5xl font-bold">Add - Blog Post</h1>
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
                                        name="slug"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Slug *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter slug (unique identifier)"
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
                                        name="content"
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

export default BlogCreatePage;