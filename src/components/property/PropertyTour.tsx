
import React from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { FileVideo, FileImage } from "lucide-react";
import { Property } from "@/types/property";

interface PropertyTourProps {
  property: Property;
}

export const PropertyTour = ({ property }: PropertyTourProps) => {
  const { has3DTour, hasVirtualTour } = property;

  if (!has3DTour && !hasVirtualTour) return null;

  return (
    <div className="flex gap-2 mt-4">
      {has3DTour && (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <FileImage className="h-4 w-4" />
              View 3D Tour
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-6">
              <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
                {/* This is where you would integrate your actual 3D tour provider */}
                <p className="text-muted-foreground">3D Tour Placeholder</p>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}

      {hasVirtualTour && (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <FileVideo className="h-4 w-4" />
              Virtual Tour
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-6">
              <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
                {/* This is where you would integrate your actual virtual tour provider */}
                <p className="text-muted-foreground">Virtual Tour Placeholder</p>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
