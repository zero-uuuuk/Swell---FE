import api from "./api";
import { ApiResponse, Pagination } from "@/types";

// 가상 피팅 결과 타입
export interface FittingResult {
  jobId: number;
  status: "processing" | "completed" | "failed" | "timeout";
  resultImageUrl: string | null;
  llmMessage: string | null;
  items: { itemId: number; category: string; name: string }[];
  createdAt: string;
}

// 가상 피팅 요청
export async function requestFitting(data: {
  itemIds: number[];
}): Promise<ApiResponse<{ jobId: number }>> {
  const response = await api.post("/virtual-fitting", data);
  return response.data;
}

// 가상 피팅 상태 조회
export async function getFittingStatus(
  jobId: number
): Promise<ApiResponse<FittingResult>> {
  const response = await api.get(`/virtual-fitting/${jobId}`);
  return response.data;
}

// 가상 피팅 이력 조회
export async function getFittingHistory(params?: {
  page?: number;
  limit?: number;
}): Promise<ApiResponse<{ fittings: FittingResult[]; pagination: Pagination }>> {
  const response = await api.get("/virtual-fitting", { params });
  return response.data;
}

// 가상 피팅 이력 삭제
export async function deleteFitting(jobId: number): Promise<ApiResponse<null>> {
  const response = await api.delete(`/virtual-fitting/${jobId}`);
  return response.data;
}