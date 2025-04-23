
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  // Images for the 3D effect
  const heroImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Handle mouse movement for the 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - container.left;
    const mouseY = e.clientY - container.top;

    const centerX = container.width / 2;
    const centerY = container.height / 2;

    const percentX = (mouseX - centerX) / centerX;
    const percentY = (mouseY - centerY) / centerY;

    setTiltX(percentY * 5); // Inverse for natural tilt
    setTiltY(-percentX * 5);
  };

  const handleMouseLeave = () => {
    setTiltX(0);
    setTiltY(0);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 3D Tilt Container */}
      <div
        className="absolute inset-0 transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image carousel with fade transition */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
        ))}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-estate-navy/80 via-estate-navy/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-custom relative h-full flex flex-col justify-center items-start">
        <div className="max-w-2xl animate-slide-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-shadow">
            Discover Your <span className="text-estate-gold">Dream Home</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 text-shadow max-w-xl">
            Explore our curated collection of premium properties designed for
            modern living and exceptional comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="font-semibold">
              View Properties
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 font-semibold"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Property Stats */}
        <div className="absolute bottom-10 left-0 right-0">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6">
              {[
                { value: "200+", label: "Properties" },
                { value: "10+", label: "Years Experience" },
                { value: "50+", label: "Agents" },
                { value: "1000+", label: "Happy Clients" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white text-shadow">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
