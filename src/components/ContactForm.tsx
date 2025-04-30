import React, { useState } from "react";
import { z } from "zod";
import { Mail, MessageSquare, Phone, Send, MapPin, Clock, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import * as FramerMotion from "framer-motion";
const { motion } = FramerMotion;

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: "Please select a subject" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" }),
});

type FormData = z.infer<typeof formSchema>;

// Indian office locations
const indianOffices = [
  {
    city: "Mumbai",
    address: "EstateVision Tower, 12th Floor, Bandra Kurla Complex, Mumbai, Maharashtra 400051",
    phone: "+91 22 4987 6500",
    email: "mumbai@estatevision.in",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0988262077474!2d72.86606387508722!3d19.069321682111168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8773cb2f051%3A0x40576ac944236b34!2sBandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1694248376535!5m2!1sen!2sin",
    hours: "Mon-Fri: 9:30 AM - 6:30 PM",
  },
  {
    city: "Delhi",
    address: "EstateVision Heights, 7th Floor, Connaught Place, New Delhi 110001",
    phone: "+91 11 4567 8900",
    email: "delhi@estatevision.in",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.8233308419697!2d77.21623797524202!3d28.632347975665324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b1d8adaf%3A0xfb08b4ee4c1f91f3!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1694248527089!5m2!1sen!2sin",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM",
  },
  {
    city: "Bangalore",
    address: "EstateVision Campus, Whitefield Main Road, Bengaluru, Karnataka 560066",
    phone: "+91 80 4123 9876",
    email: "bangalore@estatevision.in",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.829082255741!2d77.74980677494242!3d12.979326187284128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1329c73049b1%3A0x4a0c3602fe4029d3!2sWhitefield%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1694248597431!5m2!1sen!2sin",
    hours: "Mon-Sat: 9:00 AM - 7:00 PM",
  },
  {
    city: "Chennai",
    address: "EstateVision House, Anna Salai, Chennai, Tamil Nadu 600002",
    phone: "+91 44 2847 5000",
    email: "chennai@estatevision.in",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.805528041731!2d80.24977157494364!3d13.057235587238016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266456221dd3f%3A0x1cc1934bc8631830!2sAnna%20Salai%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1694248671235!5m2!1sen!2sin",
    hours: "Mon-Fri: 9:30 AM - 6:00 PM",
  },
  {
    city: "Hyderabad",
    address: "EstateVision Offices, HITEC City, Hyderabad, Telangana 500081",
    phone: "+91 40 6789 4500",
    email: "hyderabad@estatevision.in",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3061692523257!2d78.37636627503748!3d17.445253205348377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688beb557fa0ee!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1694248712923!5m2!1sen!2sin",
    hours: "Mon-Fri: 10:00 AM - 7:00 PM",
  },
];

// General contact info
const contactInfo = [
  {
    icon: Phone,
    title: "Toll-Free Support",
    info: "1800-123-4567",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Mail,
    title: "General Inquiries",
    info: "contact@estatevision.in",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    info: "Available 9 AM - 8 PM IST",
    color: "bg-purple-50 text-purple-600",
  },
];

// At the top of the file, after the imports and formSchema definition
interface ContactFormProps {
  embedded?: boolean;
}

