import React, { useCallback, useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Property } from '@/types/property';
import { createCustomIcon } from './MapIcons';
import { formatCurrency } from '@/lib/utils';

interface PropertyMarkerProps {
  property: Property;
  isSelected: boolean;
  isFeatured: boolean;
  handleMarkerClick: (property: Property) => void;
  toggleFeatured: (property: Property) => void;
  handleViewDetails: (property: Property) => void;
  handleLearnMore: (property: Property) => void;
}

export const PropertyMarker: React.FC<PropertyMarkerProps> = ({
  property,
  isSelected,
  isFeatured,
  handleMarkerClick,
  toggleFeatured,
  handleViewDetails,
  handleLearnMore
}) => {
  // Create icon once with useMemo to avoid recreating it on each render
  const markerIcon = useMemo(() => 
    createCustomIcon(property, isSelected, isFeatured), 
    [property, isSelected, isFeatured]
  );
  
  // Create event handlers with useCallback to avoid recreating functions
  const onMarkerClick = useCallback(() => {
    handleMarkerClick(property);
  }, [property, handleMarkerClick]);
  
  const onToggleFeatured = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFeatured(property);
  }, [property, toggleFeatured]);
  
  const onViewDetails = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    handleViewDetails(property);
  }, [property, handleViewDetails]);
  
  const onLearnMore = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    handleLearnMore(property);
  }, [property, handleLearnMore]);
  
  // Ensure we have valid coordinates
  const position = useMemo(() => 
    [property.lat || 0, property.lng || 0] as [number, number], 
    [property.lat, property.lng]
  );
  
  return (
    <Marker
      position={position}
      icon={markerIcon}
      eventHandlers={{
        click: onMarkerClick
      }}
    >
      {isSelected && (
        <Popup>
          <div className="p-2 min-w-[200px]">
            <h3 className="font-semibold text-estate-navy">{property.title}</h3>
            <p className="text-sm text-slate-500">{property.address}</p>
            <p className="text-sm font-medium text-estate-navy mt-1">{formatCurrency(property.price)}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button 
                onClick={onToggleFeatured}
                className={`text-xs px-2 py-1 rounded-full border ${
                  isFeatured 
                    ? 'bg-estate-pink text-white border-estate-pink' 
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                {isFeatured ? 'Unfeature' : 'Feature'}
              </button>
              <button 
                onClick={onViewDetails}
                className="text-xs px-2 py-1 rounded-full bg-estate-gold text-white border border-estate-gold"
              >
                Details
              </button>
              <button 
                onClick={onLearnMore}
                className="text-xs px-2 py-1 rounded-full bg-estate-navy text-white border border-estate-navy"
              >
                View
              </button>
            </div>
          </div>
        </Popup>
      )}
    </Marker>
  );
};
