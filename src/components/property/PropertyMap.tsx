import React, { useState, useEffect, useMemo } from 'react';
import { Property } from '@/types/property';
import { useNavigate } from 'react-router-dom';
import { PropertyView } from './PropertyView';
import { assignPropertiesToLocations, indianCities } from './map/LocationData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Building, Map, Navigation, Home } from 'lucide-react';

interface PropertyMapProps {
  properties: Property[];
}

const PropertyMap: React.FC<PropertyMapProps> = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showPropertyView, setShowPropertyView] = useState(false);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [cityFilter, setCityFilter] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Generate Indian locations for properties
  const mapProperties = useMemo(() => assignPropertiesToLocations(properties), [properties]);
  
  // Automatically mark some properties as featured (for demo purposes)
  useEffect(() => {
    // Select premium properties or properties with certain features as featured
    const featured = mapProperties.filter(p => 
      p.isPremium || 
      p.price > 5000000 || 
      (p.bedrooms >= 4 && p.bathrooms >= 3)
    ).slice(0, 5); // Limit to 5 featured properties
    
    setFeaturedProperties(featured);
  }, [mapProperties]);
  
  const handleViewProperty = (property: Property) => {
    navigate(`/property/${property.id}`);
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setShowPropertyView(true);
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

  // Get unique cities from properties
  const cities = useMemo(() => {
    const citySet = new Set<string>();
    mapProperties.forEach(p => {
      if (p.cityName) citySet.add(p.cityName);
    });
    return Array.from(citySet).sort();
  }, [mapProperties]);

  // Filter properties 
  const visibleProperties = useMemo(() => {
    let filtered = mapProperties;
    
    // Apply featured filter if enabled
    if (showFeaturedOnly) {
      filtered = filtered.filter(p => featuredProperties.some(fp => fp.id === p.id));
    }
    
    // Apply city filter if selected
    if (cityFilter) {
      filtered = filtered.filter(p => p.cityName === cityFilter);
    }
    
    return filtered;
  }, [mapProperties, featuredProperties, showFeaturedOnly, cityFilter]);

  // Group properties by city for better display
  const propertiesByCity = useMemo(() => {
    const grouped: Record<string, Property[]> = {};
    
    visibleProperties.forEach(property => {
      const city = property.cityName || 'Other';
      if (!grouped[city]) {
        grouped[city] = [];
      }
      grouped[city].push(property);
    });
    
    return grouped;
  }, [visibleProperties]);

  return (
    <>
      <div className="h-[calc(100vh-200px)] w-full rounded-lg overflow-hidden border border-slate-200 shadow-sm">
        <div className="p-2 bg-white border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-medium text-estate-navy flex items-center">
            <Map className="w-4 h-4 mr-1" />
            Properties across India
          </h3>
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
        
        {/* City filter bar */}
        <div className="p-2 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setCityFilter(null)}
            className={`
              text-xs px-3 py-1.5 rounded-full whitespace-nowrap
              ${!cityFilter 
                ? 'bg-estate-navy text-white' 
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}
            `}
          >
            All Cities
          </button>
          {cities.map(city => (
            <button
              key={city}
              onClick={() => setCityFilter(city === cityFilter ? null : city)}
              className={`
                text-xs px-3 py-1.5 rounded-full whitespace-nowrap flex items-center
                ${city === cityFilter 
                  ? 'bg-estate-navy text-white' 
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}
              `}
            >
              <Building className="w-3 h-3 mr-1" />
              {city}
            </button>
          ))}
        </div>
        
        {/* Property grid view - replacement for map */}
        <div className="h-[calc(100%-76px)] overflow-y-auto p-4 bg-slate-50">
          {Object.entries(propertiesByCity).map(([city, cityProperties]) => (
            <div key={city} className="mb-6">
              <h3 className="text-md font-semibold text-estate-navy flex items-center mb-2">
                <Navigation className="w-4 h-4 mr-1" />
                {city}
                <span className="text-xs font-normal text-slate-500 ml-2">
                  ({cityProperties.length} properties)
                </span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cityProperties.map(property => {
                  const isFeatured = featuredProperties.some(p => p.id === property.id);
                  const isSelected = selectedProperty?.id === property.id;
                  
                  return (
                    <div 
                      key={property.id}
                      className={`
                        rounded-lg overflow-hidden border shadow-sm transition-all
                        ${isSelected 
                          ? 'border-estate-gold ring-1 ring-estate-gold shadow-md' 
                          : isFeatured 
                            ? 'border-estate-pink shadow-sm' 
                            : 'border-slate-200 hover:shadow-md'}
                        ${property.isPremium ? 'bg-white' : 'bg-white'}
                      `}
                      onClick={() => handleSelectProperty(property)}
                    >
                      <div className="relative h-32 bg-slate-100">
                        {property.imageUrl ? (
                          <img 
                            src={property.imageUrl} 
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Home className="w-12 h-12 text-slate-300" />
                          </div>
                        )}
                        
                        <div className="absolute top-2 right-2 flex gap-1">
                          {property.isPremium && (
                            <Badge variant="secondary" className="bg-estate-navy text-white text-xs">Premium</Badge>
                          )}
                          {isFeatured && (
                            <Badge variant="secondary" className="bg-estate-pink text-white text-xs">Featured</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-3">
                        <div className="flex items-start mb-1 justify-between">
                          <div>
                            <h4 className="font-medium text-estate-navy line-clamp-1">{property.title}</h4>
                            <p className="text-xs text-slate-500 flex items-center">
                              <MapPin className="w-3 h-3 mr-1 inline" />
                              {property.address}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-estate-gold whitespace-nowrap ml-2">
                            ₹{property.price.toLocaleString()}
                          </p>
                        </div>
                        
                        <div className="flex justify-between text-xs text-slate-600 mt-2">
                          <span>{property.bedrooms} beds</span>
                          <span>{property.bathrooms} baths</span>
                          <span>{property.area} sq.ft</span>
                        </div>
                        
                        <div className="mt-3 flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-xs px-2 py-1 h-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFeatured(property);
                            }}
                          >
                            {isFeatured ? 'Unfeature' : 'Feature'}
                          </Button>
                          <Button 
                            size="sm"
                            className="text-xs px-2 py-1 h-auto bg-estate-navy hover:bg-estate-navy/90"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewProperty(property);
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
          {visibleProperties.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <Map className="w-16 h-16 mb-2 text-slate-300" />
              <p>No properties found with the current filters.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => {
                  setShowFeaturedOnly(false);
                  setCityFilter(null);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
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
