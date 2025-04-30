import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/types/property';
import { formatCurrency } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye, Home, BedDouble, Bath, Square } from 'lucide-react';
import { Badge } from '../ui/badge';
import { PropertyView } from './PropertyView';

// Fix for the marker icon issue in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Set up default icon once
let defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = defaultIcon;

// Indian cities with their coordinates
const indianCities = [
  { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { name: "Delhi", lat: 28.6139, lng: 77.2090 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
  { name: "Lucknow", lat: 26.8467, lng: 80.9462 }
];

// Create a custom marker icon
const createCustomIcon = (property: Property, isSelected: boolean, isFeatured: boolean) => {
  const priceFormatted = formatCurrency(property.price);
  
  let backgroundClass = 'bg-white text-estate-navy border border-estate-gold/30';
  let scaleClass = 'shadow-md hover:scale-110';
  
  if (isSelected) {
    backgroundClass = 'bg-estate-gold text-white';
    scaleClass = 'shadow-lg scale-110';
  } else if (isFeatured) {
    backgroundClass = 'bg-estate-pink text-white';
    scaleClass = 'shadow-md scale-105 hover:scale-110';
  } else if (property.isPremium) {
    backgroundClass = 'bg-estate-navy text-white';
    scaleClass = 'shadow-md hover:scale-110';
  }
  
  const className = `
    flex items-center justify-center font-semibold text-sm px-2 py-1 rounded-full
    ${backgroundClass}
    ${scaleClass}
    transition-all duration-300 z-[500] whitespace-nowrap
  `;
  
  return L.divIcon({
    className: '',
    iconSize: [40, 20],
    iconAnchor: [20, 10],
    html: `<div class="${className}">${priceFormatted}</div>`
  });
};

// Map Bounds Control Component
function MapBoundsControl({ properties, showFeaturedOnly, featuredProperties }: { 
  properties: Property[],
  showFeaturedOnly: boolean,
  featuredProperties: Property[] 
}) {
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
}

interface PropertyMapProps {
  properties: Property[];
}

const PropertyMap: React.FC<PropertyMapProps> = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showPropertyView, setShowPropertyView] = useState(false);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const navigate = useNavigate();
  
  // Generate Indian locations for properties
  const mapProperties = properties.map(property => {
    // Assign each property to a random Indian city
    // Small variation to spread them out a bit within each city
    const randomCity = indianCities[Math.floor(Math.random() * indianCities.length)];
    const lat = randomCity.lat + (Math.random() - 0.5) * 0.05;
    const lng = randomCity.lng + (Math.random() - 0.5) * 0.05;
    
    // For properties that already mention a city, try to match them to the correct coordinates
    if (property.city) {
      const matchedCity = indianCities.find(city => 
        city.name.toLowerCase() === property.city?.toLowerCase()
      );
      
      if (matchedCity) {
        return {
          ...property,
          lat: matchedCity.lat + (Math.random() - 0.5) * 0.03,
          lng: matchedCity.lng + (Math.random() - 0.5) * 0.03,
          cityName: matchedCity.name
        };
      }
    }
    
    return {
      ...property,
      lat,
      lng,
      cityName: randomCity.name
    };
  });
  
  // Automatically mark some properties as featured (for demo purposes)
  useEffect(() => {
    // Select premium properties or properties with certain features as featured
    const featured = mapProperties.filter(p => 
      p.isPremium || 
      p.price > 5000000 || 
      (p.bedrooms >= 4 && p.bathrooms >= 3)
    ).slice(0, 5); // Limit to 5 featured properties
    
    setFeaturedProperties(featured);
  }, [properties]);
  
  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property);
  };
  
  const handleViewDetails = (property: Property) => {
    // Make sure the selected property is set before showing the property view
    setSelectedProperty(property);
    setShowPropertyView(true);
  };
  
  const handleLearnMore = (property: Property) => {
    // Navigate to the individual property page
    navigate(`/properties/${property.id}`);
  };
  
  const toggleFeatured = (property: Property) => {
    setFeaturedProperties(prev => {
      const isAlreadyFeatured = prev.some(p => p.id === property.id);
      
      if (isAlreadyFeatured) {
        return prev.filter(p => p.id !== property.id);
      } else {
        return [...prev, property];
      }
    });
  };

  // Filter properties if showing featured only
  const visibleProperties = showFeaturedOnly 
    ? mapProperties.filter(p => featuredProperties.some(fp => fp.id === p.id))
    : mapProperties;

  return (
    <>
      <div className="h-[calc(100vh-200px)] w-full rounded-lg overflow-hidden border border-slate-200 shadow-sm">
        <div className="p-2 bg-white border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-medium text-estate-navy">Properties across India</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-estate-pink"></div>
              <span className="text-xs text-slate-500">Featured</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-estate-gold"></div>
              <span className="text-xs text-slate-500">Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-estate-navy"></div>
              <span className="text-xs text-slate-500">Premium</span>
            </div>
            <button 
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`
                text-xs px-2 py-1 rounded-md border 
                ${showFeaturedOnly 
                  ? 'bg-estate-pink text-white border-estate-pink' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}
              `}
            >
              {showFeaturedOnly ? 'Show All Properties' : `Show Featured (${featuredProperties.length})`}
            </button>
          </div>
        </div>
        
        <div style={{ height: 'calc(100% - 36px)', width: '100%' }}>
          <MapContainer 
            defaultCenter={[20.5937, 78.9629]} 
            zoom={5} 
            minZoom={4}
            maxZoom={18}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="bottomright" />
            <MapBoundsControl 
              properties={mapProperties} 
              showFeaturedOnly={showFeaturedOnly} 
              featuredProperties={featuredProperties} 
            />
            
            {visibleProperties.map((property) => {
              const isFeatured = featuredProperties.some(p => p.id === property.id);
              const isSelected = selectedProperty?.id === property.id;
              
              return (
                <Marker
                  key={property.id}
                  position={[property.lat, property.lng]}
                  icon={createCustomIcon(property, isSelected, isFeatured)}
                  eventHandlers={{
                    click: () => handleMarkerClick(property)
                  }}
                >
                  {isSelected && (
                    <Popup minWidth={280} maxWidth={280}>
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
                  )}
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
      
      {selectedProperty && (
        <PropertyView
          property={selectedProperty}
          isOpen={showPropertyView}
          onClose={() => setShowPropertyView(false)}
        />
      )}
    </>
  );
};

export default PropertyMap;
