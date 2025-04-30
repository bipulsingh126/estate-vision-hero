
import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';

interface SortOption {
  value: string;
  label: string;
}

interface SortSelectProps {
  sortOption: string;
  onSortChange: (value: string) => void;
  sortOptions: SortOption[];
}

export const SortSelect: React.FC<SortSelectProps> = ({ 
  sortOption, 
  onSortChange,
  sortOptions
}) => {
  return (
    <Select value={sortOption} onValueChange={onSortChange}>
      <SelectTrigger className="w-full md:w-[200px] border-slate-200 hover:border-estate-gold/50 focus:border-estate-gold focus:ring-1 focus:ring-estate-gold/30 bg-white">
        <div className="flex items-center">
          <ArrowUpDown className="mr-2 h-4 w-4 text-estate-gold" />
          <SelectValue placeholder="Sort by" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
