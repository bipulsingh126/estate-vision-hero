
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Building } from 'lucide-react';

interface PropertyTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const PropertyTabs: React.FC<PropertyTabsProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <Tabs 
      defaultValue="all" 
      value={activeTab} 
      onValueChange={onTabChange}
      className="bg-white/10 inline-flex backdrop-blur-sm p-1 rounded-full mb-4"
    >
      <TabsList className="grid grid-cols-3 w-auto">
        <TabsTrigger value="all" className="px-6 data-[state=active]:bg-white data-[state=active]:text-estate-navy">
          All
        </TabsTrigger>
        <TabsTrigger value="sale" className="px-6 data-[state=active]:bg-white data-[state=active]:text-estate-navy">
          <Home className="h-4 w-4 mr-2" />
          For Sale
        </TabsTrigger>
        <TabsTrigger value="rent" className="px-6 data-[state=active]:bg-white data-[state=active]:text-estate-navy">
          <Building className="h-4 w-4 mr-2" />
          For Rent
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
