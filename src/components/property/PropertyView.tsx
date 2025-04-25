
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Property } from "@/types/property";
import { PropertyDetails } from "./PropertyDetails";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PropertyViewProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyView = ({ property, isOpen, onClose }: PropertyViewProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[90vh]">
        <DialogHeader>
          <DialogTitle>{property.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full">
          <div className="space-y-6">
            {/* Hero Image */}
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Property Details */}
            <PropertyDetails property={property} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
