import React, { useState } from 'react';
import { Property } from '@/types/property';
import PropertyCard from '@/components/PropertyCard';
import NoResultsFound from './NoResultsFound';
import { Search, FilterX, ArrowUpDown, LayoutGrid, List, SortAsc, SortDesc, Map, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentTemplate } from '@/components/templates/ContentTemplate';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  }

  // No results state
  if (properties.length === 0) {
    return <NoResultsFound searchTerm={searchTerm} onReset={onResetFilters} />;
  }

  // Calculate the range of properties being displayed
  const startCount = (currentPage - 1) * itemsPerPage + 1;
  const endCount = Math.min(currentPage * itemsPerPage, totalProperties);

  return (
    <div className="w-full py-6">
      {/* Header with search results info and controls */}
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
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full md:w-[200px] border-slate-200 hover:border-estate-gold/50 focus:border-estate-gold focus:ring-1 focus:ring-estate-gold/30 bg-white">
              <div className="flex items-center">
                <ArrowUpDown className="mr-2 h-4 w-4 text-estate-gold" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View toggle */}
          <div className="hidden md:flex bg-slate-100 rounded-md p-0.5">
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 rounded ${
                view === 'grid'
                  ? 'bg-white text-estate-navy shadow-sm'
                  : 'bg-transparent text-slate-500 hover:text-estate-navy'
              }`}
              onClick={() => handleViewChange('grid')}
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
              onClick={() => handleViewChange('list')}
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
              onClick={() => handleViewChange('map')}
            >
              <Map className="h-4 w-4" />
            </Button>
          </div>
          
          {/* India Map View button */}
          <Button 
            variant={view === 'map' ? 'default' : 'outline'} 
            size="sm" 
            className="gap-2 border-slate-200 hover:border-estate-gold/50 hover:text-estate-gold flex md:hidden lg:flex"
            onClick={() => handleViewChange('map')}
          >
            <MapPin className="h-4 w-4" />
            <span className="hidden lg:inline">India Map</span>
            <span className="lg:hidden">Map</span>
          </Button>
        </div>
      </div>

      {/* Info banner for map view */}
      {view === 'map' && (
        <div className="bg-estate-navy/5 border border-estate-navy/10 rounded-lg p-3 mb-4 text-sm flex items-center text-estate-navy">
          <MapPin className="h-5 w-5 mr-2 text-estate-gold flex-shrink-0" />
          <p>
            Explore properties across India on our interactive map. Click on any property marker to see details and view the full listing.
          </p>
        </div>
      )}

      {/* Main content - conditional rendering based on view type */}
      {view === 'map' ? (
        // Map View
        <PropertyMap properties={properties} />
      ) : (
        // Grid or List View
        <>
          <div className={`${
            view === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'flex flex-col gap-4'
          }`}>
            {properties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                isListView={view === 'list'}
              />
            ))}
          </div>
          
          {/* Status badge showing current sort */}
          <div className="mt-4 flex items-center justify-end">
            <Badge 
              variant="outline" 
              className="text-xs text-slate-500 bg-white border-slate-200"
            >
              {sortOption === 'featured' ? 'Showing featured properties' : `Sorted by: ${sortOptions.find(o => o.value === sortOption)?.label}`}
            </Badge>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertySearchResults; 