
import React from 'react';
import { Popup } from 'react-leaflet';
import { Property } from '@/types/property';
import { formatCurrency } from '@/lib/utils';
import { BedDouble, Bath, Square, Eye, Home } from 'lucide-react';

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
    <Popup minWidth={280} maxWidth={280} closeButton={true}>
      <div className="w-[280px] pb-1 custom-popup">
        <div className="relative h-32 mb-2">
          <img 
            src={property.imageUrl} 
            alt={property.title}
            className="absolute inset-0 w-full h-full object-cover rounded-t-md"
          />
          <div className="absolute top-2 left-2">
            <span className="bg-white text-estate-navy border-0 font-semibold px-2 py-1 rounded-md text-xs">
              {property.status}
            </span>
          </div>
          <div className="absolute top-2 right-2 flex gap-1">
            {property.isPremium && (
              <span className="bg-estate-gold text-white border-0 px-2 py-1 rounded-md text-xs">
                Premium
              </span>
            )}
            {isFeatured && (
              <span className="bg-estate-pink text-white border-0 px-2 py-1 rounded-md text-xs">
                Featured
              </span>
            )}
          </div>
        </div>
        
        <h3 className="font-semibold text-estate-navy mb-1 line-clamp-1">
          {property.title}
        </h3>
        
        <p className="text-xs text-slate-600 mb-1 flex items-center">
          <svg className="h-3 w-3 mr-1 text-estate-gold" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 9V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V9M20 9H4M20 9V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V9M16 3V7M8 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {property.address}
        </p>
        
        <p className="text-xs text-slate-600 mb-2">
          {property.cityName || property.city}, India
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-estate-gold">
            {formatCurrency(property.price)}
            {property.status === "For Rent" && (
              <span className="text-xs text-slate-500">/mo</span>
            )}
          </span>
          
          <div className="flex gap-2 text-xs text-slate-600">
            <span className="flex items-center">
              <BedDouble className="h-3 w-3 mr-0.5" />
              {property.bedrooms}
            </span>
            <span className="flex items-center">
              <Bath className="h-3 w-3 mr-0.5" />
              {property.bathrooms}
            </span>
            <span className="flex items-center">
              <Square className="h-3 w-3 mr-0.5" />
              {property.sqft}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2 mb-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleFeatured(property);
            }}
            className={`text-xs px-2 py-1 rounded-md border border-slate-200 ${isFeatured ? 'bg-estate-pink text-white' : 'bg-white text-slate-700'}`}
          >
            {isFeatured ? 'Remove Featured' : 'Mark as Featured'}
          </button>
        </div>
        
        <div className="flex gap-2 mb-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(property);
            }}
            className="flex-1 text-sm px-2 py-1.5 rounded-md bg-estate-navy text-white hover:bg-estate-navy/90 transition-colors flex items-center justify-center gap-1"
          >
            <Eye className="h-3.5 w-3.5" />
            View Details
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleLearnMore(property);
            }}
            className="flex-1 text-sm px-2 py-1.5 rounded-md bg-estate-gold text-white hover:bg-estate-gold/90 transition-colors flex items-center justify-center gap-1"
          >
            <Home className="h-3.5 w-3.5" />
            Learn More
          </button>
        </div>
      </div>
    </Popup>
  );
};
