
import React from 'react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious, 
  PaginationEllipsis 
} from '@/components/ui/pagination';

interface PropertyPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PropertyPagination: React.FC<PropertyPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) return null;
  
  const handlePageClick = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault();
    onPageChange(page);
  };
  
  // Render pagination controls
  const renderPaginationLinks = () => {
    const items = [];
    
    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) onPageChange(currentPage - 1);
          }}
          className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "hover:text-estate-gold hover:border-estate-gold/30"} transition-colors`}
        />
      </PaginationItem>
    );
    
    // First page
    items.push(
      <PaginationItem key="1">
        <PaginationLink 
          href="#" 
          isActive={currentPage === 1}
          onClick={(e) => handlePageClick(e, 1)}
          className={currentPage === 1 ? "bg-estate-gold text-white hover:bg-estate-gold/90" : "hover:text-estate-gold hover:border-estate-gold/30"}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Ellipsis at the start if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis className="text-slate-400" />
        </PaginationItem>
      );
    }
    
    // Pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last pages as they're handled separately
      
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            href="#" 
            isActive={currentPage === i}
            onClick={(e) => handlePageClick(e, i)}
            className={currentPage === i ? "bg-estate-gold text-white hover:bg-estate-gold/90" : "hover:text-estate-gold hover:border-estate-gold/30"}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Ellipsis at the end if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis className="text-slate-400" />
        </PaginationItem>
      );
    }
    
    // Last page (if more than 1 page)
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            href="#" 
            isActive={currentPage === totalPages}
            onClick={(e) => handlePageClick(e, totalPages)}
            className={currentPage === totalPages ? "bg-estate-gold text-white hover:bg-estate-gold/90" : "hover:text-estate-gold hover:border-estate-gold/30"}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) onPageChange(currentPage + 1);
          }}
          className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:text-estate-gold hover:border-estate-gold/30"} transition-colors`}
        />
      </PaginationItem>
    );
    
    return items;
  };

  return (
    <div className="mt-8 flex justify-center">
      <Pagination>
        <PaginationContent className="bg-white rounded-lg shadow-sm border border-slate-200 p-1.5">
          {renderPaginationLinks()}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
