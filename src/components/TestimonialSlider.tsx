import React, { useState, useEffect } from "react";
import * as FramerMotion from "framer-motion";
const { motion } = FramerMotion;
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "EstateVision helped us find our dream home in just two weeks. Their virtual tours saved us so much time in our search process.",
    author: "Sarah & Michael Thompson",
    position: "First-time Homebuyers",
    image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    quote: "I was amazed by how accurately the EstateVision team matched properties to my preferences. They truly understood what I was looking for.",
    author: "David Rodriguez",
    position: "Property Investor",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    quote: "The team at EstateVision made selling my family home a seamless experience. Their expertise and professionalism are unmatched.",
    author: "Emma Wilson",
    position: "Home Seller",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    quote: "As someone relocating from overseas, EstateVision's 3D tours allowed me to confidently purchase a property without having to fly in first.",
    author: "James Chen",
    position: "International Client",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  useEffect(() => {
    if (!autoplay) return;
    
    const timer = setTimeout(() => {
      nextSlide();
    }, 6000);
    
    return () => clearTimeout(timer);
  }, [current, autoplay]);

  return (
    <div className="relative overflow-hidden bg-slate-50 rounded-xl py-16">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-estate-gold/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-estate-blue/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container-custom relative">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-estate-gold font-medium mb-2 inline-block">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the clients who have experienced the EstateVision difference.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 h-[320px] md:h-[280px]">
          <div 
            className="absolute top-0 left-8 text-6xl text-estate-gold opacity-20"
            aria-hidden="true"
          >
            <Quote size={64} />
          </div>
          
          <motion.div 
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="h-full"
          >
            <div className="flex flex-col md:flex-row items-center gap-8 h-full">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={testimonials[current].image} 
                    alt={testimonials[current].author}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <p className="text-lg md:text-xl italic text-gray-700 mb-6 relative">
                  "{testimonials[current].quote}"
                </p>
                <h3 className="font-bold text-xl">{testimonials[current].author}</h3>
                <p className="text-estate-gold">{testimonials[current].position}</p>
              </div>
            </div>
          </motion.div>
          
          <div className="absolute bottom-0 right-0 flex gap-2">
            <button 
              onClick={() => {
                prevSlide();
                setAutoplay(false);
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-gray-200 text-gray-700 hover:bg-estate-gold hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => {
                nextSlide();
                setAutoplay(false);
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-gray-200 text-gray-700 hover:bg-estate-gold hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index);
                setAutoplay(false);
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                current === index ? "w-6 bg-estate-gold" : "bg-gray-300"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider; 