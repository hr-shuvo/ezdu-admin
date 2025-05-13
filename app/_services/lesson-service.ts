import httpClient from "../utils/httpClient";
import { PaginatedList } from "../utils/pagination";

export const loadLessons = async (
  page: number,
  size: number,
  unitId?: string
): Promise<PaginatedList> => {
  try {
    const params: Record<string, any> = {
      pg: page,
      sz: size,
    };

    if (unitId) {
      params.unitId = unitId;
    }

    const response = await httpClient.get<PaginatedList>("/lessons", {
      params: params,
    });

    return response.data;
  } catch (err: any) {
    console.error(err?.response?.data?.msg);
    return {} as PaginatedList;
  }
};


export const getLesson = async (lessonId?: any): Promise<any> => {
  try {
    const response = await httpClient.get<any>(`/lessons/${lessonId}`);
    // console.log(response)

    return response.data;
  } catch (err: any) {
    // console.error(err.message);
    console.error(err);

    return null!;
  }
};