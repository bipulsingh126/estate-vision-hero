import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExpertProfile from "@/components/agent/ExpertProfile";
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
import { 
  Search, 
  Users, 
  Star, 
  Filter, 
  Award, 
  MapPin, 
  CalendarClock,
  BookOpen,
  Building,
  Home
} from "lucide-react";

// Import the sample agent data from the Agents page
// In a real app, this would be fetched from an API
import { sampleAgents, specialties } from "@/data/expertData";

const expertCategories = [
  { id: "residential", label: "Residential", icon: <Home className="h-4 w-4 mr-2" /> },
  { id: "commercial", label: "Commercial", icon: <Building className="h-4 w-4 mr-2" /> },
  { id: "investment", label: "Investment", icon: <BookOpen className="h-4 w-4 mr-2" /> },
  { id: "experience", label: "Most Experienced", icon: <CalendarClock className="h-4 w-4 mr-2" /> },
];

const MeetExperts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState("any");
  const [selectedExperience, setSelectedExperience] = useState("any");
  
  // Filter experts based on search and filters
  const filteredExperts = useMemo(() => {
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
      
      // Category filter
      if (selectedCategory === "residential" && !agent.specialties.some(s => 
        s.toLowerCase().includes("residential") || s.toLowerCase().includes("home") || s.toLowerCase().includes("condo"))) {
        return false;
      }
      if (selectedCategory === "commercial" && !agent.specialties.some(s => 
        s.toLowerCase().includes("commercial") || s.toLowerCase().includes("retail") || s.toLowerCase().includes("office"))) {
        return false;
      }
      if (selectedCategory === "investment" && !agent.specialties.some(s => 
        s.toLowerCase().includes("investment"))) {
        return false;
      }
      if (selectedCategory === "experience" && agent.experience < 10) {
        return false;
      }
      
      return true;
    });
  }, [searchTerm, selectedCategory, selectedSpecialty, selectedExperience]);
  
  // Get featured experts (top 3 by experience)
  const featuredExperts = useMemo(() => {
    return [...sampleAgents]
      .sort((a, b) => b.experience - a.experience)
      .slice(0, 3);
  }, []);
  
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedSpecialty("any");
    setSelectedExperience("any");
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-estate-navy to-slate-800 text-white py-20">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1577415124269-fc1140a69e91?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="container-custom relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white/20 font-normal px-3 py-1 mb-4">
              <Users className="mr-2 h-4 w-4" />
              Estate Vision Experts
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Expert Team</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Our team of experienced real estate professionals is committed to providing exceptional 
              service and expertise to help you achieve your real estate goals.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search by name, specialty, or expertise..."
                className="pl-10 py-6 h-14 text-base bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Expert Categories */}
      <div className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {expertCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`h-auto py-3 justify-start ${selectedCategory === category.id ? 'bg-estate-navy text-white' : 'bg-white'}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon}
                {category.label} Experts
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container-custom py-16">
        {/* Filter Section */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold text-estate-navy flex items-center">
            {selectedCategory === "all" ? (
              <>
                <Users className="mr-2 h-5 w-5 text-estate-gold" />
                All Experts
              </>
            ) : selectedCategory === "residential" ? (
              <>
                <Home className="mr-2 h-5 w-5 text-estate-gold" />
                Residential Experts
              </>
            ) : selectedCategory === "commercial" ? (
              <>
                <Building className="mr-2 h-5 w-5 text-estate-gold" />
                Commercial Experts
              </>
            ) : selectedCategory === "investment" ? (
              <>
                <BookOpen className="mr-2 h-5 w-5 text-estate-gold" />
                Investment Experts
              </>
            ) : (
              <>
                <CalendarClock className="mr-2 h-5 w-5 text-estate-gold" />
                Most Experienced
              </>
            )}
          </h2>
          
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center rounded-md border border-gray-200 h-9 px-3">
              <Filter className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-500">Filters:</span>
              {(selectedSpecialty !== "any" || selectedExperience !== "any" || searchTerm) && (
                <Button variant="ghost" className="h-6 px-2 ml-1" onClick={resetFilters}>
                  Clear
                </Button>
              )}
            </div>
            
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-36 h-9">
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
        
        {/* Featured Experts Section */}
        {selectedCategory === "all" && !searchTerm && selectedSpecialty === "any" && selectedExperience === "any" && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-estate-navy flex items-center">
                <Award className="mr-2 h-5 w-5 text-estate-gold" />
                Featured Experts
              </h3>
              <Badge variant="outline" className="px-3 py-1 font-normal">
                <Star className="mr-1 h-3 w-3 text-amber-500" />
                Top Performers
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredExperts.map(expert => (
                <ExpertProfile key={expert.id} agent={expert} featured={true} />
              ))}
            </div>
          </section>
        )}
        
        {/* Experts Grid */}
        <section>
          {filteredExperts.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No Experts Found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                We couldn't find any experts matching your search criteria. 
                Try adjusting your filters or search term.
              </p>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExperts.map(expert => (
                <ExpertProfile key={expert.id} agent={expert} />
              ))}
            </div>
          )}
        </section>
        
        {/* Call to Action */}
        <section className="mt-16 bg-slate-50 rounded-xl p-8 text-center border border-slate-100">
          <h2 className="text-2xl font-bold mb-3">Can't Find What You're Looking For?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Our team of experts is ready to assist you with any real estate needs.
            Contact us today for personalized assistance.
          </p>
          <Button size="lg" className="bg-estate-gold hover:bg-amber-500">
            Contact Our Team
          </Button>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MeetExperts; 