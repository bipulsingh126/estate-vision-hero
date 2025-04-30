import { Building, MapPin, Bed, ArrowsUpFromLine, Video, Box, LayoutTemplate } from "lucide-react";
import { Property } from "@/types/property";
import { PropertyTour } from "./PropertyTour";
import { PropertyFloorPlan } from "./PropertyFloorPlan";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

      {/* Tour availability info */}
      {(property.has3DTour || property.hasVirtualTour || property.hasFloorPlan) && (
        <Card className="mt-4 bg-muted/50">
          <CardContent className="p-3">
            <h4 className="text-sm font-medium mb-2">Available Tours</h4>
            <div className="space-y-2">
              {property.has3DTour && (
                <div className="flex items-start gap-2">
                  <Box size={16} className="mt-0.5 text-primary" />
                  <div>
                    <span className="text-sm font-medium">3D Tour</span>
                    <p className="text-xs text-muted-foreground">
                      Experience a fully interactive 3D walkthrough of this property.
                    </p>
                  </div>
                </div>
              )}
              {property.hasVirtualTour && (
                <div className="flex items-start gap-2">
                  <Video size={16} className="mt-0.5 text-primary" />
                  <div>
                    <span className="text-sm font-medium">Virtual Tour</span>
                    <p className="text-xs text-muted-foreground">
                      Watch a guided video tour showcasing the property's highlights.
                    </p>
                  </div>
                </div>
              )}
              {property.hasFloorPlan && (
                <div className="flex items-start gap-2">
                  <LayoutTemplate size={16} className="mt-0.5 text-primary" />
                  <div>
                    <span className="text-sm font-medium">Interactive Floor Plan</span>
                    <p className="text-xs text-muted-foreground">
                      Explore the property layout with our interactive floor plan.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Property Tour Options */}
      <PropertyTour property={property} />
      
      {/* Floor Plan (if available) */}
      {property.hasFloorPlan && (
        <div className="mt-6">
          <PropertyFloorPlan property={property} />
        </div>
      )}
    </div>
  );
};
