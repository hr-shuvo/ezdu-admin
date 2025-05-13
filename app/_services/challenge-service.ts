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