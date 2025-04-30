import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger, 
} from '@/components/ui/accordion';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  MapPin, 
  Building, 
  Home, 
  CircleDollarSign, 
  BedDouble,
  Bath,
  Square,
  Building2,
  ChevronRight,
  Filter,
  X,
  Star,
  Sparkles,
  Video,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { PropertyFilters } from '@/types/property';
import { formatCurrency } from '@/lib/utils';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface AdvancedPropertySearchProps {
  onSearch: (filters: PropertyFilters) => void;
  initialFilters?: PropertyFilters;
  className?: string;
}

const locations = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Miami",
  "San Francisco",
  "Boston",
  "Seattle",
  "Austin",
  "Nashville",
  "Denver",
  "Portland",
  "Dallas",
  "Philadelphia",
  "San Diego",
  "Atlanta",
  "Phoenix",
  "Minneapolis",
  "Charleston",
  "Aspen",
  "Lake Tahoe"
];

const propertyTypes = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "condo", label: "Condo" },
  { value: "penthouse", label: "Penthouse" },
  { value: "townhouse", label: "Townhouse" },
  { value: "studio", label: "Studio" },
  { value: "cabin", label: "Cabin" },
  { value: "bungalow", label: "Bungalow" },
  { value: "loft", label: "Loft" },
  { value: "farmhouse", label: "Farmhouse" },
  { value: "colonial", label: "Colonial" },
  { value: "craftsman", label: "Craftsman" },
  { value: "estate", label: "Estate" },
];

const defaultFilters: PropertyFilters = {
  location: "_any",
  propertyType: "_any",
  bedrooms: "_any",
  priceRange: [5000000],
  searchTerm: "",
};

