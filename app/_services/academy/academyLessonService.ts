import { PaginatedList } from "@/app/utils/pagination";
import httpClient from "@/app/utils/httpClient";



export const loadAcademicLesson = async (page: number, size: number, subjectId?: string): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size
        };

        if (subjectId) {
            params.subjectId = subjectId;
        }

        const response = await httpClient.get<PaginatedList>("/academy/lessons", {params: params});

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};

export const getAcademyLesson = async (id?: any): Promise<any> => {
    try {
        const response = await httpClient.get<any>(`/academy/lessons/${id}`);
        // console.log(response)

        return response.data;
    } catch (err: any) {
        // console.error(err.message);
        console.error(err);

        return null!;
    }
};

export const upsertAcademyLesson = async (model: any) => {
    try {
        const response = await httpClient.post(`/academy/lessons/upsert`, model);

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