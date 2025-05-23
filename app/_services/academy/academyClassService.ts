import { PaginatedList } from "@/app/utils/pagination";
import httpClient from "@/app/utils/httpClient";


export const loadAcademicClass = async (page: number, size: number, level?: string, version?: string): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size
        };

        if (version) {
            params.version = version;
        }

        if (level && level !='all') {
            params.level = level;
        }

        const response = await httpClient.get<PaginatedList>("/academy/classes", {params: params});

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};

export const getAcademyClass = async (id?: any): Promise<any> => {
    try {
        const response = await httpClient.get<any>(`/academy/classes/${id}`);
        // console.log(response)

        return response.data;
    } catch (err: any) {
        // console.error(err.message);
        console.error(err);

        return null!;
    }
};

export const upsertAcademyClass = async (model: any) => {
    try {
        const response = await httpClient.post(`/academy/classes/upsert`, model);

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