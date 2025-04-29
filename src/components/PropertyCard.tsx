import React, { useState, useEffect } from "react";
import { Property } from "@/types/property";
import { PropertyBadges } from "./property/PropertyBadges";
import { PropertyView } from "./property/PropertyView";
import { ContentTemplate } from "./templates/ContentTemplate";
import { Button } from "./ui/button";
import { Eye, Lock, Bookmark, BookmarkCheck, BedDouble, Bath, Square, Home, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { saveProperty, removeProperty, isPropertySaved } from "@/lib/favorites";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface PropertyCardProps {
  property: Property;
  isPreview?: boolean;
  isListView?: boolean;
}

const PropertyCard = ({ property, isPreview = false, isListView = false }: PropertyCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Check if property is saved on component mount
  useEffect(() => {
    if (isAuthenticated) {
      setIsSaved(isPropertySaved(property.id));
    }
  }, [property.id, isAuthenticated]);

  const handleViewDetails = () => {
    if (isPreview && !isAuthenticated) {
      toast.info("Please sign in to view property details");
      navigate('/login');
      return;
    }
    
    setShowDetails(true);
  };

  const handleToggleSave = () => {
    if (!isAuthenticated) {
      toast.info("Please sign in to save properties");
      navigate('/login');
      return;
    }

    if (isSaved) {
      const success = removeProperty(property.id);
      if (success) setIsSaved(false);
    } else {
      const success = saveProperty(property);
      if (success) setIsSaved(true);
    }
  };
  
  // Grid view (default)
  if (!isListView) {
    return (
      <ContentTemplate 
        variant="gradient" 
        className="property-card overflow-hidden hover:shadow-lg transition-all duration-300 group"
      >
        <div className="relative">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-56 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-700"
          />
          <PropertyBadges property={property} />
          
          {isPreview && !isAuthenticated && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="bg-white/90 py-1 px-3 rounded-full flex items-center gap-1 text-xs">
                <Lock className="h-3 w-3" />
                <span>Sign in to view</span>
              </div>
            </div>
          )}

          {/* Save button */}
          <button 
            className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full shadow-md hover:bg-white transition-colors hover:text-estate-gold z-10"
            onClick={handleToggleSave}
            aria-label={isSaved ? "Remove from saved" : "Save property"}
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 text-estate-gold" />
            ) : (
              <Bookmark className="h-4 w-4 text-slate-600" />
            )}
          </button>
        </div>
        
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Badge variant="outline" className="bg-slate-50 text-slate-600 gap-1 px-2 py-0 h-6">
              <Home className="h-3 w-3 text-estate-gold" />
              {property.propertyType || 'Property'}
            </Badge>
            {property.city && (
              <Badge variant="outline" className="bg-slate-50 text-slate-600 gap-1 px-2 py-0 h-6">
                <MapPin className="h-3 w-3 text-estate-gold" />
                {property.city}
              </Badge>
            )}
          </div>
          
          <h3 className="font-semibold text-lg text-estate-navy mb-1 line-clamp-1 group-hover:text-estate-gold transition-colors">
            {property.title}
          </h3>
          
          <p className="text-slate-500 text-sm line-clamp-2 mb-3 h-10">
            {property.description || property.address}
          </p>
          
          <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-1">
            <div className="flex-1">
              <span className="text-lg font-bold text-estate-gold">
                {formatCurrency(property.price)}
              </span>
              {property.status === "For Rent" && <span className="text-xs text-slate-500 ml-1">/mo</span>}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1.5 border-estate-gold/30 text-estate-navy hover:border-estate-gold hover:text-estate-gold hover:bg-white transition-all"
              onClick={handleViewDetails}
            >
              {isPreview && !isAuthenticated ? (
                <>
                  <Lock className="h-3.5 w-3.5" />
                  <span className="text-xs">Sign in</span>
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5" />
                  <span className="text-xs">Details</span>
                </>
              )}
            </Button>
          </div>
          
          <div className="flex items-center gap-3 mt-3 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5 text-estate-gold" />
              <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-estate-gold" />
              <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Square className="w-3.5 h-3.5 text-estate-gold" />
              <span>{property.sqft.toLocaleString()} ft²</span>
            </div>
          </div>
        </div>

        {(!isPreview || isAuthenticated) && (
          <PropertyView 
            property={property} 
            isOpen={showDetails} 
            onClose={() => setShowDetails(false)} 
          />
        )}
      </ContentTemplate>
    );
  }
  
  // List view
  return (
    <ContentTemplate 
      variant="gradient" 
      className="property-card overflow-hidden hover:shadow-lg transition-all duration-300 group"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image section */}
        <div className="relative md:w-1/3">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-48 md:h-full object-cover md:rounded-l-lg md:rounded-t-none rounded-t-lg group-hover:scale-105 transition-transform duration-700"
          />
          <PropertyBadges property={property} />
          
          {/* Save button */}
          <button 
            className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full shadow-md hover:bg-white transition-colors hover:text-estate-gold z-10"
            onClick={handleToggleSave}
            aria-label={isSaved ? "Remove from saved" : "Save property"}
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 text-estate-gold" />
            ) : (
              <Bookmark className="h-4 w-4 text-slate-600" />
            )}
          </button>
        </div>
        
        {/* Content section */}
        <div className="p-5 md:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <Badge variant="outline" className="bg-slate-50 text-slate-600 gap-1 px-2 py-0 h-6">
                <Home className="h-3 w-3 text-estate-gold" />
                {property.propertyType || 'Property'}
              </Badge>
              {property.city && (
                <Badge variant="outline" className="bg-slate-50 text-slate-600 gap-1 px-2 py-0 h-6">
                  <MapPin className="h-3 w-3 text-estate-gold" />
                  {property.city}
                </Badge>
              )}
            </div>
            
            <h3 className="font-semibold text-lg text-estate-navy mb-1 group-hover:text-estate-gold transition-colors">
              {property.title}
            </h3>
            
            <p className="text-slate-500 text-sm line-clamp-2 mb-3">
              {property.description || property.address}
            </p>
            
            <div className="flex items-center gap-6 mt-3 text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-estate-gold" />
                <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-estate-gold" />
                <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Square className="w-4 h-4 text-estate-gold" />
                <span>{property.sqft.toLocaleString()} ft²</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-4">
            <div>
              <span className="text-xl font-bold text-estate-gold">
                {formatCurrency(property.price)}
              </span>
              {property.status === "For Rent" && <span className="text-xs text-slate-500 ml-1">/mo</span>}
            </div>
            <Button 
              variant="outline" 
              className="gap-2 border-estate-gold/30 text-estate-navy hover:border-estate-gold hover:text-estate-gold hover:bg-white transition-all"
              onClick={handleViewDetails}
            >
              <Eye className="h-4 w-4" />
              View Details
            </Button>
          </div>
        </div>
      </div>

      {(!isPreview || isAuthenticated) && (
        <PropertyView 
          property={property} 
          isOpen={showDetails} 
          onClose={() => setShowDetails(false)} 
        />
      )}
    </ContentTemplate>
  );
};

export default PropertyCard;
