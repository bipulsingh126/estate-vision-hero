import { Agent } from "@/types/agent";

// Generate fallback image URLs using UI Avatars service which doesn't have SSL issues
const getAvatarUrl = (name: string) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=092c48&color=fff&size=200`;
};

// Export agent data for use in Experts pages
export const sampleAgents: Agent[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    email: "sarah.j@estatevision.com",
    phone: "(555) 123-4567",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=60",
    bio: "With over a decade of experience in luxury real estate, Sarah specializes in high-end properties and investment opportunities in the most sought-after neighborhoods. Her dedication to client satisfaction and extensive market knowledge have earned her numerous industry awards and a loyal client base.",
    specialties: ["Luxury Homes", "Investment Properties", "Waterfront", "Urban Estates"],
    experience: 12,
    listings: ["1", "5", "10", "16"]
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Commercial Property Specialist",
    email: "michael.c@estatevision.com",
    phone: "(555) 234-5678",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&auto=format&fit=crop&q=60",
    bio: "Michael specializes in commercial real estate and has helped numerous businesses find their perfect location. His background in business development gives him unique insights into the needs of commercial clients, from small startups to large enterprises.",
    specialties: ["Commercial", "Retail Spaces", "Office Buildings", "Industrial"],
    experience: 8,
    listings: ["2", "7", "12"]
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    title: "First-Time Home Buyer Expert",
    email: "emily.r@estatevision.com",
    phone: "(555) 345-6789",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&auto=format&fit=crop&q=60",
    bio: "Emily is passionate about helping first-time homebuyers navigate the real estate market with confidence. She understands the unique challenges and concerns of those entering the market, and provides personalized guidance every step of the way.",
    specialties: ["Residential", "First-Time Buyers", "Condos", "Suburban Homes"],
    experience: 5,
    listings: ["3", "8", "13"]
  },
  {
    id: "4",
    name: "Robert Wilson",
    title: "Luxury Property Consultant",
    email: "robert.w@estatevision.com",
    phone: "(555) 456-7890",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&auto=format&fit=crop&q=60",
    bio: "Robert specializes in ultra-luxury properties and has a network of high-net-worth clients looking for exceptional homes. With 15 years of experience in the luxury market, Robert has developed an eye for quality and craftsmanship that sets him apart in the industry.",
    specialties: ["Ultra-Luxury", "Beachfront", "Celebrity Homes", "Penthouses"],
    experience: 15,
    listings: ["4", "9", "14"]
  },
  {
    id: "5",
    name: "Priya Patel",
    title: "International Property Specialist",
    email: "priya.p@estatevision.com",
    phone: "(555) 567-8901",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&auto=format&fit=crop&q=60",
    bio: "Priya helps clients with international property transactions and relocation services across multiple countries. Her multilingual skills and knowledge of global markets make her the perfect agent for international buyers and sellers.",
    specialties: ["International", "Relocation", "Luxury Condos", "Investment"],
    experience: 10,
    listings: ["6", "11", "15"]
  },
  {
    id: "6",
    name: "David Kim",
    title: "Development Project Manager",
    email: "david.k@estatevision.com",
    phone: "(555) 678-9012",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&auto=format&fit=crop&q=60",
    bio: "David works with developers and investors on new construction and property development projects. His background in architecture and urban planning provides a unique perspective on property development opportunities.",
    specialties: ["New Construction", "Development", "Project Management", "Investment"],
    experience: 7,
    listings: ["17", "18", "19"]
  },
  {
    id: "7",
    name: "Jennifer Lopez",
    title: "Residential Sales Specialist",
    email: "jennifer.l@estatevision.com",
    phone: "(555) 789-0123",
    imageUrl: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&auto=format&fit=crop&q=60",
    bio: "Jennifer specializes in helping families find their perfect homes. Her client-centered approach and deep understanding of family needs make her an excellent advocate for homebuyers. With 9 years in residential real estate, she has developed strong negotiation skills.",
    specialties: ["Residential", "Family Homes", "Suburban Properties", "School Districts"],
    experience: 9,
    listings: ["20", "21", "22"]
  },
  {
    id: "8",
    name: "Marcus Washington",
    title: "Urban Property Expert",
    email: "marcus.w@estatevision.com",
    phone: "(555) 890-1234",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&q=60",
    bio: "Marcus specializes in urban properties, from trendy lofts to historic brownstones. His in-depth knowledge of city neighborhoods helps clients find the perfect location that matches their lifestyle. Marcus is particularly skilled at identifying emerging areas with growth potential.",
    specialties: ["Urban Living", "Lofts", "Historic Properties", "Walkability"],
    experience: 6,
    listings: ["23", "24", "25"]
  }
];

// Specialty categories
export const specialties = [
  { id: 'luxury', name: 'Luxury Homes' },
  { id: 'investment', name: 'Investment Properties' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'residential', name: 'Residential' },
  { id: 'first-time', name: 'First-Time Buyers' },
  { id: 'international', name: 'International' },
  { id: 'urban', name: 'Urban Living' },
  { id: 'development', name: 'Development' }
]; 