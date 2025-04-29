import React from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import AboutSection from "@/components/AboutSection";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Header + Hero */}
      <Hero />
      
      {/* Featured Listings with Search - Preview Only */}
      <div className="container-custom">
        <FeaturedListings isPreview={true} />
        
        <div className="my-12 text-center">
          <h3 className="text-xl font-semibold mb-4">
            {isAuthenticated 
              ? "Want to see all available properties?" 
              : "Sign in to access all properties and features"}
          </h3>
          <Button size="lg" asChild>
            <Link to={isAuthenticated ? "/properties" : "/login"}>
              {isAuthenticated ? "View All Properties" : "Sign In or Register"}
            </Link>
          </Button>
        </div>
      </div>
      
      {/* About Section */}
      <AboutSection />
      
      {/* Contact Form */}
      <ContactForm />
    </div>
  );
};

export default Index;
