
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
  
  // Use a more privacy-friendly demo URL
  const tourUrl = "https://my.matterport.com/show/?m=SxQL3iGyoDo";

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setLoadError(true);
    setIsLoading(false);
  };

  return (
    <div className="h-[400px] relative">
      <div className="absolute inset-0 bg-muted rounded-lg flex items-center justify-center">
        {isLoading && (
          <div className="flex flex-col items-center gap-2 p-4">
            <Progress value={45} className="w-[60%]" />
            <p className="text-sm text-muted-foreground">Loading 3D Tour...</p>
          </div>
        )}
        
        {loadError ? (
          <div className="text-center p-4">
            <p className="mb-2">Unable to load 3D tour</p>
            <p className="text-sm text-muted-foreground mb-4">
              Your browser may be blocking third-party content.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(tourUrl, "_blank")}
            >
              Open in New Window
            </Button>
          </div>
        ) : (
          <iframe
            src={tourUrl}
            title="3D Tour"
            className="w-full h-full rounded-lg"
            allowFullScreen
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="absolute bottom-4 right-4 gap-2"
        onClick={() => window.open(tourUrl, "_blank")}
      >
        <Eye className="h-4 w-4" />
        View Fullscreen
      </Button>
    </div>
  );
};
