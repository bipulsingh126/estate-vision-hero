
import React, { useState } from 'react';
import { Property } from '@/types/property';
import NoResultsFound from './NoResultsFound';
import { ResultsSkeletons } from './results/ResultsSkeletons';
import { ResultsHeader } from './results/ResultsHeader';
import { MapBanner } from './results/MapBanner';
import { PropertyGrid } from './results/PropertyGrid';
import PropertyMap from './PropertyMap';

interface PropertySearchResultsProps {
  properties: Property[];
  isLoading: boolean;
  totalProperties: number;
  searchTerm?: string;
  onResetFilters: () => void;
  showClearSearch: boolean;
  onClearSearch: () => void;
  currentPage?: number;
  itemsPerPage?: number;
}

const PropertySearchResults: React.FC<PropertySearchResultsProps> = ({
  properties,
  isLoading,
  totalProperties,
  searchTerm,
  onResetFilters,
  showClearSearch,
  onClearSearch,
  currentPage = 1,
  itemsPerPage = 9
}) => {
  const [view, setView] = useState<'grid' | 'list' | 'map'>('grid');
  const [sortOption, setSortOption] = useState<string>('featured');

  // Handle view change
  const handleViewChange = (viewType: 'grid' | 'list' | 'map') => {
    setView(viewType);
  };

  // Handle sort change
  const handleSortChange = (option: string) => {
    setSortOption(option);
    // In a real app, you would re-sort the properties here
  };

  // Sort options
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'bedrooms-desc', label: 'Most Bedrooms' },
    { value: 'sqft-desc', label: 'Largest Area' }
  ];

  // Loading state skeleton
  if (isLoading) {
    return <ResultsSkeletons />;
  }

  // No results state
  if (properties.length === 0) {
    return <NoResultsFound searchTerm={searchTerm} onReset={onResetFilters} />;
  }

  return (
    <div className="w-full py-6">
      {/* Header with search results info and controls */}
      <ResultsHeader
        totalProperties={totalProperties}
        searchTerm={searchTerm}
        showClearSearch={showClearSearch}
        onClearSearch={onClearSearch}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        sortOption={sortOption}
        sortOptions={sortOptions}
        onSortChange={handleSortChange}
        view={view}
        onViewChange={handleViewChange}
      />

      {/* Info banner for map view */}
      {view === 'map' && <MapBanner />}

      {/* Main content - conditional rendering based on view type */}
      {view === 'map' ? (
        // Map View
        <PropertyMap properties={properties} />
      ) : (
        // Grid or List View
        <PropertyGrid 
          properties={properties} 
          view={view} 
          sortOption={sortOption} 
          sortOptions={sortOptions} 
        />
      )}
    </div>
  );
};

export default PropertySearchResults;
