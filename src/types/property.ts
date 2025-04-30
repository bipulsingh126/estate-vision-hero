export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  status: "For Sale" | "For Rent" | "Sold";
  has3DTour?: boolean;
  hasVirtualTour?: boolean;
  isPremium?: boolean;
  description?: string;
  propertyType?: string; // Added for search filtering
  city?: string; // Added for search filtering
  cityName?: string; // Added for popup display
  tourUrl3D?: string; // URL for 3D Tour
  tourUrlVirtual?: string; // URL for Virtual Tour
  floorPlanUrl?: string; // URL for Floor Plan
  hasFloorPlan?: boolean; // Whether property has a floor plan
  lat?: number; // Latitude for map location
  lng?: number; // Longitude for map location
  type?: string; // Property type like 'Apartment', 'House', etc.
  yearBuilt?: string; // Year the property was built
  lotSize?: number; // Size of the lot in square feet
}

export interface PropertyCardProps {
  property: Property;
}

// Search filter types
export interface PropertyFilters {
  location: string;
  propertyType: string;
  bedrooms: string;
  priceRange: number[];
  searchTerm?: string;
  // Advanced filters
  hasVirtualTour?: boolean;
  has3DTour?: boolean;
  hasFloorPlan?: boolean;
  isPremium?: boolean;
  status?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'oldest';
}
