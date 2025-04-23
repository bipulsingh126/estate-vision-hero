
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
}

export interface PropertyCardProps {
  property: Property;
}
