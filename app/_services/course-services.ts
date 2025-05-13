import httpClient from "../utils/httpClient";
import { PaginatedList } from "../utils/pagination";

export const loadCourses = async (page: number, size:number, moduleId?:string): Promise<PaginatedList> => {
  try {

    const params: Record<string, any> = {
        pg: page,
        sz: size
      };

      if(moduleId){
        params.moduleId = moduleId;
      }

    const response = await httpClient.get<PaginatedList>("/courses", {params:params});
    

    return response.data;
  } catch (err: any) {
    console.error(err?.response?.data?.msg);
    return {} as PaginatedList;
  }
};

export const getCourse = async (courseId?: any): Promise<any> => {
  try {
    const response = await httpClient.get<any>(`/courses/${courseId}`);
    // console.log(response)

    return response.data;
  } catch (err: any) {
    // console.error(err.message);
    console.error(err);

    return null!;
  }
};

export const upsertCourse = async (module: any) => {
  try {
    const response = await httpClient.post(`/courses/create`, module);

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