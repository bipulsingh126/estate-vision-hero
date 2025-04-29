import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Trophy, Video, Box } from "lucide-react";
import { Property } from "@/types/property";

interface PropertyBadgesProps {
  property: Property;
}

export const PropertyBadges = ({ property }: PropertyBadgesProps) => {
  const statusColors = {
    "For Sale": "bg-green-100 text-green-800",
    "For Rent": "bg-blue-100 text-blue-800",
    "Sold": "bg-red-100 text-red-800",
  };

  return (
    <>
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
            <Box size={14} className="mr-1" />
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
    </>
  );
};

