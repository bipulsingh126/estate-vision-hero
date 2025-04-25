
import { Building, MapPin, Bed, ArrowsUpFromLine } from "lucide-react";
import { Property } from "@/types/property";
import { PropertyTour } from "./PropertyTour";

interface PropertyDetailsProps {
  property: Property;
}

export const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  return (
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

      {/* Property Tour Options */}
      <PropertyTour property={property} />
    </div>
  );
};
