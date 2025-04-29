import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  Star, 
  Home, 
  MessageCircle, 
  Share2,
  ChevronLeft,
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon
} from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import { Agent } from "@/types/agent";
import { sampleProperties } from "@/data/sampleProperties";

// Sample agent data
const sampleAgents: Agent[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    email: "sarah.j@estatevision.com",
    phone: "(555) 123-4567",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=60",
    bio: "With over a decade of experience in luxury real estate, Sarah specializes in high-end properties and investment opportunities in the most sought-after neighborhoods. Her dedication to client satisfaction and extensive market knowledge have earned her numerous industry awards and a loyal client base. Sarah is passionate about matching clients with their dream homes and guiding them through every step of the buying or selling process.",
    specialties: ["Luxury Homes", "Investment Properties", "Waterfront", "Urban Estates"],
    experience: 12,
    listings: ["1", "5", "10", "16"]
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Commercial Property Specialist",
    email: "michael.c@estatevision.com",
    phone: "(555) 234-5678",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&auto=format&fit=crop&q=60",
    bio: "Michael specializes in commercial real estate and has helped numerous businesses find their perfect location to thrive and grow. His background in business development gives him unique insights into the needs of commercial clients, from small startups to large enterprises. Michael takes pride in his ability to identify properties with the best potential for business success and ROI for investors.",
    specialties: ["Commercial", "Retail Spaces", "Office Buildings", "Industrial"],
    experience: 8,
    listings: ["2", "7", "12"]
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    title: "First-Time Home Buyer Expert",
    email: "emily.r@estatevision.com",
    phone: "(555) 345-6789",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&auto=format&fit=crop&q=60",
    bio: "Emily is passionate about helping first-time homebuyers navigate the real estate market with confidence. She understands the unique challenges and concerns of those entering the market, and provides personalized guidance every step of the way. Her patient approach and educational background allow her to simplify complex processes and ensure her clients make informed decisions they'll be happy with for years to come.",
    specialties: ["Residential", "First-Time Buyers", "Condos", "Suburban Homes"],
    experience: 5,
    listings: ["3", "8", "13"]
  }
];

