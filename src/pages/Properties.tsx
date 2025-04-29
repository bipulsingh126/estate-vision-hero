import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { sampleProperties } from '@/data/sampleProperties';
import { Property, PropertyFilters } from '@/types/property';
import AdvancedPropertySearch from '@/components/property/AdvancedPropertySearch';
import PropertySearchResults from '@/components/property/PropertySearchResults';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Building } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';

const Properties = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>(sampleProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(sampleProperties);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchFilters, setSearchFilters] = useState<PropertyFilters>({
    location: "_any",
    propertyType: "_any",
    bedrooms: "_any",
    priceRange: [5000000],
    searchTerm: ""
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;
  const [paginatedProperties, setPaginatedProperties] = useState<Property[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1); // Reset pagination when tab changes
    
    // Apply the status filter based on the selected tab
    if (value === "all") {
      applyFilters({ ...searchFilters, status: undefined });
    } else if (value === "sale") {
      applyFilters({ ...searchFilters, status: "For Sale" });
    } else if (value === "rent") {
      applyFilters({ ...searchFilters, status: "For Rent" });
    }
  };

  // Filter properties based on search filters
  const applyFilters = (filters: PropertyFilters) => {
    setIsLoading(true);
    setCurrentPage(1); // Reset to first page when filters change
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = properties.filter(property => {
        // Filter by status
        if (filters.status && filters.status !== "_any" && property.status !== filters.status) {
          return false;
        }
        
        // Filter by location (city)
        if (filters.location && filters.location !== "_any" && property.city) {
          if (!property.city.toLowerCase().includes(filters.location.toLowerCase())) {
            return false;
          }
        }
        
        // Filter by property type
        if (filters.propertyType && filters.propertyType !== "_any" && property.propertyType) {
          if (property.propertyType.toLowerCase() !== filters.propertyType.toLowerCase()) {
            return false;
          }
        }
        
        // Filter by bedrooms
        if (filters.bedrooms && filters.bedrooms !== "_any") {
          const minBedrooms = parseInt(filters.bedrooms);
          if (property.bedrooms < minBedrooms) {
            return false;
          }
        }
        
        // Filter by price
        if (filters.priceRange && filters.priceRange.length > 0) {
          const maxPrice = filters.priceRange[0];
          if (property.price > maxPrice) {
            return false;
          }
        }
        
        // Filter by search term (title, description, or address)
        if (filters.searchTerm) {
          const term = filters.searchTerm.toLowerCase();
          const titleMatch = property.title.toLowerCase().includes(term);
          const descriptionMatch = property.description ? 
            property.description.toLowerCase().includes(term) : 
            false;
          const addressMatch = property.address.toLowerCase().includes(term);
          
          if (!titleMatch && !descriptionMatch && !addressMatch) {
            return false;
          }
        }
        
        // Filter by virtual tour
        if (filters.hasVirtualTour && !property.hasVirtualTour) {
          return false;
        }
        
        // Filter by 3D tour
        if (filters.has3DTour && !property.has3DTour) {
          return false;
        }
        
        // Filter by premium
        if (filters.isPremium && !property.isPremium) {
          return false;
        }
        
        return true;
      });
      
      setFilteredProperties(filtered);
      setSearchFilters(filters);
      setIsLoading(false);
    }, 500);
  };

  const handleSearch = (filters: PropertyFilters) => {
    setSearchFilters(filters);
    
    // If a status tab is active, make sure to keep that filter
    if (activeTab !== "all" && !filters.status) {
      filters.status = activeTab === "sale" ? "For Sale" : "For Rent";
    }
    
    applyFilters(filters);
  };

  const handleClearSearch = () => {
    const defaultFilters: PropertyFilters = {
      location: "_any",
      propertyType: "_any",
      bedrooms: "_any",
      priceRange: [5000000],
      searchTerm: ""
    };
    
    // Keep the active tab status filter
    if (activeTab !== "all") {
      defaultFilters.status = activeTab === "sale" ? "For Sale" : "For Rent";
    } else {
      defaultFilters.status = "_any";
    }
    
    setSearchFilters(defaultFilters);
    applyFilters(defaultFilters);
  };

  const isFilterActive = () => {
    return (
      searchFilters.location !== "_any" ||
      searchFilters.propertyType !== "_any" ||
      searchFilters.bedrooms !== "_any" ||
      searchFilters.searchTerm !== "" ||
      searchFilters.hasVirtualTour ||
      searchFilters.has3DTour ||
      searchFilters.isPremium
    );
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Calculate total pages and paginate properties
  useEffect(() => {
    const total = Math.ceil(filteredProperties.length / itemsPerPage);
    setTotalPages(total);
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    setPaginatedProperties(filteredProperties.slice(startIndex, endIndex));
  }, [filteredProperties, currentPage, itemsPerPage]);
  
  // Render pagination controls
  const renderPaginationLinks = () => {
    if (totalPages <= 1) return null;
    
    const items = [];
    
    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) handlePageChange(currentPage - 1);
          }}
          className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "hover:text-estate-gold hover:border-estate-gold/30"} transition-colors`}
        />
      </PaginationItem>
    );
    
    // First page
    items.push(
      <PaginationItem key="1">
        <PaginationLink 
          href="#" 
          isActive={currentPage === 1}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(1);
          }}
          className={currentPage === 1 ? "bg-estate-gold text-white hover:bg-estate-gold/90" : "hover:text-estate-gold hover:border-estate-gold/30"}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Ellipsis at the start if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis className="text-slate-400" />
        </PaginationItem>
      );
    }
    
    // Pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last pages as they're handled separately
      
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            href="#" 
            isActive={currentPage === i}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            className={currentPage === i ? "bg-estate-gold text-white hover:bg-estate-gold/90" : "hover:text-estate-gold hover:border-estate-gold/30"}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Ellipsis at the end if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis className="text-slate-400" />
        </PaginationItem>
      );
    }
    
    // Last page (if more than 1 page)
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            href="#" 
            isActive={currentPage === totalPages}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPages);
            }}
            className={currentPage === totalPages ? "bg-estate-gold text-white hover:bg-estate-gold/90" : "hover:text-estate-gold hover:border-estate-gold/30"}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) handlePageChange(currentPage + 1);
          }}
          className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:text-estate-gold hover:border-estate-gold/30"} transition-colors`}
        />
      </PaginationItem>
    );
    
    return items;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Find Your Dream Property</h1>
        
        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="bg-white/10 inline-flex backdrop-blur-sm p-1 rounded-full mb-4"
        >
          <TabsList className="grid grid-cols-3 w-auto">
            <TabsTrigger value="all" className="px-6 data-[state=active]:bg-white data-[state=active]:text-estate-navy">
              All
            </TabsTrigger>
            <TabsTrigger value="sale" className="px-6 data-[state=active]:bg-white data-[state=active]:text-estate-navy">
              <Home className="h-4 w-4 mr-2" />
              For Sale
            </TabsTrigger>
            <TabsTrigger value="rent" className="px-6 data-[state=active]:bg-white data-[state=active]:text-estate-navy">
              <Building className="h-4 w-4 mr-2" />
              For Rent
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 xl:col-span-3">
            <AdvancedPropertySearch 
              onSearch={handleSearch} 
              initialFilters={searchFilters}
              className="sticky top-20"
            />
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            <PropertySearchResults 
              properties={paginatedProperties}
              isLoading={isLoading}
              totalProperties={filteredProperties.length}
              searchTerm={searchFilters.searchTerm}
              onResetFilters={handleClearSearch}
              showClearSearch={isFilterActive()}
              onClearSearch={handleClearSearch}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
            
            {filteredProperties.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent className="bg-white rounded-lg shadow-sm border border-slate-200 p-1.5">
                    {renderPaginationLinks()}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties; 