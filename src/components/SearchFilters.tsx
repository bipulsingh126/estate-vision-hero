
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
  const [priceRange, setPriceRange] = useState<number[]>([500000]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedBeds, setSelectedBeds] = useState<string>("");

  return (
    <section className="py-6 lg:py-8 bg-white shadow-md -mt-20 rounded-lg relative z-10 mx-4 lg:mx-auto max-w-5xl">
      <div className="px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          {/* Location */}
          <div className="md:col-span-2">
            <Label htmlFor="location" className="text-sm font-medium mb-1.5 block">
              Location
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="location"
                placeholder="City, neighborhood, or address"
                className="pl-10"
              />
            </div>
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
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="land">Land</SelectItem>
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
              Up to ${priceRange[0].toLocaleString()}
            </span>
          </div>
          <Slider
            id="price-range"
            defaultValue={[500000]}
            max={5000000}
            step={50000}
            onValueChange={setPriceRange}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>$0</span>
            <span>$1M</span>
            <span>$2M</span>
            <span>$3M</span>
            <span>$4M</span>
            <span>$5M+</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFilters;
