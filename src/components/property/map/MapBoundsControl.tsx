
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { Property } from '@/types/property';

interface MapBoundsControlProps {
  properties: Property[];
  showFeaturedOnly: boolean;
  featuredProperties: Property[];
}

export const MapBoundsControl: React.FC<MapBoundsControlProps> = ({ 
  properties,
  showFeaturedOnly,
  featuredProperties 
}) => {
  const map = useMap();
  
  useEffect(() => {
    if (properties.length > 0) {
      const visibleProperties = showFeaturedOnly 
        ? properties.filter(p => featuredProperties.some(fp => fp.id === p.id))
        : properties;
      
      if (visibleProperties.length > 0) {
        const bounds = L.latLngBounds(
          visibleProperties.map(p => [p.lat, p.lng])
        );
        
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      }
    }
  }, [map, properties, showFeaturedOnly, featuredProperties]);
  
  return null;
};
