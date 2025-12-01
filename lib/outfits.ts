import api from "./api";
import { ApiResponse, Coordi, Item, Pagination } from "@/types";

// 코디 목록 조회 (추천순)
export async function getOutfits(params?: {
  page?: number;
  limit?: number;
  season?: string;
  style?: string;
}): Promise<ApiResponse<{ outfits: Coordi[]; pagination: Pagination }>> {
  const response = await api.get("/outfits", { params });
  return response.data;
}

// 코디 상세 조회
export async function getOutfitDetail(
  outfitId: number
): Promise<ApiResponse<{ outfit: Coordi; items: Item[]; llmMessage: string | null }>> {
  const response = await api.get(`/outfits/${outfitId}`);
  return response.data;
}