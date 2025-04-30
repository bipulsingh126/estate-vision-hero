import React, { useState, useMemo } from "react";
import AgentCard from "@/components/agent/AgentCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Agent } from "@/types/agent";
import { Search, Users, Star, Filter, Award, MapPin } from "lucide-react";

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
    bio: "Michael specializes in commercial real estate and has helped numerous businesses find their perfect location.",
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
    bio: "Emily is passionate about helping first-time homebuyers navigate the real estate market with confidence.",
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
    bio: "Robert specializes in ultra-luxury properties and has a network of high-net-worth clients looking for exceptional homes.",
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
    bio: "Priya helps clients with international property transactions and relocation services across multiple countries.",
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
    bio: "David works with developers and investors on new construction and property development projects.",
    specialties: ["New Construction", "Development", "Project Management", "Investment"],
    experience: 7,
    listings: ["17", "18", "19"]
  }
];

// Location filters
const locations = [
  { id: 'mumbai', name: 'Mumbai' },
  { id: 'delhi', name: 'Delhi' },
  { id: 'bangalore', name: 'Bangalore' },
  { id: 'hyderabad', name: 'Hyderabad' },
  { id: 'chennai', name: 'Chennai' },
];

// Specialty categories
const specialties = [
  { id: 'luxury', name: 'Luxury Homes' },
  { id: 'investment', name: 'Investment Properties' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'residential', name: 'Residential' },
  { id: 'first-time', name: 'First-Time Buyers' },
  { id: 'international', name: 'International' },
];

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("any");
  const [selectedExperience, setSelectedExperience] = useState("any");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Featured agents (top 3 by experience)
  const featuredAgents = [...sampleAgents]
    .sort((a, b) => b.experience - a.experience)
    .slice(0, 3);
  
  // Filter agents based on search and filters
  const filteredAgents = useMemo(() => {
    return sampleAgents.filter(agent => {
      // Text search
      if (searchTerm && !agent.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !agent.bio.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !agent.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Specialty filter
      if (selectedSpecialty && selectedSpecialty !== "any" && !agent.specialties.some(s => 
        s.toLowerCase().includes(selectedSpecialty.toLowerCase()))) {
        return false;
      }
      
      // Experience filter
      if (selectedExperience && selectedExperience !== "any") {
        const minExperience = parseInt(selectedExperience);
        if (agent.experience < minExperience) {
          return false;
        }
      }
      
      // Filter by agent type (using the tabs)
      if (activeFilter === "luxury" && !agent.specialties.some(s => 
        s.toLowerCase().includes("luxury"))) {
        return false;
      }
      if (activeFilter === "commercial" && !agent.specialties.some(s => 
        s.toLowerCase().includes("commercial") || s.toLowerCase().includes("retail") || s.toLowerCase().includes("office"))) {
        return false;
      }
      if (activeFilter === "residential" && !agent.specialties.some(s => 
        s.toLowerCase().includes("residential") || s.toLowerCase().includes("home") || s.toLowerCase().includes("condo"))) {
        return false;
      }
      
      return true;
    });
  }, [searchTerm, selectedSpecialty, selectedExperience, activeFilter]);
  
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSpecialty("any");
    setSelectedExperience("any");
    setSelectedLocation("");
    setActiveFilter("all");
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-estate-navy to-slate-800 text-white py-16 mb-12">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="container-custom relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white/20 font-normal px-3 py-1 mb-4">
              <Users className="mr-2 h-4 w-4" />
              Meet Our Experts
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Real Estate Professionals</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Connect with our experienced agents who are dedicated to helping you 
              find your perfect property and guiding you through every step of your real estate journey.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search by agent name, specialty, or location..."
                className="pl-10 py-6 h-14 text-base bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <main className="container-custom pb-16">
        {/* Featured Agents Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-estate-navy flex items-center">
              <Award className="mr-2 h-5 w-5 text-estate-gold" />
              Featured Agents
            </h2>
            <Badge variant="outline" className="px-3 py-1 font-normal">
              <Star className="mr-1 h-3 w-3 text-amber-500" />
              Top Performers
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} featured={true} />
            ))}
          </div>
        </section>
        
        {/* Filter Section */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-estate-navy flex items-center">
              <Users className="mr-2 h-5 w-5 text-estate-gold" />
              All Agents
            </h2>
            
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center rounded-md border border-gray-200 h-9 px-3">
                <Filter className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">Filters:</span>
                {selectedSpecialty && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedSpecialty}
                  </Badge>
                )}
                {selectedExperience && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedExperience}+ Years
                  </Badge>
                )}
                {selectedLocation && (
                  <Badge variant="secondary" className="ml-2 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {selectedLocation}
                  </Badge>
                )}
                {(selectedSpecialty || selectedExperience || selectedLocation) && (
                  <Button variant="ghost" className="h-6 px-2 ml-1" onClick={resetFilters}>
                    Clear
                  </Button>
                )}
              </div>
              
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-32 h-9">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Specialty</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty.id} value={specialty.name}>
                      {specialty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                <SelectTrigger className="w-40 h-9">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Experience</SelectItem>
                  <SelectItem value="5">5+ Years</SelectItem>
                  <SelectItem value="10">10+ Years</SelectItem>
                  <SelectItem value="15">15+ Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveFilter}>
            <TabsList className="mb-8 w-full justify-start bg-gray-100 p-1">
              <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-white">All Agents</TabsTrigger>
              <TabsTrigger value="luxury" className="flex-1 data-[state=active]:bg-white">Luxury Specialists</TabsTrigger>
              <TabsTrigger value="commercial" className="flex-1 data-[state=active]:bg-white">Commercial</TabsTrigger>
              <TabsTrigger value="residential" className="flex-1 data-[state=active]:bg-white">Residential</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {renderAgentGrid(filteredAgents)}
            </TabsContent>
            
            <TabsContent value="luxury" className="mt-0">
              {renderAgentGrid(filteredAgents)}
            </TabsContent>
            
            <TabsContent value="commercial" className="mt-0">
              {renderAgentGrid(filteredAgents)}
            </TabsContent>
            
            <TabsContent value="residential" className="mt-0">
              {renderAgentGrid(filteredAgents)}
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Call to Action */}
        <section className="bg-slate-50 rounded-xl p-8 text-center border border-slate-100">
          <h2 className="text-2xl font-bold mb-3">Join Our Expert Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Are you a real estate professional looking to grow your career with a supportive and innovative team?
            We're always looking for talented agents to join EstateVision.
          </p>
          <Button size="lg" className="bg-estate-gold hover:bg-amber-500">
            Apply to Join Our Team
          </Button>
        </section>
      </main>
    </div>
  );
  
  function renderAgentGrid(agents: Agent[]) {
    if (agents.length === 0) {
      return (
        <div className="text-center py-16">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium">No Agents Found</h3>
          <p className="text-gray-500 max-w-md mx-auto mt-2 mb-6">
            We couldn't find any agents matching your criteria. Try adjusting your filters.
          </p>
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    );
  }
};

export default Agents;
