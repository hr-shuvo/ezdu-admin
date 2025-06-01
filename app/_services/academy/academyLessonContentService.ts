import { PaginatedList } from "@/app/utils/pagination";
import httpClient from "@/app/utils/httpClient";



export const loadAcademicLessonContent = async (page: number, size: number, lessonId?: string): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size
        };

        if (lessonId) {
            params.lessonId = lessonId;
        }

        console.log(params)

        const response = await httpClient.get<PaginatedList>("/academy/c", {params: params});

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};

export const getAcademyLessonContent = async (id?: any): Promise<any> => {
    try {
        const response = await httpClient.get<any>(`/academy/c/${id}`);
        // console.log(response)

        return response.data;
    } catch (err: any) {
        // console.error(err.message);
        console.error(err);

        return null!;
    }
};

export const upsertAcademyLessonContent = async (model: any) => {
    try {
        const response = await httpClient.post(`/academy/c/upsert`, model);

        if (response.status === 201 || response.status === 200) {
            return {success: response.data};
        }
        return {error: response?.data?.msg};
    } catch (err: any) {
        // console.error(err.message);
        // console.error(err);

        return {error: err.response?.data?.msg};
    }
};