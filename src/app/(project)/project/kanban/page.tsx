'use client';

import { useEffect } from 'react';
import KanbanViewPage from '@/features/project/kanban/kanban/kanban-view-page';
import { useLoading } from '@/hooks/use-loading';



export default function Page() {
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 giây

    return () => clearTimeout(timeout);
  }, [setLoading]);

  return <KanbanViewPage />;
}
