import { APIResponse } from "@/constants/data";
import apiClient from "../api-client";
export type FormLogin = {
  username?: string;
  password?: string; // hoặc string tùy backend bạn
};
export type Token = {
  accessToken?: string;
  resetToken?: string; // hoặc string tùy backend bạn
};
export interface AccountCreateDTO {
  username: string;
  password: string;
  email: string;
}

export interface AccountDTO {
  id: number;
  username: string;
  password: string;
  email: string;
  createdAt: string; // hoặc Date nếu bạn parse
  status: boolean;
}

export async function login(filter: FormLogin): Promise<APIResponse<Token>> {
  try {
    const response = await apiClient.post<APIResponse<Token>>('/accounts/sign-in', filter);
    return response.data;
  } catch (error) {
    console.error('❌ Error during login:', error);
    throw error;
  }
}
export async function signup(payload: AccountCreateDTO): Promise<APIResponse<AccountDTO>> {
  try {
    const response = await apiClient.post<APIResponse<AccountDTO>>('/accounts', payload);
    return response.data;
  } catch (error) {
    console.error('❌ Error during sign up:', error);
    throw error;
  }
}
