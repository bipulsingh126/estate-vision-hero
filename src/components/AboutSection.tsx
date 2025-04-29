import React from "react";
import * as FramerMotion from "framer-motion";
const { motion } = FramerMotion;
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Home, MapPin } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      title: "Expert Guidance",
      description: "Our agents are industry leaders with deep local knowledge and market insights.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Virtual Tours",
      description: "Explore properties remotely with our immersive 3D and virtual tour technology.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Smart Matching",
      description: "Our AI-powered systems match you with properties that fit your unique preferences.",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

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

  return (
    <section className="py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                alt="Modern office space"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <span className="text-sm font-medium bg-estate-gold px-3 py-1 rounded-full text-black">
                  Since 2008
                </span>
                <h3 className="text-2xl font-bold mt-3">Modern Approach</h3>
                <p className="text-white/80">
                  We combine traditional values with cutting-edge technology
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-8 -left-8 w-64 h-64 bg-estate-gold/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-estate-blue/10 rounded-full filter blur-2xl -z-10 animate-pulse" style={{ animationDelay: "1s" }}></div>

            {/* Statistics cards */}
            <div className="absolute -right-10 top-10 bg-white p-4 rounded-lg shadow-lg z-20 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-estate-gold/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-estate-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Happy Clients</p>
                  <p className="text-xl font-bold">10,000+</p>
                </div>
              </div>
            </div>

            <div className="absolute -left-10 bottom-20 bg-white p-4 rounded-lg shadow-lg z-20 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-estate-gold/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-estate-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Properties</p>
                  <p className="text-xl font-bold">15,000+</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span
              variants={itemVariants}
              className="text-estate-gold font-medium mb-2 inline-block"
            >
              About EstateVision
            </motion.span>
            
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              A New Vision for Real Estate
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-gray-600 mb-8 leading-relaxed"
            >
              Founded in 2008, EstateVision has revolutionized the real estate industry by combining traditional expertise with cutting-edge technology. Our mission is to create a seamless, transparent, and efficient property buying experience.
            </motion.p>
            
            <motion.p
              variants={itemVariants}
              className="text-gray-600 mb-8 leading-relaxed"
            >
              With a team of seasoned professionals and a commitment to innovation, we've helped thousands of clients find their dream homes and make profitable investments. We believe that everyone deserves a place they can call home, and we're dedicated to making that vision a reality.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="relative group"
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                  <div className={cn(
                    "p-6 rounded-lg border border-gray-100 hover:border-transparent shadow-sm hover:shadow-lg transition-all duration-300 h-full relative z-0 overflow-hidden group",
                    "before:absolute before:-z-10 before:inset-0 before:bg-gradient-to-r before:opacity-0 group-hover:before:opacity-10 before:transition-opacity before:duration-500"
                  )}
                  style={{ 
                    "--tw-gradient-from": feature.gradient.split(" ")[1],
                    "--tw-gradient-to": feature.gradient.split(" ")[3],
                  } as React.CSSProperties}
                  >
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-estate-gold transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
