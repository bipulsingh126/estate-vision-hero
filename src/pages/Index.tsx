import React, { useState } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import AboutSection from "@/components/AboutSection";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Home, MapPin, Star, BadgeCheck, Building, DollarSign, Calculator, Lock, AlertTriangle, Info } from "lucide-react";
import * as FramerMotion from "framer-motion";
const { motion } = FramerMotion;

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(30);
  
  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = parseFloat(loanAmount.toString());
    const monthlyRate = parseFloat(interestRate.toString()) / 100 / 12;
    const numberOfPayments = parseFloat(loanTerm.toString()) * 12;
    
    const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return isNaN(monthlyPayment) ? 0 : monthlyPayment.toFixed(2);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  // Featured agents data
  const featuredAgents = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Luxury Property Specialist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      properties: 48,
      rating: 4.9
    },
    {
      id: 2,
      name: "Rahul Verma",
      role: "Investment Consultant",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      properties: 36,
      rating: 4.8
    },
    {
      id: 3,
      name: "Ananya Patel",
      role: "Residential Expert",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      properties: 42,
      rating: 4.7
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Vikram Singh",
      text: "EstateVision helped me find my dream home in just two weeks. Their 3D tours saved me so much time by letting me view properties virtually before visiting in person.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      propertyType: "Apartment in Mumbai"
    },
    {
      id: 2,
      name: "Deepika Reddy",
      text: "The team at EstateVision made selling my property a smooth experience. Their market insights helped me price it right, and it sold within a month!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      propertyType: "Villa in Bangalore"
    },
    {
      id: 3,
      name: "Arjun Kapoor",
      text: "As a first-time homebuyer, I appreciated the guidance from EstateVision. They explained every step of the process and found me a property that matched all my requirements.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      propertyType: "House in Delhi"
    }
  ];

  // Market stats
  const marketStats = [
    { label: "Properties Listed", value: "10,000+", icon: Home },
    { label: "Cities Covered", value: "50+", icon: MapPin },
    { label: "Premium Properties", value: "1,200+", icon: BadgeCheck },
    { label: "Property Types", value: "25+", icon: Building }
  ];

  return (
    <div className="min-h-screen">
      {/* Header + Hero */}
      <Hero />
      
      {/* Authentication notice banner (visible only to non-authenticated users) */}
      {!isAuthenticated && (
        <div className="bg-estate-navy text-white py-3 px-4">
          <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              <p className="text-sm md:text-base">
                Register and log in to view our full property listings, agent profiles, and expert information.
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/20" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button size="sm" className="bg-estate-gold hover:bg-amber-500" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Featured Listings with Search - Preview Only */}
      <div className="container-custom">
        <FeaturedListings isPreview={true} />
        
        {!isAuthenticated && (
          <Alert className="my-6 border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Authentication Required</AlertTitle>
            <AlertDescription className="text-amber-700">
              You need to register and log in to view full property details and contact agents.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="my-12 text-center">
          <h3 className="text-xl font-semibold mb-4">
            {isAuthenticated 
              ? "Want to see all available properties?" 
              : "Sign in to access all properties and features"}
          </h3>
          <Button size="lg" asChild>
            <Link to={isAuthenticated ? "/properties" : "/login"}>
              {isAuthenticated ? "View All Properties" : "Sign In Now"}
            </Link>
          </Button>
          {!isAuthenticated && (
            <p className="mt-2 text-sm text-gray-500">
              Don't have an account? <Link to="/register" className="text-estate-gold hover:underline">Register here</Link>
            </p>
          )}
        </div>
      </div>
      
      {/* Market Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4">
              Estate<span className="text-estate-gold">Vision</span> Market Insights
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 max-w-2xl mx-auto">
              Our extensive property database and market expertise help you make informed decisions
            </motion.p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {marketStats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={itemVariants} 
                className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-estate-gold/10 mb-4">
                  <stat.icon className="h-6 w-6 text-estate-gold" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* About Section */}
      <AboutSection />
      
      {/* Featured Agents Section */}
      <div className="bg-white py-16">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4">
              Meet Our Featured Agents
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 max-w-2xl mx-auto">
              Work with experienced professionals who know the market inside and out
            </motion.p>
          </motion.div>
          
          {!isAuthenticated && (
            <Alert className="mb-8 border-estate-gold/20 bg-estate-gold/5">
              <Lock className="h-4 w-4 text-estate-gold" />
              <AlertTitle>Authentication Required</AlertTitle>
              <AlertDescription>
                Full agent profiles are only available to registered users. 
                <Link to="/register" className="ml-1 text-estate-gold hover:underline">Register now</Link> to connect with our agents.
              </AlertDescription>
            </Alert>
          )}
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredAgents.map((agent) => (
              <motion.div 
                key={agent.id}
                variants={itemVariants}
                className="bg-white rounded-xl border hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-6 text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={agent.avatar} alt={agent.name} />
                    <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold mb-1">{agent.name}</h3>
                  <p className="text-estate-gold mb-3">{agent.role}</p>
                  <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-1" />
                      <span>{agent.properties} Properties</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      <span>{agent.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 text-center">
                  <Link to={isAuthenticated ? "/meet-experts" : "/login"}>
                    <Button variant={isAuthenticated ? "outline" : "default"} size="sm">
                      {isAuthenticated ? "View Profile" : "Sign In to View"}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-10">
            <Link to={isAuthenticated ? "/meet-experts" : "/login"}>
              <Button variant="outline">
                {isAuthenticated ? "View All Agents" : "Sign In to View All Agents"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4">
              What Our Clients Say
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 max-w-2xl mx-auto">
              Stories from satisfied clients who found their perfect property with us
            </motion.p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div 
                key={testimonial.id}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative"
              >
                <div className="absolute top-6 right-6 text-estate-gold">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.875 7.5C5.625 7.5 5.625 17.5 5.625 17.5V22.5H11.875V17.5H8.125C8.125 17.5 8.125 11.25 11.875 11.25V7.5Z" fill="currentColor"/>
                    <path d="M24.375 7.5C18.125 7.5 18.125 17.5 18.125 17.5V22.5H24.375V17.5H20.625C20.625 17.5 20.625 11.25 24.375 11.25V7.5Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-gray-600 mb-6 pt-6">{testimonial.text}</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.propertyType}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Mortgage Calculator */}
      <div className="bg-white py-16">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4">
              Mortgage Calculator
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 max-w-2xl mx-auto">
              Plan your finances and estimate your monthly payments
            </motion.p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="loan-amount">Loan Amount (₹)</Label>
                      <div className="relative mt-1">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="loan-amount"
                          type="number"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                      <Input
                        id="interest-rate"
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        step="0.1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="loan-term">Loan Term (Years)</Label>
                      <div className="relative mt-1">
                        <Input
                          id="loan-term"
                          type="number"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center items-center bg-gray-50 rounded-xl p-6">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-estate-gold/10 mb-4">
                      <Calculator className="h-8 w-8 text-estate-gold" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Monthly Payment</h3>
                    <p className="text-4xl font-bold text-estate-gold mb-4">₹{calculateMonthlyPayment()}</p>
                    <p className="text-sm text-gray-500 text-center">
                      This is an estimate based on the values you entered and may vary based on your actual loan terms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-8">
              <motion.div
                variants={itemVariants}
                className="bg-gray-50 rounded-lg p-4 border-l-4 border-estate-gold"
              >
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-estate-gold mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    Want personalized advice? Our mortgage specialists are ready to help you find the best financing options for your new home. <Link to="/contact" className="text-estate-gold hover:underline">Contact us</Link> for a free consultation.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