// Sample reviews
const agentReviews = [
  {
    id: "r1",
    agentId: "1",
    clientName: "James Wilson",
    rating: 5,
    date: "2023-11-12",
    content: "Sarah was incredible throughout our entire home buying process. Her knowledge of the local market helped us find the perfect home in our dream neighborhood. She was always available to answer questions and provided expert guidance at every step."
  },
  {
    id: "r2",
    agentId: "1",
    clientName: "Rebecca Thompson",
    rating: 5,
    date: "2023-10-05",
    content: "Working with Sarah was the best decision we made when selling our home. Her marketing strategy and negotiation skills got us multiple offers above asking price. The whole process was smooth and stress-free thanks to her expertise."
  },
  {
    id: "r3",
    agentId: "1",
    clientName: "Daniel Martinez",
    rating: 4,
    date: "2023-09-22",
    content: "Sarah helped us find our investment property and her insights were invaluable. She has a deep understanding of property values and potential return on investment. Very professional and responsive throughout the process."
  },
  {
    id: "r4",
    agentId: "2",
    clientName: "Laura Kim",
    rating: 5,
    date: "2023-11-08",
    content: "Michael's expertise in commercial real estate is unmatched. He helped us secure the perfect location for our new business and negotiated terms that worked perfectly for our budget. Highly recommend!"
  },
  {
    id: "r5",
    agentId: "3",
    clientName: "Thomas Brown",
    rating: 5,
    date: "2023-10-18",
    content: "As first-time homebuyers, we were nervous about the process, but Emily made everything so easy to understand. She was patient, informative, and truly had our best interests at heart. We couldn't be happier with our new home!"
  }
];

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("about");
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // Find the agent by ID
  const agent = sampleAgents.find(a => a.id === id);
  
  // If agent not found, show error
  if (!agent) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container-custom section-padding">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Agent Not Found</h1>
            <p className="mb-6">Sorry, we couldn't find the agent you're looking for.</p>
            <Button asChild>
              <Link to="/agents">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to All Agents
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Get agent's listings
  const agentListings = sampleProperties.filter(property => 
    agent.listings.includes(property.id)
  );
  
  // Get agent's reviews
  const reviews = agentReviews.filter(review => review.agentId === agent.id);
  
  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Agent Hero Section */}
      <div className="relative bg-gradient-to-r from-estate-navy to-slate-800 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="container-custom relative z-10">
          <div className="flex items-start justify-between flex-col md:flex-row gap-8">
            <div className="flex gap-6 items-center max-w-2xl">
              <Avatar className="h-28 w-28 border-4 border-white/20 shadow-xl">
                <AvatarImage src={agent.imageUrl} alt={agent.name} className="object-cover" />
                <AvatarFallback className="text-2xl">
                  {agent.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white/20 font-normal px-2 py-0">
                    {agent.experience} Years Experience
                  </Badge>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-4 w-4 ${star <= Math.round(averageRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-400'}`} />
                    ))}
                    <span className="text-sm ml-1">({reviews.length} reviews)</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">{agent.name}</h1>
                <p className="text-lg text-white/80 mb-4">{agent.title}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.specialties.map((specialty) => (
                    <Badge key={specialty} className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Button size="lg" variant="default" className="bg-estate-gold hover:bg-amber-500 text-white shadow-lg w-full md:w-auto">
                <Phone className="mr-2 h-4 w-4" /> Contact Agent
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white">
                  <FacebookIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white">
                  <TwitterIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white">
                  <LinkedinIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Agents Link */}
      <div className="container-custom mt-6">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/agents" className="text-estate-navy">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to All Agents
          </Link>
        </Button>
      </div>
      
      {/* Agent Content Section */}
      <main className="container-custom pb-16">
        <Tabs defaultValue="about" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-8 w-full justify-start bg-gray-100 p-1">
            <TabsTrigger value="about" className="flex-1 md:flex-none data-[state=active]:bg-white">About</TabsTrigger>
            <TabsTrigger value="listings" className="flex-1 md:flex-none data-[state=active]:bg-white">Listings ({agentListings.length})</TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1 md:flex-none data-[state=active]:bg-white">Reviews ({reviews.length})</TabsTrigger>
            <TabsTrigger value="contact" className="flex-1 md:flex-none data-[state=active]:bg-white">Contact</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-semibold mb-4">About {agent.name}</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-6 leading-relaxed">{agent.bio}</p>
                  <p className="text-gray-700 leading-relaxed">
                    With {agent.experience} years of experience in real estate, {agent.name.split(' ')[0]} has built a 
                    reputation for professionalism, market expertise, and client satisfaction. 
                    {agent.name.split(' ')[0]} approaches each client relationship with dedication and personalized attention,
                    ensuring the best possible outcome for every transaction.
                  </p>
                </div>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {agent.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="px-3 py-1 font-medium border-slate-200 bg-slate-50">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <Card className="bg-gray-50 border-gray-100">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-estate-gold" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{agent.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-estate-gold" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{agent.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-estate-gold" />
                        <div>
                          <p className="text-sm text-muted-foreground">Office</p>
                          <p className="font-medium">123 Real Estate Way, Mumbai, MH</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-estate-gold" />
                        <div>
                          <p className="text-sm text-muted-foreground">Available</p>
                          <p className="font-medium">Monday-Friday, 9AM-6PM</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="w-full bg-estate-gold hover:bg-amber-500 text-white">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Schedule Consultation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-estate-gold" />
                      <p className="text-sm">Top Producer 2023</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-estate-gold" />
                      <p className="text-sm">Customer Satisfaction Award</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-estate-gold" />
                      <p className="text-sm">Luxury Property Specialist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="listings" className="mt-0">
            <h2 className="text-2xl font-semibold mb-6">Properties Listed by {agent.name}</h2>
            {agentListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agentListings.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Home className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No Active Listings</h3>
                <p className="text-gray-500">This agent doesn't have any active listings at the moment.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Client Reviews</h2>
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`h-5 w-5 ${star <= Math.round(averageRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="ml-2 text-lg font-medium">{averageRating.toFixed(1)}/5.0</span>
                <span className="ml-2 text-gray-500">({reviews.length} reviews)</span>
              </div>
            </div>
            
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id} className="bg-gray-50 border-gray-100">
                    <CardContent className="pt-6">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold">{review.clientName}</h3>
                        <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <div className="flex mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`h-4 w-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.content}</p>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="text-center mt-8">
                  <Button variant="outline">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Write a Review
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No Reviews Yet</h3>
                <p className="text-gray-500 mb-6">Be the first to review {agent.name}.</p>
                <Button>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Write a Review
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="contact" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Contact {agent.name}</h2>
                <p className="text-gray-700 mb-6">
                  Have questions about a property or want to schedule a viewing? Fill out the form and 
                  {agent.name.split(' ')[0]} will get back to you as soon as possible.
                </p>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <input
                        id="name"
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="What can we help you with?"
                    />
                  </div>
                  <div className="pt-2">
                    <Button className="w-full bg-estate-gold hover:bg-amber-500 text-white">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Direct Contact</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-estate-gold" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{agent.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-estate-gold" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{agent.phone}</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Office Location</h3>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=60" 
                    alt="Office" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-estate-gold" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">123 Real Estate Way, Mumbai, MH</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-estate-gold" />
                    <div>
                      <p className="text-sm text-muted-foreground">Office Hours</p>
                      <p className="font-medium">Monday-Friday: 9AM-6PM</p>
                      <p className="font-medium">Saturday: 10AM-4PM</p>
                      <p className="font-medium">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default AgentDetail; 