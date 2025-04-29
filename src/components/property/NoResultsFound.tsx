import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoResultsFoundProps {
  searchTerm?: string;
  onReset: () => void;
}

const NoResultsFound: React.FC<NoResultsFoundProps> = ({ searchTerm, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <SearchX className="h-16 w-16 text-muted-foreground mb-4" strokeWidth={1.5} />
      <h3 className="text-xl font-semibold mb-2">No properties found</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {searchTerm ? (
          <>
            No properties match "<span className="font-medium">{searchTerm}</span>" with your current filter settings.
          </>
        ) : (
          <>No properties match your current filter settings.</>
        )}
      </p>
      <Button onClick={onReset} size="lg">
        Reset Filters
      </Button>
    </div>
  );
};

export { NoResultsFound };
export default NoResultsFound;
