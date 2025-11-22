import axios from "axios";
import { getToken, removeToken } from "./auth";

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

    // Get token dynamically on each request
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const errData = error.response?.data;
      const msg =
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
  (response) => {
    return response;
  },
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      // Handle 401 Unauthorized - token expired or invalid
      if (error.response?.status === 401) {
        removeToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      const errData = error.response?.data;
      const msg =
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
