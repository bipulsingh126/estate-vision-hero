
import React from "react";
import { Property } from "@/types/property";
import PropertyCard from "@/components/PropertyCard";

interface PropertiesGridProps {
  properties: Property[];
}

export const PropertiesGrid = ({ properties }: PropertiesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};
