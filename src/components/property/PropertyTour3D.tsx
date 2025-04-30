import React, { useState, useRef, useEffect } from "react";
import { Property } from "@/types/property";
import { Eye, Loader2, Maximize, RotateCcw, ZoomIn, ZoomOut, Compass, PanelLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PropertyTour3DProps {
  property: Property;
}

export const PropertyTour3D = ({ property }: PropertyTour3DProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(25);
  const [viewMode, setViewMode] = useState<'dollhouse' | 'floorplan' | '3d'>('3d');
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Use property-specific tour URL if available, otherwise use default
  const tourUrl = property.tourUrl3D || "https://my.matterport.com/show/?m=SxQL3iGyoDo";
  const placeholderImage = property.imageUrl || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop";

  // Simulate loading progress
  useEffect(() => {
    if (isLoading && !showPlaceholder) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) clearInterval(interval);
          return Math.min(prev + 10, 90);
        });
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [isLoading, showPlaceholder]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadingProgress(100);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setLoadError(true);
  };

  const handleViewTour = () => {
    setShowPlaceholder(false);
  };
  
  // Functions to control the 3D tour via iframe postMessage API
  const sendIframeMessage = (action: string, value?: any) => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    
    const message = { type: action };
    if (value !== undefined) {
      Object.assign(message, { value });
    }
    
    iframeRef.current.contentWindow.postMessage(message, '*');
  };
  
  const changeViewMode = (mode: 'dollhouse' | 'floorplan' | '3d') => {
    setViewMode(mode);
    sendIframeMessage('mode', mode);
  };
  
  // Update tour URL based on view mode
  const getUpdatedTourUrl = () => {
    const baseUrl = tourUrl.split('&')[0];
    let url = baseUrl;
    
    if (viewMode === 'dollhouse') {
      url += '&mode=dollhouse';
    } else if (viewMode === 'floorplan') {
      url += '&mode=floorplan';
    }
    
    return url;
  };

  return (
    <div className="min-h-[500px] relative rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
      {showPlaceholder ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full">
            <img 
              src={placeholderImage} 
              alt="3D Tour Preview" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center">
              <h3 className="text-white text-xl font-semibold mb-2">Experience this property in 3D</h3>
              <p className="text-white/80 mb-6 max-w-md text-center">
                Take a virtual walkthrough of every room as if you were there in person
              </p>
              <Button 
                variant="secondary" 
                className="gap-2 bg-estate-gold hover:bg-estate-gold/90 text-white"
                onClick={handleViewTour}
                size="lg"
              >
                <Eye className="h-5 w-5" />
                Start 3D Tour
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center z-10">
              <Loader2 className="h-12 w-12 text-estate-gold animate-spin mb-6" />
              <h3 className="text-xl font-medium text-slate-700 mb-2">Loading 3D Tour</h3>
              <p className="text-slate-500 mb-6">Preparing immersive experience...</p>
              <div className="w-64 mb-1">
                <Progress value={loadingProgress} className="h-2" />
              </div>
              <p className="text-sm text-slate-500">{loadingProgress}% complete</p>
            </div>
          )}
          
          {loadError ? (
            <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center z-10">
              <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
                <p className="text-xl font-medium text-slate-700 mb-4">Failed to load 3D tour</p>
                <p className="text-slate-500 mb-6">
                  We're having trouble loading the 3D tour. This could be due to network issues or browser compatibility.
                </p>
                <div className="flex flex-col gap-3">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => window.open(tourUrl, "_blank", "noopener,noreferrer")}
                  >
                    <Maximize className="h-4 w-4" />
                    Open in new window
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setLoadError(false);
                      setIsLoading(true);
                      setShowPlaceholder(true);
                    }}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try again
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <iframe 
                ref={iframeRef}
                src={getUpdatedTourUrl()}
                title="3D Property Tour"
                className="w-full h-[500px] border-0"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                allowFullScreen
              />
              
              {!isLoading && (
                <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-full px-1 py-1 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                  onMouseEnter={() => setShowControls(true)}
                  onMouseLeave={() => setShowControls(false)}
                >
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tabs value={viewMode} onValueChange={(v) => changeViewMode(v as any)} className="w-auto">
                        <TabsList className="bg-transparent h-auto p-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <TabsTrigger value="3d" className="h-8 w-8 px-0 data-[state=active]:bg-estate-gold/20 data-[state=active]:text-estate-gold">
                                <Compass className="h-4 w-4" />
                              </TabsTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>3D Mode</p>
                            </TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <TabsTrigger value="dollhouse" className="h-8 w-8 px-0 data-[state=active]:bg-estate-gold/20 data-[state=active]:text-estate-gold">
                                <PanelLeft className="h-4 w-4" />
                              </TabsTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Dollhouse View</p>
                            </TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <TabsTrigger value="floorplan" className="h-8 w-8 px-0 data-[state=active]:bg-estate-gold/20 data-[state=active]:text-estate-gold">
                                <MapIcon className="h-4 w-4" />
                              </TabsTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Floor Plan</p>
                            </TooltipContent>
                          </Tooltip>
                        </TabsList>
                      </Tabs>
                    </TooltipProvider>
                    
                    <div className="w-px h-6 bg-white/20 mx-1"></div>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={() => sendIframeMessage('zoom', 1)}>
                            <ZoomIn className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Zoom In</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={() => sendIframeMessage('zoom', -1)}>
                            <ZoomOut className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Zoom Out</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <div className="w-px h-6 bg-white/20 mx-1"></div>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-white"
                            onClick={() => window.open(tourUrl, "_blank", "noopener,noreferrer")}
                          >
                            <Maximize className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Open in Full Screen</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

// Custom map icon component
const MapIcon = ({ className }: { className?: string }) => (
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
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);
