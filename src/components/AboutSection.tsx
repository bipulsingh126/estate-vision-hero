
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Home, MapPin } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image with 3D effect */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Estate Vision Team"
                className="w-full h-auto"
              />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 w-44 animate-float">
              <div className="text-center">
                <span className="text-2xl font-bold text-estate-gold">15+</span>
                <p className="text-sm text-muted-foreground mt-1">Years of Excellence</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Reimagining Real Estate for Modern Living
            </h2>
            <p className="text-muted-foreground mb-6">
              EstateVision is a premier real estate company specializing in luxury properties 
              and exceptional client experiences. With over 15 years in the industry, 
              we've built a reputation for excellence, integrity, and unmatched market knowledge.
            </p>
            
            <Tabs defaultValue="mission" className="mb-8">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="mission">Our Mission</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="approach">Approach</TabsTrigger>
              </TabsList>
              
              <TabsContent value="mission" className="py-2">
                <p>
                  We're dedicated to helping clients find their perfect property match while 
                  providing comprehensive support throughout the entire buying, selling, or 
                  renting process.
                </p>
              </TabsContent>
              
              <TabsContent value="services" className="py-2">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Home size={18} className="text-estate-gold" />
                    <span>Property Sales & Purchases</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Building size={18} className="text-estate-gold" />
                    <span>Property Management & Rentals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin size={18} className="text-estate-gold" />
                    <span>Investment Property Consulting</span>
                  </li>
                </ul>
              </TabsContent>
              
              <TabsContent value="approach" className="py-2">
                <p>
                  We combine cutting-edge technology with personalized service to deliver 
                  results that exceed expectations. Our team of experts is committed to staying 
                  ahead of market trends and providing innovative solutions.
                </p>
              </TabsContent>
            </Tabs>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">Meet Our Team</Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
