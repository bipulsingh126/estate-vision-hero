import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CircleUserRound, Phone, Crown, Mail } from 'lucide-react';

interface Agent {
  id: number;
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
  experience: string;
  properties: number;
  specialization: string;
}

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <Card className="border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-estate-gold">
            <AvatarImage src={agent.image} alt={agent.name} />
            <AvatarFallback className="bg-estate-navy text-white">
              <CircleUserRound className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="font-semibold text-estate-navy">{agent.name}</h3>
            <p className="text-sm text-slate-500">{agent.role}</p>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="outline" className="bg-estate-gold/10 text-estate-gold border-estate-gold/20 text-xs px-2 gap-0.5">
                <Crown className="h-3 w-3" />
                Top Agent
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Experience</span>
            <span className="font-medium">{agent.experience}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Properties</span>
            <span className="font-medium">{agent.properties}+</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Specialization</span>
            <span className="font-medium">{agent.specialization}</span>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-slate-700">
            <Phone className="h-4 w-4 text-estate-gold" />
            <span className="text-sm">{agent.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Mail className="h-4 w-4 text-estate-gold" />
            <span className="text-sm">{agent.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 