
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm = () => {
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  
  const onSubmit = async (data: FormValues) => {
    // This would normally send data to your backend
    console.log("Form data:", data);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Show success notification
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
      duration: 5000,
    });
    
    // Reset form
    reset();
  };

  return (
    <section id="contact" className="section-padding bg-estate-navy text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get in Touch with <span className="text-estate-gold">EstateVision</span>
            </h2>
            <p className="text-white/80 mb-8">
              Have questions about a property or need assistance with your real estate journey? 
              Our team of experts is ready to help you every step of the way.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-estate-gold mb-1">Visit Us</h3>
                <p className="text-white/80">
                  123 Skyline Avenue<br />
                  Suite 500<br />
                  Los Angeles, CA 90001
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-estate-gold mb-1">Contact</h3>
                <p className="text-white/80">
                  Email: info@estatevision.com<br />
                  Phone: (555) 123-4567<br />
                  Hours: Mon-Fri 9AM-6PM
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-estate-gold mb-1">Connect</h3>
                <div className="flex gap-4 mt-2">
                  {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    >
                      {/* Icon would go here */}
                      <span className="sr-only">{platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    {...register("name", { required: "Name is required" })}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <Input
                    placeholder="Email Address"
                    type="email"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <Input
                    placeholder="Phone Number"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    {...register("phone")}
                  />
                </div>
                
                <div>
                  <Textarea
                    placeholder="Your Message"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                    {...register("message", { required: "Message is required" })}
                    aria-invalid={errors.message ? "true" : "false"}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-estate-gold hover:bg-estate-gold/90 text-black font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
