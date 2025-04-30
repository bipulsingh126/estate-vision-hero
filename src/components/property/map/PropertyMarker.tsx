
import React from 'react';
import { Marker } from 'react-leaflet';
import { Property } from '@/types/property';
import { createCustomIcon } from './MapIcons';
import { PropertyPopup } from './PropertyPopup';

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
  return (
    <Marker
      position={[property.lat, property.lng]}
      icon={createCustomIcon(property, isSelected, isFeatured)}
      eventHandlers={{
        click: () => handleMarkerClick(property)
      }}
    >
      {isSelected && (
        <PropertyPopup
          property={property}
          isFeatured={isFeatured}
          toggleFeatured={toggleFeatured}
          handleViewDetails={handleViewDetails}
          handleLearnMore={handleLearnMore}
        />
      )}
    </Marker>
  );
};
