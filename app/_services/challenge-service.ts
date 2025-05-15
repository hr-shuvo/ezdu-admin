import httpClient from "../utils/httpClient";
import { PaginatedList } from "../utils/pagination";

export const loadChallenges = async (
  page: number,
  size: number,
  lessonId?: string
): Promise<PaginatedList> => {
  try {
    const params: Record<string, any> = {
      pg: page,
      sz: size,
    };

    if (lessonId) {
      params.lessonId = lessonId;
    }

    const response = await httpClient.get<PaginatedList>("/challenges", {
      params: params,
    });

    return response.data;
  } catch (err: any) {
    console.error(err?.response?.data?.msg);
    return {} as PaginatedList;
  }
};


export const getChallenge = async (challengeId?: any): Promise<any> => {
  try {
    const response = await httpClient.get<any>(`/challenges/${challengeId}`);
    // console.log(response)

    return response.data;
  } catch (err: any) {
    // console.error(err.message);
    console.error(err);

    return null!;
  }
};

export const upsertChallenge = async (module: any) => {
  try {
    const response = await httpClient.post(`/challenges/create`, module);

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