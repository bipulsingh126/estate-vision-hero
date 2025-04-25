
import { cn } from "@/lib/utils";

interface StyleProps {
  className?: string;
  children: React.ReactNode;
}

export const GlassCard = ({ className, children }: StyleProps) => (
  <div className={cn(
    "backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg",
    className
  )}>
    {children}
  </div>
);

export const GradientBorder = ({ className, children }: StyleProps) => (
  <div className={cn(
    "p-[1px] rounded-xl bg-gradient-to-r from-primary/50 to-secondary/50",
    className
  )}>
    <div className="bg-background rounded-xl p-6 h-full">
      {children}
    </div>
  </div>
);

export const HighlightSection = ({ className, children }: StyleProps) => (
  <div className={cn(
    "relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/10 to-primary/10 p-8",
    className
  )}>
    <div className="relative z-10">
      {children}
    </div>
    <div className="absolute inset-0 bg-grid-white/10" />
  </div>
);
