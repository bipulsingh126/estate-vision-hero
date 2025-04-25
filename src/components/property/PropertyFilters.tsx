
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PropertyFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const PropertyFilters = ({
  activeFilter,
  onFilterChange,
}: PropertyFiltersProps) => {
  const filters = [
    { id: "all", name: "All Properties" },
    { id: "sale", name: "For Sale" },
    { id: "rent", name: "For Rent" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-8">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "rounded-full px-6",
            activeFilter === filter.id ? "" : "text-muted-foreground"
          )}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};
