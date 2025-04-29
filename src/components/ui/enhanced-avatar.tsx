import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface EnhancedAvatarProps extends React.ComponentPropsWithoutRef<typeof Avatar> {
  src?: string;
  alt?: string;
  fallback?: string;
  fallbackClassName?: string;
}

export const EnhancedAvatar = React.forwardRef<
  React.ElementRef<typeof Avatar>,
  EnhancedAvatarProps
>(({ src, alt, fallback, className, fallbackClassName, ...props }, ref) => {
  const [imageError, setImageError] = React.useState(false);

  // Get initials from alt text or fallback
  const getInitials = (text: string) => {
    return text
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const initials = fallback || (alt ? getInitials(alt) : "");

  return (
    <Avatar ref={ref} className={className} {...props}>
      {src && !imageError && (
        <AvatarImage 
          src={src} 
          alt={alt || "Avatar"} 
          onError={() => setImageError(true)} 
        />
      )}
      <AvatarFallback 
        className={cn(
          "bg-estate-gold text-white", 
          fallbackClassName
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
});

EnhancedAvatar.displayName = "EnhancedAvatar"; 