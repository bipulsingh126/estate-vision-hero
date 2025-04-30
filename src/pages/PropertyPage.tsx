import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyTour } from '@/components/property/PropertyTour';
import { Badge } from '@/components/ui/badge';
import { PropertyDetails } from '@/components/property/PropertyDetails';
import { AgentCard } from '@/components/property/AgentCard';
import { Separator } from '@/components/ui/separator';
import { CardContent, Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import AuthRequiredAlert from '@/components/AuthRequiredAlert';
import {
  Heart,
  Share,
  MapPin,
  Bed,
  Bath,
  Ruler,
  Home,
  CheckCircle,
  ArrowLeft,
  Clock,
  Calendar as CalendarIcon,
  Phone,
  Mail,
  Send
} from 'lucide-react';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { saveProperty, removeProperty, isPropertySaved } from '@/lib/favorites';

// Sample agent data
const agents = [
  {
    id: 1,
    name: 'Jaimeen Patel',
    role: 'Senior Property Consultant',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVhbCUyMGVzdGF0ZSUyMGFnZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    phone: '+91 98765 43210',
    email: 'jaimeen@estatevision.com',
    experience: '8+ years',
    properties: 124,
    specialization: 'Luxury Homes'
  }
];

// Sample nearby properties
const nearbyProperties = [
  {
    id: 'nearby1',
    title: 'Modern Apartment in Bandra',
    imageUrl: 'https://images.unsplash.com/photo-1551361415-69c87624334f?q=80&w=1000&auto=format&fit=crop',
    price: 6500000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    location: 'Bandra, Mumbai'
  },
  {
    id: 'nearby2',
    title: 'Spacious Villa with Garden',
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1000&auto=format&fit=crop',
    price: 12000000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    location: 'Juhu, Mumbai'
  },
  {
    id: 'nearby3',
    title: 'Beachfront Penthouse',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop',
    price: 18000000,
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 2800,
    location: 'Worli, Mumbai'
  }
];

// Mock function to get property by ID - in a real app, this would fetch from an API
const getPropertyById = (id: string): Property | undefined => {
  const allProperties = JSON.parse(localStorage.getItem('properties') || '[]') as Property[];
  return allProperties.find(p => p.id === id);
};

const PropertyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  // Security check - if somehow the user got here without authentication
  if (!isAuthenticated) {
    return (
      <AuthRequiredAlert 
        description="You need to be logged in to view property details. Redirecting to login page..."
      />
    );
  }
  
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      if (id) {
        const foundProperty = getPropertyById(id);
        if (foundProperty) {
          setProperty(foundProperty);
          if (isAuthenticated) {
            setIsSaved(isPropertySaved(foundProperty.id));
          }
        }
      }
      setLoading(false);
    }, 500);
  }, [id, isAuthenticated]);
  
  const handleToggleSave = () => {
    if (!property) return;
    
    if (!isAuthenticated) {
      toast.info("Please sign in to save properties");
      navigate('/login');
      return;
    }

    if (isSaved) {
      const success = removeProperty(property.id);
      if (success) {
        setIsSaved(false);
        toast.success("Property removed from saved list");
      }
    } else {
      const success = saveProperty(property);
      if (success) {
        setIsSaved(true);
        toast.success("Property saved successfully");
      }
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title || 'Check out this property',
        text: `Check out this property: ${property?.title}`,
        url: window.location.href,
      }).catch(error => {
        console.error('Error sharing:', error);
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success('Link copied to clipboard'))
        .catch(() => toast.error('Failed to copy link'));
    }
  };
  
  const handleBookTour = () => {
    if (!date) {
      toast.info("Please select a date for your tour");
      return;
    }
    
    toast.success(`Tour booked for ${date.toLocaleDateString()}. Our agent will contact you soon.`);
    setDate(undefined);
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="animate-pulse space-y-8 w-full max-w-6xl">
            <div className="h-96 bg-slate-200 rounded-lg w-full"></div>
            <div className="space-y-2">
              <div className="h-8 bg-slate-200 rounded w-2/3"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 bg-slate-200 rounded w-32"></div>
              <div className="h-10 bg-slate-200 rounded w-32"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <h1 className="text-2xl font-semibold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/properties')}>Browse Properties</Button>
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container py-8 px-4 md:px-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-4 text-estate-navy hover:text-estate-gold hover:bg-transparent" 
          onClick={handleGoBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Button>
      
        {/* Property Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden h-[500px] w-full">
              <img 
                src={property.imageUrl} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-white text-estate-navy border-0 font-semibold">
                  {property.status}
                </Badge>
                {property.isPremium && (
                  <Badge className="bg-estate-gold text-white border-0">
                    Premium
                  </Badge>
                )}
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="bg-white/90 hover:bg-white"
                  onClick={handleToggleSave}
                >
                  <Heart className={`h-5 w-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="bg-white/90 hover:bg-white"
                  onClick={handleShare}
                >
                  <Share className="h-5 w-5 text-slate-600" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-estate-navy mb-2">{property.title}</h1>
                    <div className="flex items-center text-slate-500 mb-4">
                      <MapPin size={16} className="mr-1" />
                      <p className="text-sm">{property.address}</p>
                    </div>
                    <h2 className="text-3xl font-bold text-estate-gold mb-4">
                      {formatCurrency(property.price)}
                      {property.status === "For Rent" && <span className="text-sm text-slate-500 font-normal">/month</span>}
                    </h2>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6 border rounded-lg p-4 bg-slate-50">
                  <div className="text-center">
                    <Bed className="h-5 w-5 mx-auto mb-1 text-estate-navy" />
                    <p className="text-sm text-slate-600">{property.bedrooms} Beds</p>
                  </div>
                  <div className="text-center">
                    <Bath className="h-5 w-5 mx-auto mb-1 text-estate-navy" />
                    <p className="text-sm text-slate-600">{property.bathrooms} Baths</p>
                  </div>
                  <div className="text-center">
                    <Ruler className="h-5 w-5 mx-auto mb-1 text-estate-navy" />
                    <p className="text-sm text-slate-600">{property.sqft} sqft</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-3">Book a Tour</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-slate-600">
                    <Clock className="h-4 w-4 mr-2 text-estate-gold" />
                    <span>Available 7 days a week, 9:00 AM to 8:00 PM</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <CalendarIcon className="h-4 w-4 mr-2 text-estate-gold" />
                    <span>Select a date for your property tour</span>
                  </div>
                </div>
                
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border rounded-md mb-4"
                  disabled={(date) => 
                    date < new Date() || 
                    date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                  }
                />
                
                <Button 
                  className="w-full bg-estate-navy hover:bg-estate-gold text-white" 
                  onClick={handleBookTour}
                >
                  Book Tour
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Property Content */}
        <Tabs defaultValue="details" className="w-full mb-12">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="tours">Virtual Tours</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="border rounded-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">About this property</h2>
                <p className="text-slate-600 mb-8">
                  {property.description || `
                    This stunning ${property.bedrooms}-bedroom property offers a perfect blend of comfort and elegance. 
                    Featuring ${property.bathrooms} beautifully designed bathrooms and spanning ${property.sqft} square feet, 
                    this home provides ample space for both living and entertaining. The property is strategically located
                    in a prime area with excellent connectivity to major landmarks and amenities.
                  `}
                </p>
                
                <h3 className="text-lg font-semibold mb-3">Property Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {[
                    'Superb location with great connectivity',
                    'Modern architecture with premium finishes',
                    'Spacious rooms with excellent ventilation',
                    'High-quality fixtures and fittings',
                    'Ample natural light throughout',
                    'Secure gated community',
                    'Well-maintained common areas',
                    'Close to schools and hospitals'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-estate-gold flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold mb-3">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 mb-6">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-slate-500">Property Type</span>
                    <span className="font-medium">{property.type || 'Apartment'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-slate-500">Year Built</span>
                    <span className="font-medium">{property.yearBuilt || '2020'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-slate-500">Heating</span>
                    <span className="font-medium">Central</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-slate-500">Cooling</span>
                    <span className="font-medium">Central Air</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-slate-500">Parking</span>
                    <span className="font-medium">2 Covered Spots</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-slate-500">Lot Size</span>
                    <span className="font-medium">{property.lotSize || '2400'} sqft</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <AgentCard agent={agents[0]} />
                
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Contact Agent</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <Button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700">
                          <Phone className="h-4 w-4" />
                          Call Agent
                        </Button>
                        <Button className="w-full flex items-center justify-center gap-2 bg-estate-navy hover:bg-estate-gold">
                          <Mail className="h-4 w-4" />
                          Email Agent
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 gap-3">
                          <input 
                            type="text" 
                            placeholder="Your Name" 
                            className="w-full px-3 py-2 border rounded-md"
                          />
                          <input 
                            type="email" 
                            placeholder="Your Email" 
                            className="w-full px-3 py-2 border rounded-md"
                          />
                          <input 
                            type="tel" 
                            placeholder="Your Phone" 
                            className="w-full px-3 py-2 border rounded-md"
                          />
                          <textarea 
                            placeholder="I'm interested in this property and would like to schedule a viewing." 
                            className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                          ></textarea>
                        </div>
                        <Button className="w-full flex items-center justify-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Property Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3 text-estate-navy">Interior Features</h3>
                <ul className="space-y-2">
                  {[
                    'Open Floor Plan',
                    'Hardwood Flooring',
                    'High Ceilings',
                    'Walk-in Closets',
                    'Modern Kitchen',
                    'Granite Countertops',
                    'Stainless Steel Appliances',
                    'Pantry',
                    'Breakfast Bar'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-estate-gold" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 text-estate-navy">Exterior Features</h3>
                <ul className="space-y-2">
                  {[
                    'Landscaped Garden',
                    'Patio/Deck',
                    'Swimming Pool',
                    'Outdoor Kitchen',
                    'Fenced Yard',
                    'Sprinkler System',
                    'Security Lighting',
                    'Garage Door Opener',
                    'Private Entrance'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-estate-gold" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 text-estate-navy">Community Features</h3>
                <ul className="space-y-2">
                  {[
                    'Clubhouse',
                    'Fitness Center',
                    'Tennis Courts',
                    'Basketball Court',
                    'Children\'s Play Area',
                    'Walking Trails',
                    'Community Garden',
                    '24/7 Security',
                    'Visitor Parking'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-estate-gold" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tours" className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Virtual Tours</h2>
            
            {(property.has3DTour || property.hasVirtualTour) ? (
              <div className="space-y-6">
                <PropertyTour property={property} />
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <Home className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">No virtual tours available</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  This property doesn't have any virtual tours yet. 
                  Please contact the agent to schedule an in-person viewing.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="location" className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Location & Neighborhood</h2>
            
            <div className="aspect-video bg-slate-100 rounded-lg mb-6 overflow-hidden">
              {/* This would be a map in a real implementation */}
              <div className="w-full h-full flex items-center justify-center">
                <iframe 
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Neighborhood Highlights</h3>
                <ul className="space-y-2">
                  {[
                    '10 minutes to City Center',
                    'Close to Shopping Centers',
                    'Proximity to Public Transportation',
                    'Near Parks and Recreation',
                    'Low Crime Rate Area',
                    'Excellent School District'
                  ].map((highlight, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-estate-gold" />
                      <span className="text-slate-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Points of Interest</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Central Park</span>
                    <span className="text-slate-500">0.5 miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">City Hospital</span>
                    <span className="text-slate-500">1.2 miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Shopping Mall</span>
                    <span className="text-slate-500">0.8 miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Metro Station</span>
                    <span className="text-slate-500">0.3 miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">International School</span>
                    <span className="text-slate-500">1.5 miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Restaurant District</span>
                    <span className="text-slate-500">0.7 miles</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Similar Properties */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyProperties.map((nearbyProperty) => (
              <Card key={nearbyProperty.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-video relative">
                  <img 
                    src={nearbyProperty.imageUrl} 
                    alt={nearbyProperty.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">{nearbyProperty.title}</h3>
                  <p className="text-sm text-slate-500 mb-3">{nearbyProperty.location}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-estate-gold">{formatCurrency(nearbyProperty.price)}</span>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center">
                        <Bed className="h-3 w-3 mr-1" />
                        {nearbyProperty.bedrooms}
                      </span>
                      <span className="flex items-center">
                        <Bath className="h-3 w-3 mr-1" />
                        {nearbyProperty.bathrooms}
                      </span>
                      <span className="flex items-center">
                        <Ruler className="h-3 w-3 mr-1" />
                        {nearbyProperty.sqft}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-estate-navy text-estate-navy hover:bg-estate-navy hover:text-white"
                    onClick={() => navigate(`/properties/${nearbyProperty.id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyPage; 