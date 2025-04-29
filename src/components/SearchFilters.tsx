import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, Home, Building, CircleDollarSign, BedDouble } from "lucide-react";
import { PropertyFilters } from "@/types/property";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";

interface SearchFiltersProps {
  onFilterChange?: (filters: PropertyFilters) => void;
}

const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [priceRange, setPriceRange] = useState<number[]>([5000000]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedBeds, setSelectedBeds] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const indianCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
  ];

  useEffect(() => {
    if (onFilterChange) {
      const filters: PropertyFilters = {
        location: selectedCity,
        propertyType: selectedType,
        bedrooms: selectedBeds,
        priceRange,
        searchTerm
      };
      onFilterChange(filters);
    }
  }, [selectedCity, selectedType, selectedBeds, priceRange, searchTerm, onFilterChange]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFilterChange) {
      const filters: PropertyFilters = {
        location: selectedCity,
        propertyType: selectedType,
        bedrooms: selectedBeds,
        priceRange,
        searchTerm
      };
      onFilterChange(filters);
    }
  };

  return (
    <section className="py-8 px-6 bg-white shadow-lg -mt-20 rounded-xl relative z-10 mx-4 lg:mx-auto max-w-5xl border border-slate-100 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center">
          <Search className="mr-2 h-5 w-5 text-estate-gold" />
          Find Your Dream Home
        </h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-slate-500 hover:text-estate-gold transition-colors"
        >
          {isExpanded ? "Simple Search" : "Advanced Search"}
        </Button>
      </div>

      <form onSubmit={handleSearch} className="space-y-6">
        {/* Main Search Area */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <Input 
            id="search-term" 
            placeholder="Search by location, property name or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-6 h-14 text-base border-slate-200 bg-slate-50 hover:bg-white focus:bg-white transition-colors shadow-sm"
          />
        </div>

        {/* Expanded Area */}
        <div className={cn(
          "grid gap-6 overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded ? "grid-rows-[1fr] opacity-100 max-h-[500px]" : "grid-rows-[0fr] opacity-0 max-h-0"
        )}>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Location */}
              <div>
                <Label htmlFor="location" className="text-sm font-medium mb-1.5 block text-slate-700">
                  Location
                </Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger id="location" className="w-full bg-slate-50 hover:bg-white focus:bg-white transition-colors h-11 border-slate-200">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-estate-gold" />
                      <SelectValue placeholder="Select city" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {indianCities.map((city) => (
                      <SelectItem key={city} value={city.toLowerCase()}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type */}
              <div>
                <Label htmlFor="type" className="text-sm font-medium mb-1.5 block text-slate-700">
                  Property Type
                </Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger id="type" className="w-full bg-slate-50 hover:bg-white focus:bg-white transition-colors h-11 border-slate-200">
                    <div className="flex items-center">
                      <Building className="mr-2 h-4 w-4 text-estate-gold" />
                      <SelectValue placeholder="Any type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="plot">Plot</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bedrooms */}
              <div>
                <Label htmlFor="bedrooms" className="text-sm font-medium mb-1.5 block text-slate-700">
                  Bedrooms
                </Label>
                <Select value={selectedBeds} onValueChange={setSelectedBeds}>
                  <SelectTrigger id="bedrooms" className="w-full bg-slate-50 hover:bg-white focus:bg-white transition-colors h-11 border-slate-200">
                    <div className="flex items-center">
                      <BedDouble className="mr-2 h-4 w-4 text-estate-gold" />
                      <SelectValue placeholder="Any" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price Range */}
            <div className="mt-5 p-5 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <Label htmlFor="price-range" className="text-sm font-medium text-slate-700 flex items-center">
                  <CircleDollarSign className="mr-2 h-4 w-4 text-estate-gold" />
                  Price Range
                </Label>
                <span className="text-sm bg-white px-3 py-1 rounded-full text-estate-navy font-medium border border-slate-200">
                  {formatCurrency(priceRange[0], { notation: 'compact' })}
                </span>
              </div>
              <Slider
                id="price-range"
                defaultValue={[5000000]}
                max={50000000}
                step={500000}
                onValueChange={setPriceRange}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>{formatCurrency(0, { notation: 'compact' })}</span>
                <span>{formatCurrency(50000000, { notation: 'compact' })}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="min-w-[120px] bg-gradient-to-r from-estate-gold to-amber-500 hover:from-amber-500 hover:to-estate-gold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Search className="mr-2 h-4 w-4" />
            Find Properties
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SearchFilters;
