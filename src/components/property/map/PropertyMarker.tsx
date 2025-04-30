
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Property } from '@/types/property';
import { createCustomIcon } from './MapIcons';

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
      position={[property.lat || 0, property.lng || 0]}
      eventHandlers={{
        click: () => handleMarkerClick(property)
      }}
    >
      {isSelected && (
        <Popup>
          <div className="p-2">
            <h3 className="font-semibold text-estate-navy">{property.title}</h3>
            <p className="text-sm text-slate-500">{property.address}</p>
            <div className="mt-2 flex gap-2">
              <button 
                onClick={() => toggleFeatured(property)}
                className={`text-xs px-2 py-1 rounded-full border ${
                  isFeatured 
                    ? 'bg-estate-pink text-white border-estate-pink' 
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                {isFeatured ? 'Remove Featured' : 'Mark Featured'}
              </button>
              <button 
                onClick={() => handleViewDetails(property)}
                className="text-xs px-2 py-1 rounded-full bg-estate-gold text-white border border-estate-gold"
              >
                View Details
              </button>
              <button 
                onClick={() => handleLearnMore(property)}
                className="text-xs px-2 py-1 rounded-full bg-estate-navy text-white border border-estate-navy"
              >
                Learn More
              </button>
            </div>
          </div>
        </Popup>
      )}
    </Marker>
  );
};
