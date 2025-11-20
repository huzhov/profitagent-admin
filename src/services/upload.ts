import axiosInstance from "@/lib/axiosInstance";
import type {
  StageUploadResponse,
  StageUploads,
  Upload,
} from "@/types/uploads";

/**
 * Create staged upload URL
 */
export async function stageUpload(
  params: StageUploads
): Promise<StageUploadResponse> {
  const { data } = await axiosInstance.post<StageUploadResponse>(
    `/uploads`,
    params
  );

  return data;
}

/**
 * Upload File
 */
export async function uploadFile({ url, file }: Upload): Promise<void> {
  const { data } = await axiosInstance.put(url, file, {
    headers: {
      "Content-Type": file?.type || "application/octet-stream",
    },
    skipAuth: true,
  });

  return data;
}
