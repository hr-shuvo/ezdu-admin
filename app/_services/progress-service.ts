import httpClient from "../utils/httpClient";

export const getUserProgress = async (): Promise<any> => {
  try {
    const response = await httpClient.get("/userProgress");

    return response.data;
  } catch (err: any) {
    console.error('err: ', err?.response?.data.msg);
    return null;
  }
};
