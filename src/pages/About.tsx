import React, { useState } from "react";
import AboutSection from "@/components/AboutSection";
import TestimonialSlider from "@/components/TestimonialSlider";
import ContactForm from "@/components/ContactForm";
import { Building, Users, Award, Headphones, ArrowRight, MapPin, Calendar, Target } from "lucide-react";
import * as FramerMotion from "framer-motion";
const { motion } = FramerMotion;
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const About = () => {
  const [hoveredTimeline, setHoveredTimeline] = useState<number | null>(null);

  const stats = [
    { label: "Properties Sold", value: "5,000+", icon: Building },
    { label: "Happy Clients", value: "10,000+", icon: Users },
    { label: "Industry Awards", value: "25+", icon: Award },
    { label: "24/7 Support", value: "Always", icon: Headphones },
  ];

  const timeline = [
    {
      year: "2008",
      title: "Foundation",
      description: "EstateVision was founded with a vision to revolutionize the real estate industry through innovative technology and exceptional service.",
      icon: Building,
    },
    {
      year: "2012",
      title: "Expansion",
      description: "Opened offices in major cities across the country and increased our property portfolio by 300%.",
      icon: MapPin,
    },
    {
      year: "2016",
      title: "Digital Transformation",
      description: "Launched our first virtual tour platform, allowing clients to view properties remotely with immersive 3D technology.",
      icon: Target,
    },
    {
      year: "2020",
      title: "Award Recognition",
      description: "Recognized as the leading real estate agency in customer satisfaction and technological innovation.",
      icon: Award,
    },
    {
      year: "2023",
      title: "Today",
      description: "Continuing to set industry standards with AI-powered property matching and sustainable real estate initiatives.",
      icon: Calendar,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Parallax scroll effect for hero section
  const parallaxBg = {
    y: [-20, 20],
    transition: {
      y: {
        repeat: 0,
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Enhanced Parallax Effect */}
      <div className="relative h-[80vh] overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80" 
            alt="EstateVision Office" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-estate-navy/90 to-estate-navy/70 backdrop-blur-sm"></div>
        </motion.div>
        
        <div className="relative z-10 container-custom h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-estate-gold/20 text-estate-gold mb-4 text-sm font-medium">Our Legacy of Excellence</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Our <span className="text-estate-gold relative inline-block">
                Story
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-estate-gold/50"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1 }}
                ></motion.span>
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              We're not just selling properties, we're creating lifelong homes and investment opportunities with a commitment to excellence, integrity, and innovation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-estate-gold hover:bg-estate-gold/90 text-black group"
              >
                Meet Our Team
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white/10"
              >
                Our Services
              </Button>
            </div>
          </motion.div>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute right-20 bottom-20 w-64 h-64 bg-estate-gold/10 rounded-full filter blur-3xl z-0"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          ></motion.div>
        </div>
      </div>
      
      {/* About Section Component */}
      <AboutSection />
      
      {/* Company Timeline - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-estate-gold font-medium mb-2 inline-block">Our Progress</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Road to Excellence</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From our humble beginnings to becoming an industry leader, discover the milestones that shaped EstateVision.
              </p>
            </motion.div>
          </div>
          
          <div className="relative mt-20 pb-10">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-estate-gold/30 z-0">
              <motion.div 
                className="w-full bg-estate-gold h-0"
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              ></motion.div>
            </div>
            
            {/* Timeline Events */}
            {timeline.map((event, index) => (
              <motion.div 
                key={event.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={cn(
                  "relative z-10 flex items-center justify-center mb-24 last:mb-0",
                  index % 2 === 0 ? "flex-row-reverse" : "flex-row"
                )}
                onMouseEnter={() => setHoveredTimeline(index)}
                onMouseLeave={() => setHoveredTimeline(null)}
              >
                {/* Line connecting to center */}
                <div className="flex-1 flex items-center">
                  <motion.div 
                    className={cn(
                      "h-0.5 bg-estate-gold/30 flex-1 transition-all duration-300",
                      hoveredTimeline === index && "bg-estate-gold"
                    )}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                  ></motion.div>
                </div>
                
                {/* Center Icon */}
                <div className="mx-4">
                  <motion.div 
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center bg-white border-2 border-estate-gold/30 z-20 transition-all duration-300",
                      hoveredTimeline === index && "border-estate-gold bg-estate-gold/10 scale-110"
                    )}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      delay: 0.2 + index * 0.2 
                    }}
                  >
                    <event.icon className="w-8 h-8 text-estate-gold" />
                  </motion.div>
                </div>
                
                {/* Line connecting to content */}
                <div className="flex-1 flex items-center">
                  <motion.div 
                    className={cn(
                      "h-0.5 bg-estate-gold/30 flex-1 transition-all duration-300",
                      hoveredTimeline === index && "bg-estate-gold"
                    )}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                  ></motion.div>
                </div>
                
                {/* Content */}
                <motion.div 
                  className={cn(
                    "absolute w-80 md:w-96 p-6 bg-white rounded-lg shadow-lg transition-all duration-300",
                    index % 2 === 0 ? "right-[60%] mr-8" : "left-[60%] ml-8",
                    hoveredTimeline === index && "shadow-xl -translate-y-1"
                  )}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                >
                  <div className="absolute top-6 text-6xl font-bold text-estate-gold/10 -z-10">
                    {event.year}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-3">{event.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section - Enhanced */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-estate-gold font-medium mb-2 inline-block">Our Impact</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">By the Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our track record speaks for itself. Discover the impact we've made over the years.
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label} 
                variants={itemVariants}
                custom={index}
              >
                <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 border border-gray-100 hover:border-estate-gold/20 h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-estate-gold/10 rounded-full mb-6 group-hover:bg-estate-gold/20 transition-colors">
                    <stat.icon className="w-8 h-8 text-estate-gold" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-estate-navy mb-3 group-hover:text-estate-gold transition-colors">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Team Section - Enhanced */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-estate-gold font-medium mb-2 inline-block">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The People Behind Our Success</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The visionaries behind our success, dedicated to delivering exceptional service and results.
              </p>
            </motion.div>
          </div>
          
          <Tabs defaultValue="leadership" className="space-y-12">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="leadership">Leadership</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="leadership">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-12"
              >
                {[
                  {
                    name: "Jessica Reynolds",
                    role: "CEO & Founder",
                    bio: "With over 15 years of experience in luxury real estate, Jessica founded EstateVision with a vision to transform the industry.",
                    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  },
                  {
                    name: "Michael Chen",
                    role: "Chief Operating Officer",
                    bio: "Michael oversees all operations and ensures our clients receive unparalleled service at every touchpoint.",
                    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  },
                  {
                    name: "Sarah Johnson",
                    role: "Chief Marketing Officer",
                    bio: "Sarah leads our innovative marketing strategies that have positioned EstateVision as an industry leader.",
                    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  }
                ].map((member, index) => (
                  <motion.div 
                    key={member.name} 
                    variants={itemVariants}
                    custom={index}
                    className="group"
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="absolute bottom-0 left-0 p-6 text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 w-full">
                          <div className="flex justify-center space-x-4">
                            {["LinkedIn", "Twitter", "Email"].map((platform) => (
                              <a 
                                key={platform} 
                                href="#" 
                                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-estate-gold/80 transition-colors"
                              >
                                <span className="sr-only">{platform}</span>
                                {platform === "LinkedIn" && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>}
                                {platform === "Twitter" && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.978 13.978 0 011.671 3.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.224.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/></svg>}
                                {platform === "Email" && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                        <p className="text-estate-gold font-medium mb-4">{member.role}</p>
                        <p className="text-gray-600 mb-6 flex-1">{member.bio}</p>
                        <Button variant="ghost" className="text-estate-navy hover:text-estate-gold group-hover:translate-x-1 transition-transform self-start">
                          View Profile <ArrowRight className="ml-1 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="sales">
              <div className="text-center p-12 bg-white/50 rounded-xl border border-gray-100">
                <p className="text-gray-600">Our sales team information will be coming soon.</p>
                <Button variant="outline" className="mt-4">
                  Notify Me
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="operations">
              <div className="text-center p-12 bg-white/50 rounded-xl border border-gray-100">
                <p className="text-gray-600">Our operations team information will be coming soon.</p>
                <Button variant="outline" className="mt-4">
                  Notify Me
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Values Section - Enhanced */}
      <section className="py-24 bg-estate-navy text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-estate-gold/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-estate-gold font-medium mb-2 inline-block">Guiding Principles</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Values</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                These principles guide everything we do and shape our approach to real estate.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description: "We strive for excellence in every interaction, transaction, and relationship.",
                icon: Award
              },
              {
                title: "Integrity",
                description: "Transparency and honesty are at the heart of our business practices.",
                icon: Building
              },
              {
                title: "Innovation",
                description: "We embrace new technologies and approaches to better serve our clients.",
                icon: Target
              }
            ].map((value, index) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-estate-gold/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl hover:bg-white/10 transition-all duration-500 border border-white/10 group-hover:border-estate-gold/20 h-full flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-estate-gold/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-estate-gold" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-estate-gold">{value.title}</h3>
                  <p className="text-white/80">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <Button 
              size="lg"
              className="bg-estate-gold hover:bg-estate-gold/90 text-black"
            >
              Join Our Team
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonial Slider */}
      <TestimonialSlider />
      
      {/* Contact Form */}
      <ContactForm />
    </div>
  );
};

export default About; 