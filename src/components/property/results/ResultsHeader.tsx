
import React from 'react';
import { Search, FilterX, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ViewToggle } from './ViewToggle';
import { SortSelect } from './SortSelect';

interface ResultsHeaderProps {
  totalProperties: number;
  searchTerm?: string;
  showClearSearch: boolean;
  onClearSearch: () => void;
  currentPage: number;
  itemsPerPage: number;
  sortOption: string;
  sortOptions: { value: string; label: string; }[];
  onSortChange: (option: string) => void;
  view: 'grid' | 'list' | 'map';
  onViewChange: (view: 'grid' | 'list' | 'map') => void;
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  totalProperties,
  searchTerm,
  showClearSearch,
  onClearSearch,
  currentPage,
  itemsPerPage,
  sortOption,
  sortOptions,
  onSortChange,
  view,
  onViewChange,
}) => {
  // Calculate the range of properties being displayed
  const startCount = (currentPage - 1) * itemsPerPage + 1;
  const endCount = Math.min(currentPage * itemsPerPage, totalProperties);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3 bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold flex items-center text-estate-navy">
          {searchTerm ? (
            <>
              <Search className="h-5 w-5 mr-2 text-estate-gold" />
              Results for "{searchTerm}"
            </>
          ) : (
            <>
              <span className="text-estate-gold font-bold mr-1">
                {startCount}-{endCount}
              </span> 
              <span className="text-slate-600">
                of {totalProperties} properties
              </span>
            </>
          )}
        </h2>
        {showClearSearch && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="pl-0 text-slate-500 hover:text-estate-gold mt-1 transition-colors"
            onClick={onClearSearch}
          >
            <FilterX className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>
      
      {/* Controls for sorting and view options */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Sort dropdown */}
        <SortSelect 
          sortOption={sortOption} 
          onSortChange={onSortChange} 
          sortOptions={sortOptions} 
        />

        {/* View toggle */}
        <ViewToggle view={view} onViewChange={onViewChange} />
        
        {/* Map View button */}
        <Button 
          variant={view === 'map' ? 'default' : 'outline'} 
          size="sm" 
          className="gap-2 border-slate-200 hover:border-estate-gold/50 hover:text-estate-gold flex md:hidden lg:flex"
          onClick={() => onViewChange('map')}
        >
          <MapPin className="h-4 w-4" />
          <span className="hidden lg:inline">India Map</span>
          <span className="lg:hidden">Map</span>
        </Button>
      </div>
    </div>
  );
};
