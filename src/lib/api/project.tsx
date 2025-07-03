import { APIResponse, Page } from '@/constants/data';
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

export interface CreateProjectDTO {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status?: string;
}

export interface ProjectFilterRequest {
  name?: string | null;
  status?: null | 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
  owner?: boolean | null;   
}

export interface ProjectListResponse {
    projectDTOs: ProjectDTO[];
}

        export const fetchProjectList = async (
        filter: ProjectFilterRequest,
        page = 0,
        size = 10
        ): Promise<Page<ProjectDTO>> => {
        try {
            const response = await apiClient.get<APIResponse<Page<ProjectDTO>>>(
            `/projects/filter`,
            { params: { ...filter, page, size } } 
            );
            if (response) {
            console.log('Danh sách project:', response.data);
            return response.data.data;
            }
            throw new Error('Thiếu dữ liệu project trong phản hồi');
        } catch (error) {
            logger.error('Lỗi khi lấy danh sách project:', error);
            throw error;
        }
};

    export const fetchProjectItem = async (itemId: number | string): Promise<ProjectDTO> => {
    try {
        const response = await apiClient.get<ProjectDTO>(`/project/${itemId}`);
        
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

    export const createProject = async (projectData: CreateProjectDTO): Promise<ProjectDTO> => {
    try {
        const response = await apiClient.post<ProjectDTO>(`/project`, {
            ...projectData,
            status: projectData.status || 'DRAFT'
        });
        
        if (response && response.data) {
            logger.info('Tạo project thành công:', response.data);
            return response.data;
        } else {
            throw new Error('Không thể tạo project mới');
        }
    } catch (error) {
        logger.error('Lỗi khi tạo project:', error);
        throw error;
    }
};