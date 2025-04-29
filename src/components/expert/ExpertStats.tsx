import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Award, 
  Home, 
  Building, 
  Briefcase, 
  Star,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { EnhancedAvatar } from "@/components/ui/enhanced-avatar";
import { sampleAgents } from "@/data/expertData";

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatItem = ({ icon, value, label }: StatItemProps) => (
  <div className="flex flex-col items-center">
    <div className="bg-estate-navy/10 p-3 rounded-full mb-3">
      {icon}
    </div>
    <p className="text-2xl font-bold mb-1">{value}</p>
    <p className="text-gray-500 text-sm">{label}</p>
  </div>
);

interface ExpertStatsProps {
  variant?: "default" | "compact" | "full";
  className?: string;
  expertCount?: number;
  totalExperience?: number;
  featuredExpertIds?: string[];
}

const ExpertStats = ({ 
  variant = "default", 
  className = "",
  expertCount = 20,
  totalExperience = 165,
  featuredExpertIds = ["1", "4", "7"]
}: ExpertStatsProps) => {
  // Get featured experts from the sampleAgents data
  const featuredExperts = React.useMemo(() => {
    return sampleAgents
      .filter(agent => featuredExpertIds.includes(agent.id))
      .map(agent => ({
        id: agent.id,
        name: agent.name,
        title: agent.title,
        imageUrl: agent.imageUrl,
        specialties: agent.specialties.slice(0, 2),
        experience: agent.experience
      }));
  }, [featuredExpertIds]);
  
  // Different styling based on variant
  switch (variant) {
    case "compact":
      return (
        <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-estate-navy flex items-center">
              <Users className="h-5 w-5 mr-2 text-estate-gold" />
              Our Expert Team
            </h3>
            <Button asChild variant="outline" size="sm">
              <Link to="/meet-experts">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <StatItem 
              icon={<Users className="h-5 w-5 text-estate-navy" />} 
              value={`${expertCount}+`} 
              label="Expert Agents" 
            />
            <StatItem 
              icon={<Award className="h-5 w-5 text-estate-navy" />} 
              value={`${totalExperience}+`} 
              label="Years Experience" 
            />
            <StatItem 
              icon={<Home className="h-5 w-5 text-estate-navy" />} 
              value="1000+" 
              label="Properties Sold" 
            />
          </div>
          
          <div className="flex items-center gap-2">
            {featuredExperts.map(expert => (
              <div 
                key={expert.id} 
                className="flex-1 p-2 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-all text-center"
              >
                <EnhancedAvatar
                  className="mx-auto mb-2 h-14 w-14"
                  src={expert.imageUrl}
                  alt={expert.name}
                />
                <h4 className="font-medium text-sm mb-1 line-clamp-1">{expert.name}</h4>
                <p className="text-xs text-gray-500 line-clamp-1">{expert.title}</p>
              </div>
            ))}
          </div>
        </div>
      );
      
    case "full":
      return (
        <div className={`${className}`}>
          <div className="bg-estate-navy text-white py-16 rounded-xl mb-8">
            <div className="container-custom">
              <div className="text-center mb-12">
                <Badge variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white/20 font-normal px-3 py-1 mb-4">
                  <Award className="mr-2 h-4 w-4" />
                  Real Estate Experts
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Award-Winning Team</h2>
                <p className="text-white/80 max-w-2xl mx-auto">
                  Our team of experienced real estate professionals is dedicated to providing exceptional 
                  service and helping you achieve your property goals.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatItem 
                  icon={<Users className="h-6 w-6 text-estate-gold" />} 
                  value={`${expertCount}+`} 
                  label="Expert Agents" 
                />
                <StatItem 
                  icon={<Award className="h-6 w-6 text-estate-gold" />} 
                  value={`${totalExperience}+`} 
                  label="Years Combined Experience" 
                />
                <StatItem 
                  icon={<Home className="h-6 w-6 text-estate-gold" />} 
                  value="1000+" 
                  label="Properties Sold" 
                />
                <StatItem 
                  icon={<TrendingUp className="h-6 w-6 text-estate-gold" />} 
                  value="₹2B+" 
                  label="Sales Volume" 
                />
              </div>
            </div>
          </div>
          
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-estate-navy flex items-center">
                <Star className="h-5 w-5 mr-2 text-estate-gold" />
                Featured Experts
              </h3>
              <Button asChild>
                <Link to="/meet-experts">
                  View All Experts
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredExperts.map(expert => (
                <Card key={expert.id} className="overflow-hidden hover:shadow-md transition-all">
                  <div className="relative">
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-estate-gold text-white">
                        <Star className="h-3 w-3 mr-1" /> Featured
                      </Badge>
                    </div>
                    <div className="h-40 bg-gradient-to-r from-estate-navy to-slate-700 flex items-center justify-center">
                      <EnhancedAvatar
                        className="h-24 w-24 border-4 border-white/20"
                        src={expert.imageUrl}
                        alt={expert.name}
                        fallbackClassName="text-xl bg-estate-gold text-white"
                      />
                    </div>
                  </div>
                  
                  <CardContent className="p-6 text-center">
                    <h4 className="text-xl font-semibold mb-1">{expert.name}</h4>
                    <p className="text-gray-500 mb-3">{expert.title}</p>
                    <div className="flex justify-center gap-2 mb-4">
                      {expert.specialties.map(specialty => (
                        <Badge key={specialty} variant="outline" className="bg-gray-50">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button asChild variant="outline">
                        <Link to={`/agents/${expert.id}`}>View Profile</Link>
                      </Button>
                      <Button className="bg-estate-gold hover:bg-amber-500">
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      );
      
    // Default variant
    default:
      return (
        <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
            <div className="p-6 text-center">
              <Users className="h-10 w-10 text-estate-gold mx-auto mb-3" />
              <h3 className="text-4xl font-bold mb-2">{expertCount}+</h3>
              <p className="text-gray-600">Expert Agents</p>
            </div>
            <div className="p-6 text-center">
              <Award className="h-10 w-10 text-estate-gold mx-auto mb-3" />
              <h3 className="text-4xl font-bold mb-2">{totalExperience}+</h3>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="p-6 text-center">
              <Building className="h-10 w-10 text-estate-gold mx-auto mb-3" />
              <h3 className="text-4xl font-bold mb-2">500+</h3>
              <p className="text-gray-600">Properties Listed</p>
            </div>
          </div>
          
          <div className="p-6 text-center border-t">
            <h3 className="font-semibold mb-4">Work with our team of real estate experts</h3>
            <Button asChild>
              <Link to="/meet-experts">Meet Our Experts</Link>
            </Button>
          </div>
        </div>
      );
  }
};

export default ExpertStats; 