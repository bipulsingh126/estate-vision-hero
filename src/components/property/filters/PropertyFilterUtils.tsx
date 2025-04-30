import { Property, PropertyFilters } from '@/types/property';

// Filter properties based on search filters
export const applyFilters = (
  properties: Property[],
  filters: PropertyFilters
): Property[] => {
  return properties.filter(property => {
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
};

// Determine if any filter is active
export const isFilterActive = (filters: PropertyFilters): boolean => {
  return (
    filters.location !== "_any" ||
    filters.propertyType !== "_any" ||
    filters.bedrooms !== "_any" ||
    (filters.searchTerm !== undefined && filters.searchTerm !== "") ||
    !!filters.hasVirtualTour ||
    !!filters.has3DTour ||
    !!filters.isPremium
  );
};

// Get default filters
export const getDefaultFilters = (statusTab: string = "all"): PropertyFilters => {
  const defaultFilters: PropertyFilters = {
    location: "_any",
    propertyType: "_any",
    bedrooms: "_any",
    priceRange: [5000000],
    searchTerm: ""
  };
  
  // Keep the active tab status filter
  if (statusTab !== "all") {
    defaultFilters.status = statusTab === "sale" ? "For Sale" : "For Rent";
  }
  
  return defaultFilters;
};
