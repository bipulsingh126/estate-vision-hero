import React from "react";
import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

const Contact = () => {
  const offices = [
    {
      id: 1,
      city: "New York",
      address: "123 Broadway, New York, NY 10001",
      phone: "+1 (212) 555-1234",
      email: "newyork@estatevision.com",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
    },
    {
      id: 2,
      city: "Los Angeles",
      address: "456 Wilshire Blvd, Los Angeles, CA 90036",
      phone: "+1 (310) 555-5678",
      email: "losangeles@estatevision.com",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
    },
    {
      id: 3,
      city: "Miami",
      address: "789 Ocean Drive, Miami, FL 33139",
      phone: "+1 (305) 555-9012",
      email: "miami@estatevision.com",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-estate-navy text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-white/80">
              We're here to help you with all your real estate needs. Reach out to our team today.
            </p>
          </div>
        </div>
      </div>
      
      {/* Offices Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Offices</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit us at one of our prime locations across the country
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office) => (
              <div key={office.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{office.city} Office</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-estate-gold mt-0.5" />
                      <span>{office.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-estate-gold" />
                      <span>{office.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-estate-gold" />
                      <span>{office.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-estate-gold" />
                      <span>{office.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Form */}
      <section className="py-16 bg-gray-50" id="contact-form">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Form Information */}
                <div className="bg-estate-navy text-white p-8">
                  <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                  <p className="mb-8">
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-estate-gold" />
                      <span>Expert property consultations</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-estate-gold" />
                      <span>Free property valuations</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-estate-gold" />
                      <span>Personalized service</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-estate-gold" />
                      <span>24/7 customer support</span>
                    </div>
                  </div>
                </div>
                
                {/* Use the ContactForm component */}
                <div className="p-8">
                  <ContactForm embedded={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section - Placeholder */}
      <section className="h-96 bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
          <p className="text-gray-600">Find our offices and properties across the country</p>
        </div>
      </section>
    </div>
  );
};

export default Contact; 