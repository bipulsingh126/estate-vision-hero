import React from "react";
import { Card } from "@/components/ui/card";
import { 
  GlassCard, 
  GradientBorder, 
  HighlightSection, 
  ProfileCard, 
  DashboardCard 
} from "@/components/ui/template-styles";

interface ContentTemplateProps {
  children: React.ReactNode;
  variant?: "default" | "glass" | "gradient" | "highlight" | "profile" | "dashboard";
  className?: string;
}

export const ContentTemplate = ({ 
  children, 
  variant = "default",
  className = "" 
}: ContentTemplateProps) => {
  switch (variant) {
    case "glass":
      return <GlassCard className={className}>{children}</GlassCard>;
    case "gradient":
      return <GradientBorder className={className}>{children}</GradientBorder>;
    case "highlight":
      return <HighlightSection className={className}>{children}</HighlightSection>;
    case "profile":
      return <ProfileCard className={className}>{children}</ProfileCard>;
    case "dashboard":
      return <DashboardCard className={className}>{children}</DashboardCard>;
    default:
      return (
        <Card className={className}>
          {children}
        </Card>
      );
  }
};
