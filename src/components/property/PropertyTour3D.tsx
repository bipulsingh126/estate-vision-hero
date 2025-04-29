import React, { useState } from "react";
import { Property } from "@/types/property";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface PropertyTour3DProps {
  property: Property;
}

export const PropertyTour3D = ({ property }: PropertyTour3DProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  
  // Use property-specific tour URL if available, otherwise use default
  const tourUrl = property.tourUrl3D || "https://my.matterport.com/show/?m=SxQL3iGyoDo";
  const placeholderImage = property.imageUrl || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop";

  const openTourInNewWindow = () => {
    window.open(tourUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="h-[400px] relative">
      <div className="absolute inset-0 bg-muted rounded-lg flex items-center justify-center">
        <div className="w-full h-full">
          <img 
            src={placeholderImage} 
            alt="3D Tour Preview" 
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Button 
              variant="secondary" 
              className="gap-2"
              onClick={openTourInNewWindow}
            >
              <Eye className="h-4 w-4" />
              View 3D Tour
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
