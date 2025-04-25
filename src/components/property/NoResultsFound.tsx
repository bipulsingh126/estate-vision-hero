
import React from "react";
import { Button } from "@/components/ui/button";
import { ContentTemplate } from "../templates/ContentTemplate";
import { Search } from "lucide-react";

interface NoResultsFoundProps {
  onReset: () => void;
}

export const NoResultsFound = ({ onReset }: NoResultsFoundProps) => {
  return (
    <ContentTemplate variant="gradient" className="py-10 text-center">
      <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
      <h3 className="text-xl font-medium mb-2">No properties found</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        We couldn't find any properties matching your search criteria. Try adjusting your filters or search term.
      </p>
      <Button onClick={onReset} variant="default">
        Reset Filters
      </Button>
    </ContentTemplate>
  );
};
