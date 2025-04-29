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
    "relative rounded-xl shadow-md transition-all bg-white dark:bg-gray-900 hover:shadow-lg",
    className
  )}>
    <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-estate-gold/20 via-primary/20 to-estate-navy/30 blur-[2px]" />
    <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-tr from-estate-navy/5 via-transparent to-estate-gold/5" />
    <div className="h-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
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
    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
  </div>
);

export const ProfileCard = ({ className, children }: StyleProps) => (
  <div className={cn(
    "relative rounded-xl shadow-md bg-white dark:bg-gray-900 overflow-hidden",
    className
  )}>
    <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-estate-navy to-primary" />
    <div className="pt-14 px-6 pb-6">
      {children}
    </div>
  </div>
);

export const DashboardCard = ({ className, children }: StyleProps) => (
  <div className={cn(
    "rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition-all",
    className
  )}>
    {children}
  </div>
);
