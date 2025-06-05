import httpClient from "@/app/utils/httpClient";
import { PaginatedList } from "@/app/utils/pagination";


export const loadAcamemicMcq = async (page: number, size: number, subjectId?: string, lessonId?: string): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size
        };

        if (subjectId) {
            params.subjectId = subjectId;
        }

        if (lessonId) {
            params.lessonId = lessonId;
        }

        const response = await httpClient.get<PaginatedList>("/academy/mcq", {params: params});

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};