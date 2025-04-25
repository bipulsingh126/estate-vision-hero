
import React, { useState } from "react";
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
import { Search, MapPin } from "lucide-react";

const SearchFilters = () => {
  const [priceRange, setPriceRange] = useState<number[]>([5000000]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedBeds, setSelectedBeds] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

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

  return (
    <section className="py-6 lg:py-8 bg-white shadow-md -mt-20 rounded-lg relative z-10 mx-4 lg:mx-auto max-w-5xl">
      <div className="px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          {/* Location */}
          <div className="md:col-span-2">
            <Label htmlFor="location" className="text-sm font-medium mb-1.5 block">
              Location
            </Label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger id="location" className="w-full">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Select city" />
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
            <Label htmlFor="type" className="text-sm font-medium mb-1.5 block">
              Property Type
            </Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Any type" />
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
            <Label htmlFor="bedrooms" className="text-sm font-medium mb-1.5 block">
              Bedrooms
            </Label>
            <Select value={selectedBeds} onValueChange={setSelectedBeds}>
              <SelectTrigger id="bedrooms">
                <SelectValue placeholder="Any" />
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

          {/* Search Button */}
          <div className="flex items-end">
            <Button className="w-full gap-2">
              <Search size={18} />
              Search
            </Button>
          </div>
        </div>

        {/* Price Range */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-1.5">
            <Label htmlFor="price-range" className="text-sm font-medium">
              Price Range
            </Label>
            <span className="text-sm text-muted-foreground">
              Up to ₹{(priceRange[0] / 100000).toFixed(1)} Cr
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
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>₹0</span>
            <span>₹1 Cr</span>
            <span>₹2 Cr</span>
            <span>₹3 Cr</span>
            <span>₹4 Cr</span>
            <span>₹5+ Cr</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFilters;
