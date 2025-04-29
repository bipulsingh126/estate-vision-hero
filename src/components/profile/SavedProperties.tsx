import React, { useState, useEffect } from 'react';
import { Property } from '@/types/property';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, ExternalLink, Trash2, MapPin, Home, Bed, Bath, ArrowRight, Loader2 } from 'lucide-react';
import { getSavedProperties, removeProperty } from '@/lib/favorites';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

const SavedProperties = () => {
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Load saved properties on component mount and when localStorage changes
  useEffect(() => {
    const loadSavedProperties = () => {
      const savedProperties = getSavedProperties();
      setFavorites(savedProperties);
      setIsLoading(false);
    };
    
    loadSavedProperties();
    
    // Listen for storage events to update the favorites when changed in another tab
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'estate-vision-saved-properties') {
        loadSavedProperties();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleRemoveFavorite = async (propertyId: string) => {
    setRemovingId(propertyId);
    
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const success = removeProperty(propertyId);
    if (success) {
      setFavorites(favorites.filter(property => property.id !== propertyId));
    }
    
    setRemovingId(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading your saved properties...</p>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
          <Bookmark className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-3">No saved properties yet</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          When you save properties you're interested in, they'll appear here for easy access
        </p>
        <Button asChild size="lg" className="gap-2">
          <Link to="/properties">
            <span>Browse Properties</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="px-3 py-1.5 text-sm bg-primary/5">
          {favorites.length} {favorites.length === 1 ? 'Property' : 'Properties'} Saved
        </Badge>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {favorites.map(property => (
          <Card key={property.id} className="overflow-hidden group hover:shadow-lg transition-all">
            <div className="relative">
              <img 
                src={property.imageUrl} 
                alt={property.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <div className="font-bold text-xl">{formatCurrency(property.price)}</div>
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant="secondary" className="bg-estate-gold/90 text-white border-none">
                    {property.status}
                  </Badge>
                </div>
              </div>
            </div>
            
            <CardContent className="p-5">
              <h4 className="font-semibold text-lg mb-2 line-clamp-1">{property.title}</h4>
              
              <div className="flex items-center text-muted-foreground mb-3">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="text-sm line-clamp-1">{property.address}</span>
              </div>
              
              <div className="flex gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  <span>{property.sqft} sq ft</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1 hover:bg-primary hover:text-white transition-colors"
                  asChild
                >
                  <Link to="/properties">
                    <ExternalLink className="h-4 w-4" />
                    <span>View Details</span>
                  </Link>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-1"
                  onClick={() => handleRemoveFavorite(property.id)}
                  disabled={removingId === property.id}
                >
                  {removingId === property.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Removing...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      <span>Remove</span>
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedProperties;
