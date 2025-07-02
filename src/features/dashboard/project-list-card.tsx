import PageContainer from '@/components/layout/page-container';
import React from 'react';
import { ProjectCard } from './project-card';

export const ProjectListCard =({
  
}) => {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            My Project 👋
          </h2>
        </div>

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <ProjectCard
            data={{
              label: "Total Revenue",
              amount: "$1,250.00",
              percent: 12.5,
              trend: "up",
              subTitle: "Trending up this month",
              note: "Visitors for the last 6 months",
            }}
          />
          

        </div>
      </div>
    </PageContainer>
  );
}