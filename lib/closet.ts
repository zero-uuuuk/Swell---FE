import api from "./api";
import { ApiResponse, Item, Pagination } from "@/types";

// 옷장 목록 조회
export async function getCloset(params?: {
  page?: number;
  limit?: number;
  category?: string;
}): Promise<ApiResponse<{ items: Item[]; pagination: Pagination }>> {
  const response = await api.get("/closet", { params });
  return response.data;
}

// 옷장에 아이템 추가
export async function addToCloset(itemId: number): Promise<ApiResponse<null>> {
  const response = await api.post(`/closet/${itemId}`);
  return response.data;
}

// 옷장에서 아이템 삭제
export async function removeFromCloset(itemId: number): Promise<ApiResponse<null>> {
  const response = await api.delete(`/closet/${itemId}`);
  return response.data;
}