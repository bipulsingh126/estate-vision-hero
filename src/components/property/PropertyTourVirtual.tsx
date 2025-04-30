import React, { useState, useRef, useEffect } from "react";
import { Property } from "@/types/property";
import { View, Loader2, Play, Maximize, RotateCcw, Volume2, VolumeX, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";

interface PropertyTourVirtualProps {
  property: Property;
}

export const PropertyTourVirtual = ({ property }: PropertyTourVirtualProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(25);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  let controlsTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Use property-specific tour URL if available, otherwise use default
  const videoUrl = property.tourUrlVirtual || "https://www.youtube-nocookie.com/embed/jNQXAC9IVRw";
  const placeholderImage = property.imageUrl || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop";
  
  // Add autoplay parameter to URL when not using placeholder
  const getVideoUrl = () => {
    if (showPlaceholder) return videoUrl;
    
    // Add parameters to YouTube URL
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      const separator = videoUrl.includes('?') ? '&' : '?';
      return `${videoUrl}${separator}autoplay=1&mute=${isMuted ? 1 : 0}&enablejsapi=1`;
    }
    
    return videoUrl;
  };
  
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
  
  // Handle control visibility auto-hide
  useEffect(() => {
    if (!isLoading && !showPlaceholder) {
      const handleMouseMove = () => {
        setShowControls(true);
        
        if (controlsTimeout.current) {
          clearTimeout(controlsTimeout.current);
        }
        
        controlsTimeout.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      // Initial timeout
      controlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (controlsTimeout.current) {
          clearTimeout(controlsTimeout.current);
        }
      };
    }
  }, [isLoading, showPlaceholder]);
  
  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadingProgress(100);
    setIsPlaying(true);
  };

  const handleIframeError = () => {
    setLoadError(true);
    setIsLoading(false);
  };

  const handlePlayVideo = () => {
    setShowPlaceholder(false);
  };
  
  // Control functions for YouTube API
  const sendYouTubeCommand = (command: string) => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    
    try {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: command
        }), '*'
      );
    } catch (error) {
      console.error('Error sending command to YouTube', error);
    }
  };
  
  const togglePlay = () => {
    if (isPlaying) {
      sendYouTubeCommand('pauseVideo');
    } else {
      sendYouTubeCommand('playVideo');
    }
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    if (isMuted) {
      sendYouTubeCommand('unMute');
    } else {
      sendYouTubeCommand('mute');
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-[500px] relative rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
      {showPlaceholder ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full">
            <img 
              src={placeholderImage} 
              alt="Virtual Tour Preview" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center">
              <h3 className="text-white text-xl font-semibold mb-2">Take a virtual tour</h3>
              <p className="text-white/80 mb-6 max-w-md text-center">
                Experience this property with our immersive video walkthrough
              </p>
              <Button 
                variant="secondary" 
                className="gap-2 bg-estate-gold hover:bg-estate-gold/90 text-white"
                onClick={handlePlayVideo}
                size="lg"
              >
                <Play className="h-5 w-5" />
                Play Virtual Tour
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center z-10">
              <Loader2 className="h-12 w-12 text-estate-gold animate-spin mb-6" />
              <h3 className="text-xl font-medium text-slate-700 mb-2">Loading Virtual Tour</h3>
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
                <p className="text-xl font-medium text-slate-700 mb-4">Unable to load virtual tour</p>
                <p className="text-slate-500 mb-6">
                  We're having trouble loading the virtual tour. This could be due to network issues or browser compatibility.
                </p>
                <div className="flex flex-col gap-3">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => window.open(videoUrl, "_blank")}
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
                src={getVideoUrl()}
                title="Virtual Tour"
                className="w-full h-[500px]"
                allowFullScreen
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
              
              {!isLoading && (
                <div 
                  className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-full px-3 py-2 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                  onMouseEnter={() => setShowControls(true)}
                  onMouseLeave={() => {
                    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
                    controlsTimeout.current = setTimeout(() => setShowControls(false), 1000);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={togglePlay}>
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>{isPlaying ? 'Pause' : 'Play'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={toggleMute}>
                            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>{isMuted ? 'Unmute' : 'Mute'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-white"
                            onClick={() => window.open(videoUrl, "_blank")}
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
        </div>
      )}
    </div>
  );
};
