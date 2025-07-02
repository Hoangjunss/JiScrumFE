import PageContainer from '@/features/project/kanban/kanban/page-container';
import { Heading } from '@/components/ui/heading';
import { KanbanBoard } from '@/features/project/kanban/kanban/kanban-board';
import NewTaskDialog from '@/features/project/kanban/kanban/new-task-dialog';

export default function KanbanViewPage() {
  return (
    <PageContainer>
      <div className='space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title={`Kanban`} description='Manage tasks by dnd' />
          <NewTaskDialog />
        </div>
        <KanbanBoard />
      </div>
    </PageContainer>
  );
}