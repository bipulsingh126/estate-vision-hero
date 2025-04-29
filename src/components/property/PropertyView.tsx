import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Property } from "@/types/property";
import { PropertyDetails } from "./PropertyDetails";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, Share } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { saveProperty, removeProperty, isPropertySaved } from "@/lib/favorites";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface PropertyViewProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyView = ({ property, isOpen, onClose }: PropertyViewProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Check if property is saved on component mount or when opened
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      setIsSaved(isPropertySaved(property.id));
    }
  }, [property.id, isAuthenticated, isOpen]);

  const handleToggleSave = () => {
    if (!isAuthenticated) {
      toast.info("Please sign in to save properties");
      navigate('/login');
      return;
    }

    if (isSaved) {
      const success = removeProperty(property.id);
      if (success) setIsSaved(false);
    } else {
      const success = saveProperty(property);
      if (success) setIsSaved(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      }).catch(error => {
        console.error('Error sharing:', error);
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success('Link copied to clipboard'))
        .catch(() => toast.error('Failed to copy link'));
    }
  };

  // Helper function to make sure we don't pass undefined to DialogTitle
  const safeTitle = property?.title || "Property Details";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[90vh]">
        <DialogHeader>
          <DialogTitle>{safeTitle}</DialogTitle>
          <div className="flex gap-2 mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={handleToggleSave}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="h-4 w-4 text-primary" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" />
                  <span>Save</span>
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={handleShare}
            >
              <Share className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </DialogHeader>
        <ScrollArea className="h-full">
          <div className="space-y-6">
            {/* Hero Image */}
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
              <img
                src={property.imageUrl}
                alt={safeTitle}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Property Details */}
            <PropertyDetails property={property} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
