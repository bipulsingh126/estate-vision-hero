import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        gold: "border-transparent bg-estate-gold text-black hover:bg-estate-gold/80",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

// New status badge with pulse animation
interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: 'online' | 'away' | 'busy' | 'offline';
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

function StatusBadge({ 
  status, 
  size = 'md', 
  showPulse = true,
  className, 
  ...props 
}: StatusBadgeProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };
  
  const colorClasses = {
    online: 'bg-green-500',
    away: 'bg-orange-400',
    busy: 'bg-red-500',
    offline: 'bg-gray-400'
  };
  
  return (
    <div className={cn("relative flex items-center justify-center", className)} {...props}>
      <div className={cn("rounded-full", sizeClasses[size], colorClasses[status])} />
      {showPulse && status === 'online' && (
        <div className={cn(
          "absolute top-0 left-0 rounded-full",
          sizeClasses[size],
          "animate-ping opacity-75",
          colorClasses[status]
        )} />
      )}
    </div>
  );
}

export { Badge, badgeVariants, StatusBadge } 