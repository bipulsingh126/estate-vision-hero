import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { Property } from '@/types/property';
import L from 'leaflet';
import { indianCities } from './LocationData';

interface MapBoundsControlProps {
  properties: Property[];
  isVisible?: boolean;
}

const MapBoundsControl: React.FC<MapBoundsControlProps> = ({ 
  properties,
  isVisible = true
}) => {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return;
    
    // Only set bounds when properties change and we have properties
    if (isVisible && properties.length > 0) {
      // Using setTimeout to ensure the map is fully initialized
      const timer = setTimeout(() => {
        try {
          // Create bounds that include all properties
          const bounds = L.latLngBounds([]);
          
          // Add all property locations to bounds
          properties.forEach(property => {
            if (property.lat && property.lng) {
              bounds.extend([property.lat, property.lng]);
            }
          });
          
          // If there are no bounds (no properties with coordinates), use India's bounds
          if (bounds.isValid()) {
            // Pad the bounds slightly to ensure all markers are visible
            map.fitBounds(bounds.pad(0.1));
          } else {
            // Center on India if no properties or invalid bounds
            const indiaBounds = L.latLngBounds([]);
            indianCities.forEach(city => {
              indiaBounds.extend([city.lat, city.lng]);
            });
            
            if (indiaBounds.isValid()) {
              map.fitBounds(indiaBounds.pad(0.1));
            } else {
              // Fallback to center on India
              map.setView([22.5726, 78.9629], 5);
            }
          }
        } catch (error) {
          console.error('Error setting map bounds:', error);
          // Fallback to center on India
          map.setView([22.5726, 78.9629], 5);
        }
      }, 500); // Increase delay to ensure map is ready
      
      return () => clearTimeout(timer);
    }
  }, [map, properties, isVisible]);
  
  return null;
};

export default MapBoundsControl;
