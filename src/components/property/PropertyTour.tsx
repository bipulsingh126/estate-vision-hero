import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { FileVideo, FileImage, Box, Video, X } from "lucide-react";
import { Property } from "@/types/property";
import { PropertyTour3D } from "./PropertyTour3D";
import { PropertyTourVirtual } from "./PropertyTourVirtual";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

interface PropertyTourProps {
  property: Property;
}

export const PropertyTour = ({ property }: PropertyTourProps) => {
  const { has3DTour, hasVirtualTour } = property;
  const [activeTab, setActiveTab] = useState<"3d" | "video">(has3DTour ? "3d" : "video");
  const [useDialog, setUseDialog] = useState(false);

  // Check if screen is small - use Dialog on mobile, Drawer on larger screens
  React.useEffect(() => {
    const handleResize = () => {
      setUseDialog(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    // Listen for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!has3DTour && !hasVirtualTour) return null;

  const TourContent = () => (
    <div className="p-4 md:p-6">
      {has3DTour && hasVirtualTour ? (
        <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v as "3d" | "video")} className="mb-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid grid-cols-2 w-[300px]">
              <TabsTrigger value="3d" className="flex items-center gap-2">
                <Box className="h-4 w-4" />
                <span>3D Tour</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span>Video Tour</span>
              </TabsTrigger>
            </TabsList>
            
            {useDialog && (
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            )}
          </div>
          
          <TabsContent value="3d" className="mt-4">
            <PropertyTour3D property={property} />
          </TabsContent>
          
          <TabsContent value="video" className="mt-4">
            <PropertyTourVirtual property={property} />
          </TabsContent>
        </Tabs>
      ) : has3DTour ? (
        <div className="relative">
          {useDialog && (
            <div className="absolute top-2 right-2 z-10">
              <DialogClose asChild>
                <Button variant="outline" size="icon" className="rounded-full bg-white/90 hover:bg-white">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          )}
          <PropertyTour3D property={property} />
        </div>
      ) : (
        <div className="relative">
          {useDialog && (
            <div className="absolute top-2 right-2 z-10">
              <DialogClose asChild>
                <Button variant="outline" size="icon" className="rounded-full bg-white/90 hover:bg-white">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          )}
          <PropertyTourVirtual property={property} />
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-2 mt-4">
      <h3 className="text-lg font-medium">Virtual Experience</h3>
      <div className="flex flex-wrap gap-2">
        {useDialog ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-white">
                {has3DTour && hasVirtualTour ? (
                  <>
                    <Box className="h-4 w-4 text-estate-gold" />
                    <span>View Tours</span>
                  </>
                ) : has3DTour ? (
                  <>
                    <Box className="h-4 w-4 text-estate-gold" />
                    <span>View 3D Tour</span>
                  </>
                ) : (
                  <>
                    <Video className="h-4 w-4 text-estate-gold" />
                    <span>View Virtual Tour</span>
                  </>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-full sm:max-w-[90vw] h-[90vh] p-0">
              <TourContent />
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-white">
                {has3DTour && hasVirtualTour ? (
                  <>
                    <Box className="h-4 w-4 text-estate-gold" />
                    <span>View Tours</span>
                  </>
                ) : has3DTour ? (
                  <>
                    <Box className="h-4 w-4 text-estate-gold" />
                    <span>View 3D Tour</span>
                  </>
                ) : (
                  <>
                    <Video className="h-4 w-4 text-estate-gold" />
                    <span>View Virtual Tour</span>
                  </>
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[90vh]">
              <TourContent />
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
};
