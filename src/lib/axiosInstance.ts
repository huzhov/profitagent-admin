import axios from "axios";
import { getToken } from "./auth";

const token = getToken();

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
  export interface AxiosResponse {
    skipAuth?: boolean;
  }
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.skipAuth) return config; // Skip Authorization

    if (token) {
      config.headers.Authorization = token ? `Bearer ${token}` : "";
    }
    return config;
  },
  (error: any) => {
    if (axios.isAxiosError(error)) {
      const errData = error.response?.data;
      let msg =
        errData?.message ||
        errData?.error?.message ||
        errData?.error ||
        errData?.detail ||
        errData?.title ||
        error.message;
      throw {
        message: `${msg} (${error.response?.status || ""})`,
        status: error.status,
      };
    }
    throw error;
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    if (config.skipAuth) return config; // Skip Authorization

    if (token) {
      config.headers.Authorization = token ? `Bearer ${token}` : "";
    }
    return config;
  },
  (error: any) => {
    if (axios.isAxiosError(error)) {
      const errData = error.response?.data;
      let msg =
        errData?.message ||
        errData?.error?.message ||
        errData?.error ||
        errData?.detail ||
        errData?.title ||
        error.message;

      throw {
        message: `${msg} (${error.response?.status || ""})`,
        status: error.status,
      };
    }
    throw error;
  }
);

export default axiosInstance;
