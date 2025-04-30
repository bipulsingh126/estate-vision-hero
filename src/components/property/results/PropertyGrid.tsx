
import React from 'react';
import { Property } from '@/types/property';
import PropertyCard from '@/components/PropertyCard';
import { Badge } from '@/components/ui/badge';

interface PropertyGridProps {
  properties: Property[];
  view: 'grid' | 'list';
  sortOption: string;
  sortOptions: { value: string; label: string; }[];
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({ 
  properties, 
  view,
  sortOption,
  sortOptions 
}) => {
  return (
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
  );
};
