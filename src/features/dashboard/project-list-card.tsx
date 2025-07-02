import React, { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import ProjectCard from './project-card';
import { fetchProjectList, ProjectDTO } from '@/lib/api/project';
import { Loader2, AlertCircle } from 'lucide-react';
import { AlertDialogContent, AlertDialogHeader } from '@/components/ui/alert-dialog';

interface ProjectListState {
  projects: ProjectDTO[];
  loading: boolean;
  error: string | null;
}

export const ProjectList = () => {
  const [state, setState] = useState<ProjectListState>({
    projects: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        const response = await fetchProjectList();
        
        setState({
          projects: response.projectDTOs || [],
          loading: false,
          error: null
        });
      } catch (error) {
        setState({
          projects: [],
          loading: false,
          error: error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải danh sách project'
        });
      }
    };

    loadProjects();
  }, []);

  const { projects, loading, error } = state;

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Dự án của tôi 👋
          </h2>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Đang tải danh sách dự án...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <AlertDialogContent variant="destructive">
            <AlertDialogHeader>
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </AlertDialogHeader>
          </AlertDialogContent>
        )}

        {/* Success State - Project Grid */}
        {!loading && !error && (
          <>
            {projects.length > 0 ? (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-lg font-medium mb-2">Chưa có dự án nào</h3>
                <p className="text-sm">Bắt đầu tạo dự án đầu tiên của bạn!</p>
              </div>
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
};