const ContactForm = ({ embedded = false }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [selectedOffice, setSelectedOffice] = useState(indianOffices[0]);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
    if (errors.subject) {
      setErrors((prev) => ({ ...prev, subject: undefined }));
    }
  };

  const handleOfficeChange = (city: string) => {
    const office = indianOffices.find(o => o.city === city);
    if (office) setSelectedOffice(office);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      formSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);
      
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  return embedded ? (
    // Embedded version (simpler, just the form itself)
    <div className="w-full">
      {isSuccess ? (
        <motion.div 
          variants={successVariants}
          initial="hidden"
          animate="visible"
          className="bg-green-50 border border-green-100 rounded-lg p-6 text-center"
        >
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
          <p className="text-green-700">
            Thank you for reaching out to us. Our team will get back to you as soon as possible.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
              <Select 
                onValueChange={handleSelectChange}
                value={formData.subject}
              >
                <SelectTrigger 
                  id="subject" 
                  className={errors.subject ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="buying">Buying a Property</SelectItem>
                  <SelectItem value="selling">Selling a Property</SelectItem>
                  <SelectItem value="renting">Renting</SelectItem>
                  <SelectItem value="careers">Careers</SelectItem>
                  <SelectItem value="support">Technical Support</SelectItem>
                </SelectContent>
              </Select>
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              rows={5}
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="bg-estate-gold hover:bg-estate-gold/90 text-black w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send Message <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  ) : (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-estate-gold/5 rounded-full -translate-y-1/2 translate-x-1/3 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-estate-blue/5 rounded-full translate-y-1/2 -translate-x-1/3 -z-10"></div>
      
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-estate-gold font-medium mb-2 inline-block">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us Across India</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              With offices in major cities across India, EstateVision is always close to you. Reach out to our team for personalized assistance.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Info Cards - Takes 4 columns on large screens */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.div key={item.title} variants={itemVariants} custom={index}>
                <Card className="border border-gray-100 hover:border-estate-gold/20 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${item.color}`}>
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                        <p className="text-gray-600">{item.info}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Office Locations Selector */}
            <motion.div variants={itemVariants}>
              <Card className="border border-gray-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Our Offices Across India</CardTitle>
                  <CardDescription>
                    Select a city to view location details
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Tabs defaultValue={selectedOffice.city}>
                    <TabsList className="w-full grid grid-cols-5 mb-4">
                      {indianOffices.map((office) => (
                        <TabsTrigger
                          key={office.city}
                          value={office.city}
                          onClick={() => handleOfficeChange(office.city)}
                          className="text-xs md:text-sm"
                        >
                          {office.city}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    <TabsContent value={selectedOffice.city}>
                      <div className="space-y-3 mt-4">
                        <div className="flex items-start gap-3">
                          <MapPin size={18} className="text-estate-gold mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-600">{selectedOffice.address}</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone size={18} className="text-estate-gold mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-600">{selectedOffice.phone}</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Mail size={18} className="text-estate-gold mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-600">{selectedOffice.email}</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock size={18} className="text-estate-gold mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-600">{selectedOffice.hours}</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map for the selected office */}
            <motion.div variants={itemVariants}>
              <Card className="border border-gray-100 overflow-hidden">
                <CardContent className="p-0">
                  <iframe
                    src={selectedOffice.mapUrl}
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title={`EstateVision ${selectedOffice.city} office location`}
                  ></iframe>
                </CardContent>
                <CardFooter className="p-4 border-t bg-estate-navy/5">
                  <div className="w-full">
                    <h3 className="font-semibold text-sm">EstateVision {selectedOffice.city}</h3>
                    <p className="text-sm text-gray-600">Click on map to get directions</p>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form - Takes 8 columns on large screens */}
          <div className="lg:col-span-8">
            <Card className="border border-gray-100 shadow-md overflow-hidden">
              <div className="bg-estate-navy text-white p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <Building className="mr-2" /> Send us a message
                </h3>
                <p className="text-white/80">
                  Fill out the form below and our team will get back to you within 24 hours. For urgent matters, please call our toll-free number.
                </p>
              </div>
              
              <CardContent className="p-6 md:p-8">
                {isSuccess ? (
                  <motion.div 
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-green-50 border border-green-100 rounded-lg p-6 text-center"
                  >
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                    <p className="text-green-700">
                      Thank you for reaching out to us. Our team at {selectedOffice.city} will get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm">{errors.name}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your phone number"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                        <Select 
                          onValueChange={handleSelectChange}
                          value={formData.subject}
                        >
                          <SelectTrigger 
                            id="subject" 
                            className={errors.subject ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="buying">Buying a Property</SelectItem>
                            <SelectItem value="selling">Selling a Property</SelectItem>
                            <SelectItem value="renting">Renting</SelectItem>
                            <SelectItem value="careers">Careers</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.subject && (
                          <p className="text-red-500 text-sm">{errors.subject}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows={5}
                        className={errors.message ? "border-red-500" : ""}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm">{errors.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <div className="text-sm text-gray-500">
                        <p>Your message will be sent to our {selectedOffice.city} office</p>
                      </div>
                      <Button 
                        type="submit" 
                        className="bg-estate-gold hover:bg-estate-gold/90 text-black md:w-auto w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
