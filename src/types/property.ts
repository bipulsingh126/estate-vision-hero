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
  tourUrl3D?: string; // URL for 3D Tour
  tourUrlVirtual?: string; // URL for Virtual Tour
  lat?: number; // Latitude for map location
  lng?: number; // Longitude for map location
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
  isPremium?: boolean;
  status?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'oldest';
}

