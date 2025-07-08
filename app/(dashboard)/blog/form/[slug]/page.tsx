'use client';

import { useBreadcrumb } from "@/components/common/breadcrumb";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { BlogSchema } from "@/schemas/public/blogSchema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { getBlogPost, upsertBlog } from "@/app/_services/public/blog-post-service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BiArrowBack } from "react-icons/bi";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/rich-text-image-editor";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BlogPostType } from "@/utils/common";
import { Textarea } from "@/components/ui/textarea";


const BlogEditPage = () => {
    const { setBreadcrumbList } = useBreadcrumb();
    const router = useRouter();
    const params = useParams();
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
            subTitle: "",
            slug: "",
            content: "",
            published: false,
            metaDescription: "",
            coverImage: "",
            tags: [],
            type: "REGULAR", // default type
            // omit type to let schema default handle it
        },
    });

    const { reset } = form;

    useEffect(() => {
        if (params.slug) {
            // Load the blog post data here using params.slug
            // For example, you can fetch the blog post data from an API
            // and then set the form values using reset
            getBlogPost(params.slug).then(blogPost => {
                console.log(blogPost);
                reset(blogPost);
            });
        }
    }, [params.slug, reset]);


    const onSubmit = async (values: z.infer<typeof BlogSchema>) => {

        const file = form.getValues('coverImage');
        if (file && file.size > 500000) { // 1024 * 500 = 500000 bytes (500 KB)
            toast.error('Image size too large');
            return null;
        }

        const formData = new FormData();
        formData.append("_id", values._id || '');
        formData.append('title', values.title);
        formData.append('subTitle', values.subTitle || '');
        formData.append('slug', values.slug);
        formData.append('content', values.content);
        formData.append('published', values.published ? 'true' : 'false');
        formData.append('metaDescription', values.metaDescription || '');
        formData.append('coverImage', file || '');
        formData.append('tags', JSON.stringify(values.tags || []));
        formData.append('type', values.type || '');

        startTransition(async () => {
            await upsertBlog(formData).then(res => {
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
                                        name="subTitle"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subtitle</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter subtitle"
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
                                                <FormLabel>Content</FormLabel>
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

                                <div className="col-span-2">
                                    <FormLabel>
                                        <Label className="my-2 text-2xl">Cover Image</Label>
                                    </FormLabel>

                                    <FormField
                                        control={form.control}
                                        name="coverImage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>max size 500 kb</FormLabel>
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

                                </div>


                                <div className='col-span-4 md:col-span-1 mt-2'>
                                    <FormField
                                        control={form.control}
                                        name="published"
                                        render={({ field }) => (
                                            <FormItem className="">
                                                <FormLabel>Published</FormLabel>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        disabled={isPending}
                                                        className='mt-2 scale-200 cursor-pointer data-[state=checked]:bg-green-500'
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='col-span-4 md:col-span-1'>
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Select Blog Type</FormLabel>
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
                                                            BlogPostType.map((item) => (
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

                                <div className='col-span-4 md:col-span-4 mt-2'>
                                    <FormField
                                        control={form.control}
                                        name="metaDescription"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Meta Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        placeholder="Enter Description"
                                                        disabled={isPending}
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

export default BlogEditPage;