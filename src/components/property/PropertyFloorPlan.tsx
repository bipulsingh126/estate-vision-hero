import React, { useState } from "react";
import { Property } from "@/types/property";
import { ZoomIn, ZoomOut, RotateCw, RotateCcw, Square, Fullscreen, Maximize, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface PropertyFloorPlanProps {
  property: Property;
}

export const PropertyFloorPlan = ({ property }: PropertyFloorPlanProps) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  
  // Sample floor plan image - fallback to property image if no specific floor plan image
  const floorPlanImage = property.floorPlanUrl || "/images/floor-plans/default-floor-plan.jpg";
  
  // Sample room data
  const rooms = [
    { id: "living", name: "Living Room", size: "20 x 18 ft", area: "360 sq ft", x: 25, y: 30 },
    { id: "kitchen", name: "Kitchen", size: "15 x 12 ft", area: "180 sq ft", x: 65, y: 30 },
    { id: "master", name: "Master Bedroom", size: "18 x 16 ft", area: "288 sq ft", x: 25, y: 70 },
    { id: "bath1", name: "Master Bathroom", size: "10 x 8 ft", area: "80 sq ft", x: 50, y: 70 },
    { id: "bedroom2", name: "Bedroom 2", size: "14 x 12 ft", area: "168 sq ft", x: 70, y: 70 },
  ];
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2.5));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };
  
  const handleRotateClockwise = () => {
    setRotation(prev => (prev + 90) % 360);
  };
  
  const handleRotateCounterClockwise = () => {
    setRotation(prev => (prev - 90 + 360) % 360);
  };
  
  const handleRoomClick = (roomId: string) => {
    setSelectedRoom(roomId === selectedRoom ? null : roomId);
  };
  
  const getRoomInfo = (roomId: string) => {
    return rooms.find(room => room.id === roomId);
  };
  
  const selectedRoomInfo = selectedRoom ? getRoomInfo(selectedRoom) : null;

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
        <h3 className="font-medium text-lg">Floor Plan</h3>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle room information</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={handleZoomIn}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom in</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={handleZoomOut}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={handleRotateClockwise}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rotate clockwise</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={handleRotateCounterClockwise}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rotate counter-clockwise</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => {
                    setZoom(1);
                    setRotation(0);
                    setSelectedRoom(null);
                  }}
                >
                  <Square className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset view</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => window.open(floorPlanImage, "_blank")}
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View full screen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="relative overflow-hidden bg-gray-50" style={{ height: "500px" }}>
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out"
          style={{ 
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            transformOrigin: 'center'
          }}
        >
          <div className="relative">
            <img 
              src={floorPlanImage} 
              alt="Floor Plan" 
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = property.imageUrl || "https://via.placeholder.com/800x600?text=Floor+Plan+Unavailable";
              }}
            />
            
            {showInfo && rooms.map((room) => (
              <div 
                key={room.id}
                className={`absolute cursor-pointer transition-all duration-200 
                  ${selectedRoom === room.id ? 'z-20' : 'z-10'}
                  ${selectedRoom === room.id ? 'scale-110' : 'hover:scale-105'}`}
                style={{ 
                  left: `${room.x}%`, 
                  top: `${room.y}%`,
                  transform: `translate(-50%, -50%)` 
                }}
                onClick={() => handleRoomClick(room.id)}
              >
                <div className={`
                  h-6 w-6 rounded-full flex items-center justify-center
                  ${selectedRoom === room.id 
                    ? 'bg-estate-gold text-white' 
                    : 'bg-white/80 text-gray-700 border border-gray-300'}
                `}>
                  <span className="text-xs font-bold">{room.id.charAt(0).toUpperCase()}</span>
                </div>
                
                {selectedRoom === room.id && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white shadow-lg rounded-md p-3 w-48 z-20 border">
                    <h4 className="font-semibold text-sm mb-1">{room.name}</h4>
                    <div className="grid grid-cols-2 gap-1 text-xs text-gray-500">
                      <span>Size:</span>
                      <span className="text-right font-medium text-gray-700">{room.size}</span>
                      <span>Area:</span>
                      <span className="text-right font-medium text-gray-700">{room.area}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {selectedRoomInfo && !showInfo && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm shadow-lg rounded-md p-3 max-w-xs border">
            <div className="flex items-center">
              <Badge className="mr-2 bg-estate-gold">{selectedRoomInfo.name}</Badge>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 ml-auto"
                onClick={() => setSelectedRoom(null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs mt-2">
              <span className="text-gray-500">Size:</span>
              <span className="font-medium">{selectedRoomInfo.size}</span>
              <span className="text-gray-500">Area:</span>
              <span className="font-medium">{selectedRoomInfo.area}</span>
            </div>
          </div>
        )}
        
        <div className="absolute bottom-4 right-4 bg-white/75 rounded-md px-2 py-1 text-xs text-gray-500">
          {property.sqft.toLocaleString()} sq ft · {property.bedrooms} bed · {property.bathrooms} bath
        </div>
      </div>
    </div>
  );
};

// X icon component
const X = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
); 