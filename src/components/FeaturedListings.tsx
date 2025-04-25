import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PropertyFilters } from "@/components/property/PropertyFilters";
import { PropertiesGrid } from "./property/PropertiesGrid";
import { sampleProperties } from "@/data/sampleProperties";
import { ContentTemplate } from "./templates/ContentTemplate";
import { Property, PropertyFilters as PropertyFiltersType } from "@/types/property";
import SearchFilters from "./SearchFilters";
import { NoResultsFound } from "./property/NoResultsFound";

const FeaturedListings = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchFilters, setSearchFilters] = useState<PropertyFiltersType>({
    location: "",
    propertyType: "",
    bedrooms: "",
    priceRange: [5000000],
    searchTerm: ""
  });
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(sampleProperties);
  
  // Apply filters when they change
  useEffect(() => {
    const filterProperties = () => {
      return sampleProperties.filter(property => {
        // Filter by property status (all, sale, rent)
        if (activeFilter !== "all") {
          if (activeFilter === "sale" && property.status !== "For Sale") return false;
          if (activeFilter === "rent" && property.status !== "For Rent") return false;
        }

        // Filter by location (city)
        if (searchFilters.location && property.city) {
          if (!property.city.toLowerCase().includes(searchFilters.location.toLowerCase())) {
            return false;
          }
        }

        // Filter by property type
        if (searchFilters.propertyType && property.propertyType) {
          if (property.propertyType.toLowerCase() !== searchFilters.propertyType.toLowerCase()) {
            return false;
          }
        }

        // Filter by bedrooms
        if (searchFilters.bedrooms) {
          const minBedrooms = parseInt(searchFilters.bedrooms);
          if (property.bedrooms < minBedrooms) {
            return false;
          }
        }

        // Filter by price
        if (searchFilters.priceRange && searchFilters.priceRange.length > 0) {
          const maxPrice = searchFilters.priceRange[0];
          if (property.price > maxPrice) {
            return false;
          }
        }

        // Filter by search term (title or description)
        if (searchFilters.searchTerm) {
          const term = searchFilters.searchTerm.toLowerCase();
          const titleMatch = property.title.toLowerCase().includes(term);
          const descriptionMatch = property.description ? 
            property.description.toLowerCase().includes(term) : 
            false;
          const addressMatch = property.address.toLowerCase().includes(term);
          
          if (!titleMatch && !descriptionMatch && !addressMatch) {
            return false;
          }
        }

        return true;
      });
    };

    setFilteredProperties(filterProperties());
  }, [activeFilter, searchFilters]);

  const handleFilterChange = (filters: PropertyFiltersType) => {
    setSearchFilters(filters);
  };

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
        
        <div className="mb-10">
          <SearchFilters onFilterChange={handleFilterChange} />
        </div>

        {filteredProperties.length > 0 ? (
          <PropertiesGrid properties={filteredProperties} />
        ) : (
          <NoResultsFound onReset={() => setSearchFilters({
            location: "",
            propertyType: "",
            bedrooms: "",
            priceRange: [5000000],
            searchTerm: ""
          })} />
        )}
        
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
