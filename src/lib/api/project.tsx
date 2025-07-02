import apiClient from '../api-client';
import logger from '../logger';

export interface ProjectDTO {
    id: number;
    name: string;
    description: string;
    createAt: string;
    ownerId: number;
    status: string;
    startDate: string;
    endDate: string;
}

interface ProjectListResponse {
    projectDTOs: ProjectDTO[];
}

const API_BASE = 'http://localhost:8080/api';

// Fetch danh sách projects
export const fetchProjectList = async (): Promise<ProjectListResponse> => {
    try {
        const response = await apiClient.get<ProjectListResponse>(`${API_BASE}/project`);
        
        if (response && response.data && response.data.projectDTOs) {
            return response.data;
        } else {
            throw new Error('Dữ liệu project bị thiếu trong phản hồi');
        }
    } catch (error) {
        logger.error('Lỗi khi lấy danh sách project:', error);
        throw error;
    }
};

// Fetch một project cụ thể
export const fetchProjectItem = async (itemId: number | string): Promise<ProjectDTO> => {
    try {
        const response = await apiClient.get<ProjectDTO>(`${API_BASE}/project/${itemId}`);
        
        if (response && response.data) {
            return response.data;
        } else {
            throw new Error(`Không tìm thấy project với ID: ${itemId}`);
        }
    } catch (error) {
        logger.error(`Lỗi khi lấy project #${itemId}:`, error);
        throw error;
    }
};