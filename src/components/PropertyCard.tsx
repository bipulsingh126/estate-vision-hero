
import React, { useState } from "react";
import { Property } from "@/types/property";
import { PropertyBadges } from "./property/PropertyBadges";
import { PropertyView } from "./property/PropertyView";
import { ContentTemplate } from "./templates/ContentTemplate";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <ContentTemplate variant="gradient" className="property-card">
      <div className="relative">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <PropertyBadges property={property} />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{property.title}</h3>
        <p className="text-muted-foreground line-clamp-2 mb-4">{property.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">${property.price.toLocaleString()}</span>
          <Button 
            variant="secondary" 
            size="sm" 
            className="gap-2"
            onClick={() => setShowDetails(true)}
          >
            <Eye className="h-4 w-4" />
            View Details
          </Button>
        </div>
      </div>

      <PropertyView 
        property={property} 
        isOpen={showDetails} 
        onClose={() => setShowDetails(false)} 
      />
    </ContentTemplate>
  );
};

export default PropertyCard;
