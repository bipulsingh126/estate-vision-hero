import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgentCard from "@/components/agent/AgentCard";
import { Agent } from "@/types/agent";

// Sample agent data
const sampleAgents: Agent[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    email: "sarah.j@estatevision.com",
    phone: "(555) 123-4567",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=60",
    bio: "With over a decade of experience in luxury real estate, Sarah specializes in high-end properties and investment opportunities.",
    specialties: ["Luxury Homes", "Investment Properties", "Waterfront"],
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
    bio: "Michael specializes in commercial real estate and has helped numerous businesses find their perfect location.",
    specialties: ["Commercial", "Retail Spaces", "Office Buildings"],
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
    bio: "Emily is passionate about helping first-time homebuyers navigate the real estate market with confidence.",
    specialties: ["Residential", "First-Time Buyers", "Condos"],
    experience: 5,
    listings: ["3", "8", "13"]
  }
];

const Agents = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container-custom section-padding">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Real Estate Agents</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet our team of experienced real estate professionals dedicated to helping
            you find your perfect property.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Agents;
