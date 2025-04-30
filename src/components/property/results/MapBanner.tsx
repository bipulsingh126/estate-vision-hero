
import React from 'react';
import { MapPin } from 'lucide-react';

export const MapBanner: React.FC = () => {
  return (
    <div className="bg-estate-navy/5 border border-estate-navy/10 rounded-lg p-3 mb-4 text-sm flex items-center text-estate-navy">
      <MapPin className="h-5 w-5 mr-2 text-estate-gold flex-shrink-0" />
      <p>
        Explore properties across India on our interactive map. Click on any property marker to see details and view the full listing.
      </p>
    </div>
  );
};
