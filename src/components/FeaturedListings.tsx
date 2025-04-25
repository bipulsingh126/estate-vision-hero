
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PropertyFilters } from "./property/PropertyFilters";
import { PropertiesGrid } from "./property/PropertiesGrid";
import { sampleProperties } from "@/data/sampleProperties";
import { ContentTemplate } from "./templates/ContentTemplate";

const FeaturedListings = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const filteredProperties = sampleProperties.filter(property => {
    if (activeFilter === "all") return true;
    if (activeFilter === "sale") return property.status === "For Sale";
    if (activeFilter === "rent") return property.status === "For Rent";
    return true;
  });

  return (
    <section id="properties" className="section-padding bg-gray-50">
      <div className="container-custom">
        <ContentTemplate variant="highlight" className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Properties
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our handpicked selection of premium properties designed to match 
            your lifestyle and investment goals.
          </p>
          
          <PropertyFilters 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </ContentTemplate>
        
        <PropertiesGrid properties={filteredProperties} />
        
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" className="px-8">
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
