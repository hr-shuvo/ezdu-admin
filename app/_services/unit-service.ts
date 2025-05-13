import httpClient from "../utils/httpClient";
import { PaginatedList } from "../utils/pagination";

export const loadUnits = async (
  page: number,
  size: number,
  courseId?: string
): Promise<PaginatedList> => {
  try {
    const params: Record<string, any> = {
      pg: page,
      sz: size,
    };

    if (courseId) {
      params.courseId = courseId;
    }

    const response = await httpClient.get<PaginatedList>("/units", {
      params: params,
    });

    return response.data;
  } catch (err: any) {
    console.error(err?.response?.data?.msg);
    return {} as PaginatedList;
  }
};



export const getUnit = async (unitId?: any): Promise<any> => {
  try {
    const response = await httpClient.get<any>(`/units/${unitId}`);
    // console.log(response)

    return response.data;
  } catch (err: any) {
    // console.error(err.message);
    console.error(err);

    return null!;
  }
};


export const upsertUnit = async (unit: any) => {
  try {
    const response = await httpClient.post(`/units/create`, unit);

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