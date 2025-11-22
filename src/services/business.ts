import axiosInstance from "@/lib/axiosInstance";
import type { Business } from "@/context/types";

export type CreateBusinessRequest = {
  name: string;
  vertical: string;
};

export type UpdateBusinessRequest = Partial<CreateBusinessRequest>;

/**
 * Fetch business by ID
 */
export async function getBusinessById(businessId: string): Promise<Business> {
  const { data } = await axiosInstance.get<Business>(
    `/businesses/${businessId}`
  );
  return data;
}

/**
 * Create a new business
 */
export async function createBusiness(
  payload: CreateBusinessRequest
): Promise<Business> {
  const { data } = await axiosInstance.post<Business>("/businesses", payload);
  return data;
}

/**
 * Update an existing business
 */
export async function updateBusiness(
  businessId: string,
  payload: UpdateBusinessRequest
): Promise<Business> {
  const { data } = await axiosInstance.patch<Business>(
    `/businesses/${businessId}`,
    payload
  );
  return data;
}

/**
 * Delete a business
 */
export async function deleteBusiness(businessId: string): Promise<void> {
  await axiosInstance.delete(`/businesses/${businessId}`);
}

/**
 * Get current user's business
 */
export async function getCurrentUserBusiness(user: {
  businessId?: string | null;
}): Promise<Business | null> {
  if (!user?.businessId) {
    return null;
  }

  try {
    return await getBusinessById(user.businessId);
  } catch (error) {
    console.error("Failed to fetch business:", error);
    return null;
  }
}
