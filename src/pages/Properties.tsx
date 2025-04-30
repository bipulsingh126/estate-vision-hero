import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { sampleProperties } from '@/data/sampleProperties';
import { Property, PropertyFilters } from '@/types/property';
import AdvancedPropertySearch from '@/components/property/AdvancedPropertySearch';
import PropertySearchResults from '@/components/property/PropertySearchResults';
import { PropertyTabs } from '@/components/property/tabs/PropertyTabs';
import { PropertyPagination } from '@/components/property/pagination/PropertyPagination';
import { applyFilters, isFilterActive, getDefaultFilters } from '@/components/property/filters/PropertyFilterUtils';

const Properties = () => {
  const { user } = useAuth();
  const [properties] = useState<Property[]>(sampleProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(sampleProperties);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchFilters, setSearchFilters] = useState<PropertyFilters>(getDefaultFilters());
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
      handleSearch({ ...searchFilters, status: undefined });
    } else if (value === "sale") {
      handleSearch({ ...searchFilters, status: "For Sale" });
    } else if (value === "rent") {
      handleSearch({ ...searchFilters, status: "For Rent" });
    }
  };

  // Apply filters with simulated delay
  const filterProperties = (filters: PropertyFilters) => {
    setIsLoading(true);
    setCurrentPage(1); // Reset to first page when filters change
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = applyFilters(properties, filters);
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
    
    filterProperties(filters);
  };

  const handleClearSearch = () => {
    const defaultFilters = getDefaultFilters(activeTab);
    setSearchFilters(defaultFilters);
    filterProperties(defaultFilters);
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Find Your Dream Property</h1>
        
        <PropertyTabs activeTab={activeTab} onTabChange={handleTabChange} />
        
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
              showClearSearch={isFilterActive(searchFilters)}
              onClearSearch={handleClearSearch}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
            
            {filteredProperties.length > 0 && (
              <PropertyPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
