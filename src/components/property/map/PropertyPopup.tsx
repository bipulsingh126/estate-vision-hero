
import React from 'react';
import { Popup } from 'react-leaflet';
import { Property } from '@/types/property';
import { formatCurrency } from '@/lib/utils';

interface PropertyPopupProps {
  property: Property;
  isFeatured: boolean;
  toggleFeatured: (property: Property) => void;
  handleViewDetails: (property: Property) => void;
  handleLearnMore: (property: Property) => void;
}

export const PropertyPopup: React.FC<PropertyPopupProps> = ({
  property,
  isFeatured,
  toggleFeatured,
  handleViewDetails,
  handleLearnMore
}) => {
  return (
    <Popup>
      <div className="p-2">
        <h3 className="font-semibold text-estate-navy">{property.title}</h3>
        <p className="text-sm text-slate-500">{property.address}</p>
        <p className="text-estate-gold font-bold mt-1">{formatCurrency(property.price)}</p>
        <div className="mt-2 flex flex-wrap gap-2">
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
  );
};
