import { Member } from "@/constants/data";
import apiClient from "../api-client";
export type MemberFilter = {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string[]; // hoặc string tùy backend bạn
};

export async function fetchMembers(filter: MemberFilter): Promise<Member[]> {
  try {
    const response = await apiClient.get<Member[]>('/api/members', {
      params: filter
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
}