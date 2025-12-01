import api from "./api";
import { User, ApiResponse } from "@/types";

// 회원가입
export async function signup(data: {
  email: string;
  password: string;
  name: string;
  gender: "male" | "female";
}): Promise<ApiResponse<{ user: User }>> {
  const response = await api.post("/auth/signup", data);
  return response.data;
}

// 로그인
export async function login(data: {
  email: string;
  password: string;
}): Promise<ApiResponse<{ user: User; token: string }>> {
  const response = await api.post("/auth/login", data);

  // 토큰 저장
  if (response.data.success) {
    sessionStorage.setItem("token", response.data.data.token);
  }

  return response.data;
}

// 로그아웃
export async function logout(): Promise<ApiResponse<null>> {
  const response = await api.post("/auth/logout");
  sessionStorage.removeItem("token");
  return response.data;
}

// 내 정보 조회
export async function getMe(): Promise<ApiResponse<{ user: User }>> {
  const response = await api.get("/auth/me");
  return response.data;
}