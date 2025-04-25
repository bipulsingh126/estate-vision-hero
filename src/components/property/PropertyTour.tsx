
import React from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { FileVideo, FileImage } from "lucide-react";
import { Property } from "@/types/property";
import { PropertyTour3D } from "./PropertyTour3D";
import { PropertyTourVirtual } from "./PropertyTourVirtual";

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
          <DrawerContent className="h-[80vh]">
            <div className="p-6">
              <PropertyTour3D property={property} />
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
          <DrawerContent className="h-[80vh]">
            <div className="p-6">
              <PropertyTourVirtual property={property} />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
