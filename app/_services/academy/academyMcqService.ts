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

export const getAcademyMcq = async (id?: any): Promise<any> => {
  try {
    const response = await httpClient.get<any>(`/academy/mcq/${id}`);
    // console.log(response)

    return response.data;
  } catch (err: any) {
    // console.error(err.message);
    console.error(err);

    return null!;
  }
};


export const upsertAcademyMcq = async (model: any) => {
  try {
    const response = await httpClient.post(`/academy/mcq/upsert`, model);

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