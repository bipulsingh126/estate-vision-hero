import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Agent } from "@/types/agent";
import { PhoneCall, Mail, Award, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { EnhancedAvatar } from "@/components/ui/enhanced-avatar";

interface ExpertProfileProps {
  agent: Agent;
  featured?: boolean;
}

const ExpertProfile = ({ agent, featured = false }: ExpertProfileProps) => {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${featured ? 'border-estate-gold' : 'border-gray-200'}`}>
      <div className="relative">
        {featured && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-estate-gold text-white">
              <Star className="h-3 w-3 mr-1" /> Featured Expert
            </Badge>
          </div>
        )}
        <div className="h-48 bg-gradient-to-r from-estate-navy/90 to-slate-700 flex items-center justify-center p-6">
          <EnhancedAvatar 
            className="h-24 w-24 border-4 border-white/20"
            src={agent.imageUrl} 
            alt={agent.name}
            fallbackClassName="text-xl bg-estate-gold text-white"
          />
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-4 text-center">
          <h3 className="text-xl font-semibold mb-1">{agent.name}</h3>
          <p className="text-gray-500 mb-2">{agent.title}</p>
          <div className="flex items-center justify-center gap-1 mb-3">
            <Award className="h-4 w-4 text-estate-gold" />
            <span className="text-sm text-gray-600">{agent.experience} Years Experience</span>
          </div>
          <div className="flex flex-wrap justify-center gap-1 mb-4">
            {agent.specialties.slice(0, 2).map((specialty) => (
              <Badge key={specialty} variant="outline" className="bg-gray-50">
                {specialty}
              </Badge>
            ))}
          </div>
          <p className="text-gray-600 line-clamp-3 mb-4 text-sm">
            {agent.bio}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button asChild variant="outline" className="flex-1">
            <Link to={`/agents/${agent.id}`}>
              View Profile
            </Link>
          </Button>
          <Button variant="default" className="bg-estate-gold hover:bg-amber-500">
            <PhoneCall className="h-4 w-4 mr-2" />
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpertProfile; 