export const AdvancedPropertySearch: React.FC<AdvancedPropertySearchProps> = ({
  onSearch,
  initialFilters = defaultFilters,
  className = "",
}) => {
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);
  const [showVirtualTour, setShowVirtualTour] = useState<boolean>(initialFilters.hasVirtualTour || false);
  const [show3DTour, setShow3DTour] = useState<boolean>(initialFilters.has3DTour || false);
  const [isPremium, setIsPremium] = useState<boolean>(initialFilters.isPremium || false);
  const [status, setStatus] = useState<string>(initialFilters.status || "_any");
  const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);
  
  // Count active filters for the badge display
  React.useEffect(() => {
    let count = 0;
    if (filters.location !== "_any") count++;
    if (filters.propertyType !== "_any") count++;
    if (filters.bedrooms !== "_any") count++;
    if (filters.searchTerm && filters.searchTerm.trim() !== "") count++;
    if (showVirtualTour) count++;
    if (show3DTour) count++;
    if (isPremium) count++;
    if (status !== "_any") count++;
    setActiveFiltersCount(count);
  }, [filters, showVirtualTour, show3DTour, isPremium, status]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      searchTerm: e.target.value,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Merge filters with advanced options
    const searchFilters = {
      ...filters,
      hasVirtualTour: showVirtualTour || undefined,
      has3DTour: show3DTour || undefined,
      isPremium: isPremium || undefined,
      status: status !== "_any" ? status : undefined,
    };
    
    onSearch(searchFilters);
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setShowVirtualTour(false);
    setShow3DTour(false);
    setIsPremium(false);
    setStatus("_any");
  };

  const isFilterActive = () => {
    return (
      filters.location !== "_any" ||
      filters.propertyType !== "_any" ||
      filters.bedrooms !== "_any" ||
      filters.searchTerm !== "" ||
      showVirtualTour ||
      show3DTour ||
      isPremium ||
      status !== "_any"
    );
  };

  // Main search form for desktop
  const FilterForm = () => (
    <form onSubmit={handleSearch} className="space-y-6">
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-estate-gold/70 group-hover:text-estate-gold transition-colors duration-200">
          <Search className="h-5 w-5" />
        </div>
        <Input
          placeholder="Search by location, property name, or keywords..."
          value={filters.searchTerm}
          onChange={handleInputChange}
          className="pl-10 py-6 h-14 text-base bg-white border-slate-200 shadow-sm hover:border-estate-gold/50 focus:border-estate-gold focus:ring-1 focus:ring-estate-gold/30 transition-all duration-200"
        />
      </div>
      
      {/* Main Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Location */}
        <div className="space-y-2 group">
          <Label htmlFor="location" className="text-sm font-medium text-slate-600 flex items-center group-hover:text-estate-navy transition-colors">
            <MapPin className="mr-1.5 h-3.5 w-3.5 text-estate-gold" />
            Location
          </Label>
          <Select 
            value={filters.location} 
            onValueChange={(value) => setFilters({...filters, location: value})}
          >
            <SelectTrigger 
              id="location" 
              className="w-full bg-white border-slate-200 hover:border-estate-gold/50 focus:border-estate-gold focus:ring-1 focus:ring-estate-gold/30 transition-all duration-200 text-slate-600"
            >
              <SelectValue placeholder="Any Location" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <SelectItem value="_any">Any Location</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location.toLowerCase()}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Property Type */}
        <div className="space-y-2 group">
          <Label htmlFor="property-type" className="text-sm font-medium text-slate-600 flex items-center group-hover:text-estate-navy transition-colors">
            <Building2 className="mr-1.5 h-3.5 w-3.5 text-estate-gold" />
            Property Type
          </Label>
          <Select 
            value={filters.propertyType} 
            onValueChange={(value) => setFilters({...filters, propertyType: value})}
          >
            <SelectTrigger 
              id="property-type" 
              className="w-full bg-white border-slate-200 hover:border-estate-gold/50 focus:border-estate-gold focus:ring-1 focus:ring-estate-gold/30 transition-all duration-200 text-slate-600"
            >
              <SelectValue placeholder="Any Type" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <SelectItem value="_any">Any Type</SelectItem>
              {propertyTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Bedrooms */}
        <div className="space-y-2 group">
          <Label htmlFor="bedrooms" className="text-sm font-medium text-slate-600 flex items-center group-hover:text-estate-navy transition-colors">
            <BedDouble className="mr-1.5 h-3.5 w-3.5 text-estate-gold" />
            Bedrooms
          </Label>
          <Select 
            value={filters.bedrooms} 
            onValueChange={(value) => setFilters({...filters, bedrooms: value})}
          >
            <SelectTrigger 
              id="bedrooms" 
              className="w-full bg-white border-slate-200 hover:border-estate-gold/50 focus:border-estate-gold focus:ring-1 focus:ring-estate-gold/30 transition-all duration-200 text-slate-600"
            >
              <SelectValue placeholder="Any Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_any">Any Bedrooms</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Status */}
        <div className="space-y-2 group">
          <Label htmlFor="status" className="text-sm font-medium text-slate-600 flex items-center group-hover:text-estate-navy transition-colors">
            <Home className="mr-1.5 h-3.5 w-3.5 text-estate-gold" />
            Status
          </Label>
          <Select 
            value={status} 
            onValueChange={setStatus}
          >
            <SelectTrigger 
              id="status" 
              className="w-full bg-white border-slate-200 hover:border-estate-gold/50 focus:border-estate-gold focus:ring-1 focus:ring-estate-gold/30 transition-all duration-200 text-slate-600"
            >
              <SelectValue placeholder="Any Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_any">Any Status</SelectItem>
              <SelectItem value="For Sale">For Sale</SelectItem>
              <SelectItem value="For Rent">For Rent</SelectItem>
              <SelectItem value="Sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Price Range */}
      <div className="p-6 bg-white rounded-lg border border-slate-200 space-y-3 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <Label htmlFor="price-range" className="text-sm font-medium text-slate-700 flex items-center">
            <CircleDollarSign className="mr-2 h-4 w-4 text-estate-gold" />
            Price Range
          </Label>
          <Badge variant="outline" className="bg-estate-navy/5 hover:bg-estate-navy/10 border-estate-gold/20 text-estate-navy px-3 py-1">
            {formatCurrency(filters.priceRange[0], { notation: 'compact' })}
          </Badge>
        </div>
        <Slider
          id="price-range"
          value={filters.priceRange}
          max={50000000}
          step={500000}
          onValueChange={(value) => setFilters({...filters, priceRange: value})}
          className="py-3"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>{formatCurrency(0)}</span>
          <span>{formatCurrency(50000000, { notation: 'compact' })}</span>
        </div>
      </div>
      
      {/* Advanced Filters */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="advanced-filters" className="border-slate-200">
          <AccordionTrigger className="text-sm font-medium text-slate-700 hover:text-estate-gold py-2">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4 text-estate-gold" />
              Advanced Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-estate-gold text-white font-medium text-xs">{activeFiltersCount}</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="flex items-center space-x-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50 transition-colors">
                <Checkbox
                  id="virtual-tour"
                  checked={showVirtualTour}
                  onCheckedChange={(checked) => setShowVirtualTour(!!checked)}
                  className="data-[state=checked]:bg-estate-gold data-[state=checked]:border-estate-gold border-slate-300"
                />
                <div className="space-y-0.5">
                  <Label htmlFor="virtual-tour" className="cursor-pointer font-medium text-slate-700">
                    Virtual Tour
                  </Label>
                  <p className="text-xs text-slate-500">Properties with video tours</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50 transition-colors">
                <Checkbox
                  id="3d-tour"
                  checked={show3DTour}
                  onCheckedChange={(checked) => setShow3DTour(!!checked)}
                  className="data-[state=checked]:bg-estate-gold data-[state=checked]:border-estate-gold border-slate-300"
                />
                <div className="space-y-0.5">
                  <Label htmlFor="3d-tour" className="cursor-pointer font-medium text-slate-700">
                    3D Tour Available
                  </Label>
                  <p className="text-xs text-slate-500">Explore with 3D walkthrough</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50 transition-colors">
                <Checkbox
                  id="premium"
                  checked={isPremium}
                  onCheckedChange={(checked) => setIsPremium(!!checked)}
                  className="data-[state=checked]:bg-estate-gold data-[state=checked]:border-estate-gold border-slate-300"
                />
                <div className="space-y-0.5">
                  <Label htmlFor="premium" className="cursor-pointer font-medium text-slate-700">
                    Premium Properties
                  </Label>
                  <p className="text-xs text-slate-500">Exclusive high-end listings</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-2 gap-3">
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={handleClearFilters}
          disabled={!isFilterActive()}
          className="text-slate-700 hover:bg-slate-100 border-slate-200 hover:border-slate-300 transition-colors"
        >
          <RefreshCw className="mr-2 h-3.5 w-3.5" />
          Reset
        </Button>
        
        <Button 
          type="submit" 
          className="flex-1 gap-2 bg-gradient-to-r from-estate-gold to-amber-500 hover:from-amber-600 hover:to-estate-gold text-white shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Search className="h-4 w-4" />
          Find Properties
          <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </Button>
      </div>
    </form>
  );

  // Mobile search button and sheet
  const MobileFilterButton = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="md:hidden flex items-center gap-2 bg-white border-slate-200 text-slate-700 hover:border-estate-gold/40 hover:bg-slate-50"
        >
          <Filter className="h-4 w-4 text-estate-gold" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="ml-1 bg-estate-gold text-white font-medium text-xs">{activeFiltersCount}</Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-xl">
        <SheetHeader className="border-b border-slate-100 pb-4">
          <SheetTitle className="text-xl flex items-center gap-2 text-slate-800">
            <Filter className="h-5 w-5 text-estate-gold" />
            Property Filters
            {activeFiltersCount > 0 && (
              <Badge className="ml-1 bg-estate-gold text-white font-medium text-xs">{activeFiltersCount}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <FilterForm />
        </div>
        <SheetFooter className="pt-4 flex justify-between border-t border-slate-100 mt-4">
          <SheetClose asChild>
            <Button variant="outline" className="border-slate-200">Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button 
              onClick={handleSearch} 
              className="bg-gradient-to-r from-estate-gold to-amber-500 hover:from-amber-600 hover:to-estate-gold"
            >
              Apply Filters
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );

  return (
    <Card className={`${className} border-slate-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300`}>
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 pb-4">
        <CardTitle className="text-xl flex items-center text-estate-navy">
          <Search className="mr-2 h-5 w-5 text-estate-gold" />
          Find Your Dream Property
          {activeFiltersCount > 0 && (
            <Badge className="ml-3 bg-estate-gold text-white">{activeFiltersCount} active filters</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="hidden md:block">
          <FilterForm />
        </div>
        <div className="md:hidden">
          <div className="relative mb-4 group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-estate-gold/70 group-hover:text-estate-gold transition-colors duration-200">
              <Search className="h-5 w-5" />
            </div>
            <Input
              placeholder="Search properties..."
              value={filters.searchTerm}
              onChange={handleInputChange}
              className="pl-10 py-6 h-12 text-base border-slate-200 hover:border-estate-gold/50 focus:border-estate-gold focus:ring-1 focus:ring-estate-gold/30 transition-all duration-200"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleSearch} 
              className="flex-1 bg-gradient-to-r from-estate-gold to-amber-500 hover:from-amber-600 hover:to-estate-gold text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <MobileFilterButton />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedPropertySearch;
