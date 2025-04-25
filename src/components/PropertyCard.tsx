import React, { useState } from "react";
import { PropertyBadges } from "./property/PropertyBadges";
import { PropertyDetails } from "./property/PropertyDetails";
import { cn } from "@/lib/utils";
import { PropertyCardProps } from "@/types/property";
import { IndianRupee } from "lucide-react";
import { PropertyView } from "./property/PropertyView";

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(2)} Lac`;
    } else {
      return new Intl.NumberFormat("en-IN", {
        maximumSignificantDigits: 3,
      }).format(price);
    }
  };

  return (
    <>
      <div
        className="property-card group bg-white shadow-property hover:shadow-property-hover relative"
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
          
          <PropertyBadges property={property} />
          
          {/* Price tag */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-estate-navy/80 to-transparent p-4">
            <div className="text-white font-semibold text-xl flex items-center gap-1">
              <IndianRupee className="h-5 w-5" />
              {formatPrice(property.price)}
              {property.status === "For Rent" && <span className="text-sm font-normal">/month</span>}
            </div>
          </div>
        </div>

        <PropertyDetails property={property} />
        
        {/* View details overlay that appears on hover */}
        <div 
          className={cn(
            "absolute inset-0 bg-estate-navy/80 flex items-center justify-center transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <button 
            onClick={() => setShowDetails(true)}
            className="px-6 py-2 bg-estate-gold text-white font-medium rounded hover:bg-estate-gold/90 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>

      <PropertyView 
        property={property}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
};

export default PropertyCard;
