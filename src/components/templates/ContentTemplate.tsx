
import React from "react";
import { Card } from "@/components/ui/card";
import { GlassCard, GradientBorder, HighlightSection } from "@/components/ui/template-styles";

interface ContentTemplateProps {
  children: React.ReactNode;
  variant?: "default" | "glass" | "gradient" | "highlight";
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
    default:
      return (
        <Card className={className}>
          {children}
        </Card>
      );
  }
};
