'use client';

import React, { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import ProjectCard from './project-card';
import { fetchProjectList, ProjectDTO } from '@/lib/api/project';
import { Loader2, AlertCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateProjectModal from './project-create-model';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  
  const [showCreateModal, setShowCreateModal] = useState(false);

  const loadProjects = async () => {
    console.log('Loading projects...');
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

const handleOpenChange = (newOpen: boolean) => {
  if (!newOpen) {
    // chỉ xoá lỗi, giữ projects & loading
    setState(prev => ({ ...prev, error: null }));
  }
};

  useEffect(() => {
    loadProjects();
  }, []);

  // Callback khi tạo project thành công
  const handleCreateSuccess = (newProject: ProjectDTO) => {
    setState(prev => ({
      ...prev,
      projects: [newProject, ...prev.projects] // Thêm project mới vào đầu danh sách
    }));
  };

  const { projects, loading, error } = state;

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              My Project 👋
            </h2>
            <p className='text-muted-foreground'>
              Manage and track the progress of your projects
            </p>
          </div>
          {
            projects.length > 0 &&(
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            )
          }
          
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Loading project list...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Dialog open={!!state.error} onOpenChange={handleOpenChange}> {/* mở sẵn khi có lỗi */}
            <DialogContent className="sm:max-w-[420px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  Error
                </DialogTitle>

                <DialogDescription>
                  <div className="flex items-center justify-between">
                    <span>{error}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={loadProjects}
                      className="ml-4"
                    >
                      Try&nbsp;again
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}

        {/* Success State - Project Grid */}
        {!loading && !error && (
          <>
            {projects.length > 0 ? (
              <>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Total: {projects.length} projects</span>
                </div>
                
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      className="hover:shadow-md transition-shadow duration-200"
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-lg font-medium mb-2">You have no Project yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start by creating your first project to manage your tasks
                </p>
                <Button 
                  onClick={() => setShowCreateModal(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create your first project
                </Button>
              </div>
            )}
          </>
        )}

        {/* Create Project Modal */}
        <CreateProjectModal
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
          onSuccess={handleCreateSuccess}
        />
      </div>
    </PageContainer>
  );
};