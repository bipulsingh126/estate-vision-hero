import React, { useState } from "react";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sample property data
const sampleProperties = [
  {
    id: "1",
    title: "Modern Penthouse with Ocean View",
    price: 1250000,
    address: "123 Coastal Drive, Miami, FL",
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2100,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Sale" as const,
    has3DTour: true,
    hasVirtualTour: true,
    isPremium: true,
  },
  {
    id: "2",
    title: "Luxurious Apartment in Downtown",
    price: 7500,
    address: "456 Central Ave, Los Angeles, CA",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1500,
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Rent" as const,
    has3DTour: true,
    isPremium: true,
  },
  {
    id: "3",
    title: "Spacious Suburban Family Home",
    price: 875000,
    address: "789 Maple Street, Chicago, IL",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    imageUrl: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Sale" as const,
    has3DTour: false,
    hasVirtualTour: false,
    isPremium: false,
  },
  {
    id: "4",
    title: "Contemporary Urban Loft",
    price: 5200,
    address: "101 Broadway, New York, NY",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 950,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Rent" as const,
    has3DTour: false,
    hasVirtualTour: true,
    isPremium: false,
  },
  {
    id: "5",
    title: "Waterfront Villa with Private Pool",
    price: 2400000,
    address: "555 Lakeside Dr, Austin, TX",
    bedrooms: 5,
    bathrooms: 4.5,
    sqft: 4200,
    imageUrl: "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Sale" as const,
    has3DTour: true,
    hasVirtualTour: false,
    isPremium: true,
  },
  {
    id: "6",
    title: "Mid-Century Modern Bungalow",
    price: 680000,
    address: "222 Palm Avenue, Seattle, WA",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1850,
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "Sold" as const,
    has3DTour: false,
    hasVirtualTour: false,
    isPremium: false,
  },
  {
    id: "7",
    title: "Elegant Victorian Townhouse",
    price: 1850000,
    address: "333 Heritage Lane, Boston, MA",
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3200,
    imageUrl: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Sale" as const,
    has3DTour: true,
    hasVirtualTour: true,
    isPremium: true,
  },
  {
    id: "8",
    title: "Mountain View Cabin",
    price: 450000,
    address: "789 Pine Trail, Denver, CO",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1200,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Sale" as const,
    has3DTour: false,
    hasVirtualTour: true,
    isPremium: false,
  },
  {
    id: "9",
    title: "Beachfront Studio",
    price: 3200,
    address: "101 Ocean Drive, San Diego, CA",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    imageUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Rent" as const,
    has3DTour: true,
    hasVirtualTour: false,
    isPremium: false,
  },
  {
    id: "10",
    title: "Skyline Penthouse",
    price: 3500000,
    address: "888 Downtown Blvd, Chicago, IL",
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2800,
    imageUrl: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Sale" as const,
    has3DTour: true,
    hasVirtualTour: true,
    isPremium: true,
  },
  {
    id: "11",
    title: "Garden Oasis Condo",
    price: 4200,
    address: "444 Green Street, Portland, OR",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Rent" as const,
    has3DTour: false,
    hasVirtualTour: true,
    isPremium: false,
  },
  {
    id: "12",
    title: "Historic Brownstone",
    price: 2100000,
    address: "567 Heritage Row, Brooklyn, NY",
    bedrooms: 4,
    bathrooms: 2.5,
    sqft: 2900,
    imageUrl: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Sale" as const,
    has3DTour: true,
    hasVirtualTour: false,
    isPremium: true,
  },
  {
    id: "13",
    title: "Desert Modern Estate",
    price: 1750000,
    address: "999 Cactus Road, Phoenix, AZ",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3500,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Sale" as const,
    has3DTour: true,
    hasVirtualTour: true,
    isPremium: true,
  },
  {
    id: "14",
    title: "Lakeside Cottage",
    price: 575000,
    address: "234 Lake View Drive, Minneapolis, MN",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1600,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Sale" as const,
    has3DTour: false,
    hasVirtualTour: true,
    isPremium: false,
  },
  {
    id: "15",
    title: "Urban Micro Loft",
    price: 2800,
    address: "777 City Center, San Francisco, CA",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 500,
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Rent" as const,
    has3DTour: true,
    hasVirtualTour: false,
    isPremium: false,
  },
  {
    id: "16",
    title: "Wine Country Villa",
    price: 4200000,
    address: "555 Vineyard Lane, Napa, CA",
    bedrooms: 5,
    bathrooms: 4.5,
    sqft: 4800,
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Sale" as const,
    has3DTour: true,
    hasVirtualTour: true,
    isPremium: true,
  },
  {
    id: "17",
    title: "Downtown Artist Studio",
    price: 3500,
    address: "123 Gallery Row, Nashville, TN",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 800,
    imageUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Rent" as const,
    has3DTour: false,
    hasVirtualTour: true,
    isPremium: false,
  },
  {
    id: "18",
    title: "Golf Course Estate",
    price: 2950000,
    address: "444 Fairway Drive, Palm Springs, CA",
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3800,
    imageUrl: "https://images.unsplash.com/photo-1600566752354-0b51c3ba2376?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Sale" as const,
    has3DTour: true,
    hasVirtualTour: true,
    isPremium: true,
  },
  {
    id: "19",
    title: "Industrial Chic Workspace",
    price: 6500,
    address: "888 Warehouse District, Houston, TX",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 2200,
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Rent" as const,
    has3DTour: true,
    hasVirtualTour: false,
    isPremium: true,
  },
  {
    id: "20",
    title: "Coastal Contemporary",
    price: 3100000,
    address: "777 Beach Road, Charleston, SC",
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3200,
    imageUrl: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "For Sale" as const,
    has3DTour: true,
    hasVirtualTour: true,
    isPremium: true,
  }
];

const FeaturedListings = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const filters = [
    { id: "all", name: "All Properties" },
    { id: "sale", name: "For Sale" },
    { id: "rent", name: "For Rent" },
  ];
  
  const filteredProperties = sampleProperties.filter(property => {
    if (activeFilter === "all") return true;
    if (activeFilter === "sale") return property.status === "For Sale";
    if (activeFilter === "rent") return property.status === "For Rent";
    return true;
  });

  return (
    <section id="properties" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Properties
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of premium properties designed to match 
            your lifestyle and investment goals.
          </p>
          
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "rounded-full px-6",
                  activeFilter === filter.id ? "" : "text-muted-foreground"
                )}
              >
                {filter.name}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Properties grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {/* View more button */}
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
