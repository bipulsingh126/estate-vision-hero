import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Phone, Star, ChevronRight } from "lucide-react";
import { Agent } from "@/types/agent";

interface AgentCardProps {
  agent: Agent;
  featured?: boolean;
}

const AgentCard = ({ agent, featured = false }: AgentCardProps) => {
  return (
    <Card className={`group h-full border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md ${featured ? 'shadow-md' : ''}`}>
      {featured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-amber-500 text-white border-0 font-medium">
            Featured Agent
          </Badge>
        </div>
      )}
      
      <Link to={`/agents/${agent.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {agent.name}'s profile</span>
      </Link>
      
      <div className={`h-40 w-full bg-gradient-to-r from-estate-navy to-slate-800 relative overflow-hidden ${featured ? 'h-48' : ''}`}>
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop')] bg-cover bg-center"></div>
      </div>
      
      <div className="flex justify-center -mt-16 relative z-20 pointer-events-none">
        <Avatar className={`h-24 w-24 border-4 border-white shadow-lg ${featured ? 'h-28 w-28' : ''}`}>
          <AvatarImage src={agent.imageUrl} alt={agent.name} className="object-cover" />
          <AvatarFallback className="text-xl">{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </div>
      
      <CardHeader className="text-center pt-3 pb-2 relative">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold group-hover:text-estate-gold transition-colors">{agent.name}</h3>
          <p className="text-sm text-muted-foreground">{agent.title}</p>
        </div>
        <div className="absolute bottom-0 right-0 transform translate-y-1/2 mr-3 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-auto">
          <Button size="sm" variant="outline" className="rounded-full h-8 w-8 p-0 border-estate-gold bg-white shadow-md" asChild>
            <Link to={`/agents/${agent.id}`}>
              <ChevronRight className="h-4 w-4 text-estate-gold" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="flex justify-center gap-1 items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < agent.experience / 3 ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
          ))}
          <span className="text-xs text-gray-500 ml-1">({agent.experience} years exp.)</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 text-center">{agent.bio}</p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {agent.specialties.slice(0, 3).map((specialty) => (
            <Badge key={specialty} variant="secondary" className="font-normal">
              {specialty}
            </Badge>
          ))}
          {agent.specialties.length > 3 && (
            <Badge variant="outline" className="font-normal">
              +{agent.specialties.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 pointer-events-auto relative z-20">
          <Button variant="outline" className="text-xs h-9" asChild>
            <a href={`mailto:${agent.email}`} onClick={(e) => e.stopPropagation()}>
              <Mail className="mr-1 h-3 w-3" />
              Email
            </a>
          </Button>
          <Button variant="outline" className="text-xs h-9" asChild>
            <a href={`tel:${agent.phone}`} onClick={(e) => e.stopPropagation()}>
              <Phone className="mr-1 h-3 w-3" />
              Call
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
