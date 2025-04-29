import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PropertyFilters } from "@/components/property/PropertyFilters";
import PropertiesGrid from "./property/PropertiesGrid";
import { sampleProperties } from "@/data/sampleProperties";
import { ContentTemplate } from "./templates/ContentTemplate";
import { Property, PropertyFilters as PropertyFiltersType } from "@/types/property";
import SearchFilters from "./SearchFilters";
import NoResultsFound from "./property/NoResultsFound";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface FeaturedListingsProps {
  isPreview?: boolean;
}

const FeaturedListings: React.FC<FeaturedListingsProps> = ({ isPreview = false }) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchFilters, setSearchFilters] = useState<PropertyFiltersType>({
    location: "_any",
    propertyType: "_any",
    bedrooms: "_any",
    priceRange: [5000000],
    searchTerm: ""
  });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Use ref for available properties to avoid dependency issues
  const availablePropertiesRef = useRef<Property[]>(
    isPreview ? sampleProperties.slice(0, 6) : sampleProperties
  );
  
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(
    availablePropertiesRef.current
  );
  
  // Apply filters when they change - store the filter function in a ref
  const filterPropertiesRef = useRef((activeFilter: string, searchFilters: PropertyFiltersType) => {
    return availablePropertiesRef.current.filter(property => {
      // Filter by property status (all, sale, rent)
      if (activeFilter !== "all") {
        if (activeFilter === "sale" && property.status !== "For Sale") return false;
        if (activeFilter === "rent" && property.status !== "For Rent") return false;
      }

      // Filter by location (city)
      if (searchFilters.location && searchFilters.location !== "_any" && property.city) {
        if (!property.city.toLowerCase().includes(searchFilters.location.toLowerCase())) {
          return false;
        }
      }

      // Filter by property type
      if (searchFilters.propertyType && searchFilters.propertyType !== "_any" && property.propertyType) {
        if (property.propertyType.toLowerCase() !== searchFilters.propertyType.toLowerCase()) {
          return false;
        }
      }

      // Filter by bedrooms
      if (searchFilters.bedrooms && searchFilters.bedrooms !== "_any") {
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
  });

  useEffect(() => {
    setFilteredProperties(filterPropertiesRef.current(activeFilter, searchFilters));
  }, [activeFilter, searchFilters]);

  const handleFilterChange = (filters: PropertyFiltersType) => {
    if (isPreview && !isAuthenticated) {
      // If in preview mode and not logged in, prompt to sign in for full functionality
      toast.info("Sign in to access full search and filter features");
      return;
    }
    setSearchFilters(filters);
  };

  const handleViewAllProperties = () => {
    if (isAuthenticated) {
      navigate('/properties');
    } else {
      navigate('/login');
    }
  };

  const resetFilters = () => {
    setSearchFilters({
      location: "_any",
      propertyType: "_any",
      bedrooms: "_any",
      priceRange: [5000000],
      searchTerm: ""
    });
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
            onFilterChange={isPreview && !isAuthenticated ? () => {
              toast.info("Sign in to access all filtering features");
            } : setActiveFilter}
          />
        </ContentTemplate>
        
        {!isPreview && (
          <div className="mb-10">
            <SearchFilters onFilterChange={handleFilterChange} />
          </div>
        )}

        {filteredProperties.length > 0 ? (
          <PropertiesGrid 
            properties={filteredProperties} 
            isPreview={isPreview} 
            onResetFilters={resetFilters}
          />
        ) : (
          <NoResultsFound onReset={resetFilters} />
        )}
        
        {!isPreview && (
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" className="px-8" onClick={handleViewAllProperties}>
              View All Properties
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListings;
