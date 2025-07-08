import { PaginatedList } from "@/app/utils/pagination";
import httpClient from "@/app/utils/httpClient";


export const loadBlogPost = async (
    page: number,
    size: number,
): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size,
        };

        const response = await httpClient.get<PaginatedList>("/blog", {
            params: params,
        });

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};


export const getBlogPost= async (id?: any): Promise<any> => {
    try {
        const response = await httpClient.get<any>(`/blog/${id}`);
        // console.log(response)

        return response.data;
    } catch (err: any) {
        // console.error(err.message);
        console.error(err);

        return null!;
    }
};

export const upsertBlog = async (model: any) => {
    try {
        const response = await httpClient.post(`/blog/upsert`, model);

        if (response.status === 201 || response.status === 200) {
            return { success: response.data };
        }
        return { error: response?.data?.msg };
    } catch (err: any) {
        // console.error(err.message);
        // console.error(err);

        return { error: err.response?.data?.msg };
    }
};