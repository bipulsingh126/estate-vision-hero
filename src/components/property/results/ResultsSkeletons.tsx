
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ContentTemplate } from '@/components/templates/ContentTemplate';

export const ResultsSkeletons: React.FC = () => {
  return (
    <div className="w-full py-6">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, index) => (
          <ContentTemplate key={index} variant="gradient" className="property-card overflow-hidden">
            <Skeleton className="w-full h-48 rounded-t-lg" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-9 w-32 rounded-md" />
              </div>
            </div>
          </ContentTemplate>
        ))}
      </div>
    </div>
  );
};
