import { PaginatedList } from "@/app/utils/pagination";
import httpClient from "@/app/utils/httpClient";



export const loadAcademicSubject = async (page: number, size: number, level?: string, classId?: string, segment?:string): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size
        };

        if (classId) {
            params.classId = classId;
        }

        if (level && level !='all') {
            params.level = level;
        }

        if(segment && segment !='all'){
            params.segment = segment;
        }

        const response = await httpClient.get<PaginatedList>("/academy/subjects", {params: params});

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};

export const getAcademySubject = async (id?: any): Promise<any> => {
    try {
        const response = await httpClient.get<any>(`/academy/subjects/${id}`);
        // console.log(response)

        return response.data;
    } catch (err: any) {
        // console.error(err.message);
        console.error(err);

        return null!;
    }
};

export const upsertAcademySubject = async (model: any) => {
    try {
        const response = await httpClient.post(`/academy/subjects/upsert`, model);

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