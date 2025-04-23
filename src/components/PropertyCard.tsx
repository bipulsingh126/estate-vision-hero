
import React, { useState } from "react";
import { Building, MapPin, Bed, ArrowsUpFromLine, Video, Cube, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    address: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    imageUrl: string;
    status: "For Sale" | "For Rent" | "Sold";
    has3DTour?: boolean;
    hasVirtualTour?: boolean;
    isPremium?: boolean;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const statusColors = {
    "For Sale": "bg-green-100 text-green-800",
    "For Rent": "bg-blue-100 text-blue-800",
    "Sold": "bg-red-100 text-red-800",
  };

  return (
    <div
      className="property-card group bg-white shadow-property hover:shadow-property-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container with hover effect */}
      <div className="relative h-64 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
          style={{ backgroundImage: `url(${property.imageUrl})` }}
        />
        
        {/* Feature badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge className={cn("font-medium", statusColors[property.status])}>
            {property.status}
          </Badge>
          
          {property.isPremium && (
            <Badge className="bg-estate-gold text-white font-medium">
              <Trophy size={14} className="mr-1" />
              Premium
            </Badge>
          )}
        </div>

        {/* Virtual tour badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {property.has3DTour && (
            <Badge variant="secondary" className="backdrop-blur-md bg-white/30">
              <Cube size={14} className="mr-1" />
              3D Tour
            </Badge>
          )}
          {property.hasVirtualTour && (
            <Badge variant="secondary" className="backdrop-blur-md bg-white/30">
              <Video size={14} className="mr-1" />
              Virtual Tour
            </Badge>
          )}
        </div>
        
        {/* Price tag */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-estate-navy/80 to-transparent p-4">
          <div className="text-white font-semibold text-xl">
            {formatPrice(property.price)}
            {property.status === "For Rent" && <span className="text-sm font-normal ml-1">/month</span>}
          </div>
        </div>
      </div>

      {/* Property details */}
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{property.title}</h3>
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin size={16} className="mr-1" />
          <p className="text-sm line-clamp-1">{property.address}</p>
        </div>

        {/* Property specs */}
        <div className="flex justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <Bed size={16} className="mr-1" />
            <span className="text-sm">{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Building size={16} className="mr-1" />
            <span className="text-sm">{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <ArrowsUpFromLine size={16} className="mr-1" />
            <span className="text-sm">{property.sqft} sqft</span>
          </div>
        </div>
      </div>
      
      {/* View details overlay that appears on hover */}
      <div 
        className={cn(
          "absolute inset-0 bg-estate-navy/80 flex items-center justify-center transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <button className="px-6 py-2 bg-estate-gold text-white font-medium rounded hover:bg-estate-gold/90 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
