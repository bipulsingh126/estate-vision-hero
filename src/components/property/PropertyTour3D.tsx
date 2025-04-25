
import React, { useState } from "react";
import { Property } from "@/types/property";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface PropertyTour3DProps {
  property: Property;
}

export const PropertyTour3D = ({ property }: PropertyTour3DProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  
  // Use a placeholder image instead of an iframe that might get blocked
  const tourUrl = "https://my.matterport.com/show/?m=SxQL3iGyoDo";
  const placeholderImage = "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop";

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setLoadError(true);
    setIsLoading(false);
  };

  const openTourInNewWindow = () => {
    window.open(tourUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="h-[400px] relative">
      <div className="absolute inset-0 bg-muted rounded-lg flex items-center justify-center">
        {isLoading && !loadError && (
          <div className="flex flex-col items-center gap-2 p-4">
            <Progress value={45} className="w-[60%]" />
            <p className="text-sm text-muted-foreground">Loading 3D Tour...</p>
          </div>
        )}
        
        {loadError ? (
          <div className="text-center p-4">
            <div className="h-48 mb-4 relative rounded overflow-hidden">
              <img 
                src={placeholderImage} 
                alt="3D Tour Preview" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <p className="text-white font-medium">3D Tour Preview</p>
              </div>
            </div>
            <p className="mb-2">3D tour cannot be embedded here</p>
            <p className="text-sm text-muted-foreground mb-4">
              Click below to open the 3D tour in a new window
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={openTourInNewWindow}
            >
              Open 3D Tour
            </Button>
          </div>
        ) : (
          <div className="w-full h-full">
            {/* Use an onError handler to catch CSP or other loading issues */}
            <img 
              src={placeholderImage} 
              alt="3D Tour Preview" 
              className="w-full h-full object-cover rounded-lg"
              onLoad={() => setIsLoading(false)}
              onError={handleIframeError}
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
        )}
      </div>
    </div>
  );
};
