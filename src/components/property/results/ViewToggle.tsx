
import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, Map } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list' | 'map';
  onViewChange: (view: 'grid' | 'list' | 'map') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="hidden md:flex bg-slate-100 rounded-md p-0.5">
      <Button
        variant="ghost"
        size="sm"
        className={`px-2 rounded ${
          view === 'grid'
            ? 'bg-white text-estate-navy shadow-sm'
            : 'bg-transparent text-slate-500 hover:text-estate-navy'
        }`}
        onClick={() => onViewChange('grid')}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`px-2 rounded ${
          view === 'list'
            ? 'bg-white text-estate-navy shadow-sm'
            : 'bg-transparent text-slate-500 hover:text-estate-navy'
        }`}
        onClick={() => onViewChange('list')}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`px-2 rounded ${
          view === 'map'
            ? 'bg-white text-estate-navy shadow-sm'
            : 'bg-transparent text-slate-500 hover:text-estate-navy'
        }`}
        onClick={() => onViewChange('map')}
      >
        <Map className="h-4 w-4" />
      </Button>
    </div>
  );
};
