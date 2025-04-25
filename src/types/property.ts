
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
}

