import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Agent } from "@/types/agent";
import { PhoneCall, Mail, Award, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { EnhancedAvatar } from "@/components/ui/enhanced-avatar";

interface ExpertTemplateProps {
  agent: Agent;
  variant?: "card" | "list" | "featured" | "compact";
  showActions?: boolean;
  className?: string;
}

const ExpertTemplate = ({ 
  agent, 
  variant = "card", 
  showActions = true,
  className = ""
}: ExpertTemplateProps) => {
  // Generate initials for avatar fallback
  const initials = agent.name.split(' ').map(n => n[0]).join('');
  
  // Different styles based on variant
  const renderVariant = () => {
    switch (variant) {
      case "list":
        return (
          <div className={`flex gap-4 p-4 border rounded-lg bg-white hover:shadow-md transition-all ${className}`}>
            <EnhancedAvatar 
              className="h-16 w-16"
              src={agent.imageUrl}
              alt={agent.name}
            />
            
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{agent.name}</h3>
                  <p className="text-gray-500 text-sm">{agent.title}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-estate-gold" />
                  <span className="text-sm">{agent.experience} years</span>
                </div>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-1">
                {agent.specialties.slice(0, 3).map(specialty => (
                  <Badge key={specialty} variant="outline" className="bg-gray-50 text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
              
              {showActions && (
                <div className="mt-4 flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/agents/${agent.id}`}>View Profile</Link>
                  </Button>
                  <Button size="sm" className="bg-estate-gold hover:bg-amber-500">
                    <PhoneCall className="h-3 w-3 mr-1" /> Contact
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
        
      case "featured":
        return (
          <Card className={`overflow-hidden border-estate-gold ${className}`}>
            <div className="relative">
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-estate-gold text-white">
                  <Star className="h-3 w-3 mr-1" /> Featured Expert
                </Badge>
              </div>
              <div className="h-48 bg-gradient-to-r from-estate-navy to-slate-700 flex items-end justify-center p-6">
                <EnhancedAvatar
                  className="h-24 w-24 border-4 border-white/20 translate-y-12"
                  src={agent.imageUrl}
                  alt={agent.name}
                  fallbackClassName="text-xl bg-estate-gold text-white"
                />
              </div>
            </div>
            
            <CardContent className="pt-16 px-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold mb-1">{agent.name}</h3>
                <p className="text-gray-500 mb-3">{agent.title}</p>
                <div className="flex justify-center gap-1 mb-3">
                  <Award className="h-4 w-4 text-estate-gold" />
                  <span className="text-sm text-gray-600">{agent.experience} Years Experience</span>
                </div>
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {agent.specialties.slice(0, 3).map(specialty => (
                    <Badge key={specialty} variant="outline" className="bg-gray-50">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                <p className="text-gray-600 line-clamp-3 text-sm">
                  {agent.bio}
                </p>
              </div>
            </CardContent>
            
            {showActions && (
              <CardFooter className="px-6 pb-6 pt-0">
                <Button asChild className="w-full bg-estate-gold hover:bg-amber-500">
                  <Link to={`/agents/${agent.id}`}>
                    View Full Profile <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        );
        
      case "compact":
        return (
          <div className={`flex items-center gap-3 p-3 border rounded-lg bg-white hover:shadow-sm transition-all ${className}`}>
            <EnhancedAvatar
              className="h-12 w-12"
              src={agent.imageUrl}
              alt={agent.name}
            />
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{agent.name}</h3>
              <p className="text-xs text-gray-500 truncate">{agent.title}</p>
            </div>
            
            {showActions && (
              <Button asChild variant="ghost" size="sm" className="text-estate-navy">
                <Link to={`/agents/${agent.id}`}>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        );
      
      // Default card variant
      default:
        return (
          <Card className={`overflow-hidden hover:shadow-md transition-all ${className}`}>
            <div className="relative">
              <div className="h-40 bg-gradient-to-r from-gray-800 to-gray-700">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <EnhancedAvatar
                    className="h-20 w-20 border-4 border-white"
                    src={agent.imageUrl}
                    alt={agent.name}
                    fallbackClassName="text-xl"
                  />
                </div>
              </div>
            </div>
            
            <CardContent className="pt-12 px-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold mb-1">{agent.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{agent.title}</p>
                <div className="flex justify-center gap-1 text-sm text-gray-600 mb-3">
                  <Award className="h-4 w-4 text-estate-gold" />
                  <span>{agent.experience} Years Experience</span>
                </div>
                <div className="flex flex-wrap justify-center gap-1">
                  {agent.specialties.slice(0, 2).map(specialty => (
                    <Badge key={specialty} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            
            {showActions && (
              <CardFooter className="px-6 pb-6 pt-0 flex gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link to={`/agents/${agent.id}`}>Profile</Link>
                </Button>
                <Button className="flex-1 bg-estate-gold hover:bg-amber-500">
                  <Mail className="h-4 w-4 mr-1" /> Contact
                </Button>
              </CardFooter>
            )}
          </Card>
        );
    }
  };
  
  return renderVariant();
};

export default ExpertTemplate; 