import React from 'react';
import { Property } from '@/types/property';
import PropertyCard from '@/components/PropertyCard';
import NoResultsFound from './NoResultsFound';

interface PropertiesGridProps {
  properties: Property[];
  searchTerm?: string;
  onResetFilters?: () => void;
  isPreview?: boolean;
}

const PropertiesGrid: React.FC<PropertiesGridProps> = ({ 
  properties, 
  searchTerm,
  onResetFilters,
  isPreview 
}) => {
  if (properties.length === 0 && onResetFilters) {
    return <NoResultsFound searchTerm={searchTerm} onReset={onResetFilters} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export { PropertiesGrid };
export default PropertiesGrid;
