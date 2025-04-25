
import React from "react";
import { Property } from "@/types/property";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyTour3DProps {
  property: Property;
}

export const PropertyTour3D = ({ property }: PropertyTour3DProps) => {
  return (
    <div className="h-[400px] relative">
      <div className="absolute inset-0 bg-muted rounded-lg flex items-center justify-center">
        <iframe
          src="https://www.matterport.com/discover/space/demo"
          title="3D Tour"
          className="w-full h-full rounded-lg"
          allowFullScreen
        />
      </div>
      <Button
        variant="outline"
        size="sm"
        className="absolute bottom-4 right-4 gap-2"
        onClick={() => window.open("https://www.matterport.com/discover/space/demo", "_blank")}
      >
        <Eye className="h-4 w-4" />
        View Fullscreen
      </Button>
    </div>
  );
};
