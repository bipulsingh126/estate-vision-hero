import { Agent } from "@/types/agent";

// Generate fallback image URLs using UI Avatars service which doesn't have SSL issues
const getAvatarUrl = (name: string) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=092c48&color=fff&size=200`;
};

// Sample agent data
export const sampleAgents: Agent[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    email: "sarah.j@estatevision.com",
    phone: "(555) 123-4567",
    imageUrl: getAvatarUrl("Sarah Johnson"),
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
    imageUrl: getAvatarUrl("Michael Chen"),
    bio: "Michael specializes in commercial real estate and has helped numerous businesses find their perfect location to thrive and grow. His background in business development gives him unique insights into the needs of commercial clients, from small startups to large enterprises.",
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
    imageUrl: getAvatarUrl("Emily Rodriguez"),
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
    imageUrl: getAvatarUrl("Robert Wilson"),
    bio: "Robert specializes in ultra-luxury properties and has a network of high-net-worth clients looking for exceptional homes. His attention to detail and personalized approach ensure that each client receives the highest level of service throughout the buying or selling process.",
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
    imageUrl: getAvatarUrl("Priya Patel"),
    bio: "Priya helps clients with international property transactions and relocation services across multiple countries. With fluency in multiple languages and extensive knowledge of global real estate markets, she specializes in helping clients navigate cross-border transactions.",
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
    imageUrl: getAvatarUrl("David Kim"),
    bio: "David works with developers and investors on new construction and property development projects. His background in architecture and project management enables him to identify opportunities and guide clients through complex development processes.",
    specialties: ["New Construction", "Development", "Project Management", "Investment"],
    experience: 7,
    listings: ["17", "18", "19"]
  },
  {
    id: "7",
    name: "Sophia Martinez",
    title: "Residential Sales Director",
    email: "sophia.m@estatevision.com",
    phone: "(555) 789-0123",
    imageUrl: getAvatarUrl("Sophia Martinez"),
    bio: "Sophia brings over 15 years of experience in residential real estate, with particular expertise in family homes and suburban properties. Her client-centered approach and deep understanding of local neighborhoods make her a trusted advisor for families looking for their perfect home.",
    specialties: ["Residential", "Family Homes", "Suburban", "Schools"],
    experience: 15,
    listings: ["20", "21", "22"]
  },
  {
    id: "8",
    name: "James Thompson",
    title: "Investment Property Advisor",
    email: "james.t@estatevision.com",
    phone: "(555) 890-1234",
    imageUrl: getAvatarUrl("James Thompson"),
    bio: "James specializes in helping clients build wealth through strategic real estate investments. With a background in finance and property management, he assists investors in identifying properties with strong ROI potential and developing long-term investment strategies.",
    specialties: ["Investment Properties", "Multi-Family", "ROI Analysis", "Portfolio Management"],
    experience: 11,
    listings: ["23", "24", "25"]
  },
  {
    id: "9",
    name: "Aisha Khan",
    title: "Luxury Waterfront Specialist",
    email: "aisha.k@estatevision.com",
    phone: "(555) 901-2345",
    imageUrl: getAvatarUrl("Aisha Khan"),
    bio: "Aisha specializes in luxury waterfront properties, from beachfront villas to lakeside estates. Her extensive network and marketing expertise ensure that her clients' properties receive maximum exposure to qualified buyers, resulting in optimal selling prices.",
    specialties: ["Waterfront", "Luxury Homes", "Beach Properties", "Lake Houses"],
    experience: 9,
    listings: ["26", "27", "28"]
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
  { id: 'waterfront', name: 'Waterfront' },
  { id: 'development', name: 'Development' },
  { id: 'multi-family', name: 'Multi-Family' },
]; 