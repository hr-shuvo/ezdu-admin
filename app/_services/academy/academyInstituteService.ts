import { PaginatedList } from "@/app/utils/pagination";
import httpClient from "@/app/utils/httpClient";


export const loadAcademicInstitute = async (page: number, size: number, level?: string): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size
        };

        if (level && level !='all') {
            params.level = level;
        }

        const response = await httpClient.get<PaginatedList>("/academy/qb/institute", {params: params});

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};

export const getAcademyInstitute = async (id?: any): Promise<any> => {
    try {
        const response = await httpClient.get<any>(`/academy/qb/institute/${id}`);
        // console.log(response)

        return response.data;
    } catch (err: any) {
        // console.error(err.message);
        console.error(err);

        return null!;
    }
};

export const upsertAcademyInstitute = async (model: any) => {
    try {
        const response = await httpClient.post(`/academy/qb/institute/upsert`, model);

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




/// /// model test // // //



export const loadAcademicModelTest = async (page: number, size: number, subjectId?: string, instituteId?:string): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size
        };

        if (subjectId) {
            params.subjectId = subjectId;
        }

        const response = await httpClient.get<PaginatedList>("/academy/qb/modeltest", {params: params});

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};

export const getAcademyModelTest = async (id?: any): Promise<any> => {
    try {
        const response = await httpClient.get<any>(`/academy/qb/institute/${id}`);
        // console.log(response)

        return response.data;
    } catch (err: any) {
        // console.error(err.message);
        console.error(err);

        return null!;
    }
};

export const upsertAcademyModelTest = async (model: any) => {
    try {
        const response = await httpClient.post(`/academy/qb/institute/upsert`, model);

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
