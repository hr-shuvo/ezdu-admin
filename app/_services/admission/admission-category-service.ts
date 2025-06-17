import { PaginatedList } from "@/app/utils/pagination";
import httpClient from "@/app/utils/httpClient";



export const loadAdmissionCategory = async (page: number, size: number, segment?: string): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size
        };

        if (segment) {
            params.segment = segment;
        }

        const response = await httpClient.get<PaginatedList>("/admission", {params: params});

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};

export const getAdmissionCategory = async (id?: any): Promise<any> => {
    try {
        const response = await httpClient.get<any>(`/admission/${id}`);
        // console.log(response)

        return response.data;
    } catch (err: any) {
        // console.error(err.message);
        console.error(err);

        return null!;
    }
};

export const upsertAdmissionCategory = async (model: any) => {
    try {
        const response = await httpClient.post(`/admission/upsert`, model);

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





export const loadAdmissionCategoryUnit = async (page: number, size: number, categoryId:string, segment?: string): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size
        };

        if(categoryId){
            params.categoryId = categoryId;
        }

        if (segment) {
            params.segment = segment;
        }

        const response = await httpClient.get<PaginatedList>("/admission/units", {params: params});

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.message);
        return {} as PaginatedList;
    }
};

export const getAdmissionCategoryUnit = async (id?: any): Promise<any> => {
    try {
        const response = await httpClient.get<any>(`/admission/units/${id}`);
        // console.log(response)

        return response.data;
    } catch (err: any) {
        // console.error(err.message);
        console.error(err);

        return null!;
    }
};

export const upsertAdmissionCategoryUnit = async (model: any) => {
    try {
        const response = await httpClient.post(`/admission/units/upsert`, model);

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

