
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/types/property';
import { useNavigate } from 'react-router-dom';
import { PropertyView } from './PropertyView';
import { MapBoundsControl } from './map/MapBoundsControl';
import { PropertyMarker } from './map/PropertyMarker';
import { assignPropertiesToLocations } from './map/LocationData';

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
  const mapProperties = assignPropertiesToLocations(properties);
  
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
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
                <PropertyMarker
                  key={property.id}
                  property={property}
                  isSelected={isSelected}
                  isFeatured={isFeatured}
                  handleMarkerClick={handleMarkerClick}
                  toggleFeatured={toggleFeatured}
                  handleViewDetails={handleViewDetails}
                  handleLearnMore={handleLearnMore}
                />
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
