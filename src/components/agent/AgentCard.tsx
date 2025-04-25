
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { Agent } from "@/types/agent";

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-16 w-16">
          <AvatarImage src={agent.imageUrl} alt={agent.name} />
          <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{agent.name}</h3>
          <p className="text-sm text-muted-foreground">{agent.title}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{agent.bio}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {agent.specialties.map((specialty) => (
            <Badge key={specialty} variant="secondary">
              {specialty}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {agent.experience} years of experience
        </p>
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="w-full">
            <Mail className="mr-2 h-4 w-4" />
            {agent.email}
          </Button>
          <Button variant="outline" className="w-full">
            <Phone className="mr-2 h-4 w-4" />
            {agent.phone}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
