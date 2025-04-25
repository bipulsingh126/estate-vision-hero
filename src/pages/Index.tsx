
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import AboutSection from "@/components/AboutSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Header + Hero */}
      <Navbar />
      <Hero />
      
      {/* Featured Listings with Search */}
      <div className="container-custom">
        <FeaturedListings />
      </div>
      
      {/* About Section */}
      <AboutSection />
      
      {/* Contact Form */}
      <ContactForm />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
