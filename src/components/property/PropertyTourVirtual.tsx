
import React from "react";
import { Property } from "@/types/property";
import { View } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyTourVirtualProps {
  property: Property;
}

export const PropertyTourVirtual = ({ property }: PropertyTourVirtualProps) => {
  return (
    <div className="h-[400px] relative">
      <div className="absolute inset-0 bg-muted rounded-lg flex items-center justify-center">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Virtual Tour"
          className="w-full h-full rounded-lg"
          allowFullScreen
        />
      </div>
      <Button
        variant="outline"
        size="sm"
        className="absolute bottom-4 right-4 gap-2"
        onClick={() => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")}
      >
        <View className="h-4 w-4" />
        View Fullscreen
      </Button>
    </div>
  );
};
