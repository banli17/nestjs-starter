import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export class RequestUtil {
  static async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await axios.get(url, config);
    return response.data;
  }

  static async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await axios.post(url, data, config);
    return response.data;
  }
}
