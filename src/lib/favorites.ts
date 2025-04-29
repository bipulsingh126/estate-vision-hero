import { Property } from "@/types/property";
import { toast } from "sonner";

// Local storage key for saved properties
const SAVED_PROPERTIES_KEY = 'estate-vision-saved-properties';

/**
 * Get all saved properties from local storage
 */
export const getSavedProperties = (): Property[] => {
  try {
    const saved = localStorage.getItem(SAVED_PROPERTIES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading saved properties:', error);
    return [];
  }
};

/**
 * Save a property to favorites
 */
export const saveProperty = (property: Property): boolean => {
  try {
    const savedProperties = getSavedProperties();
    
    // Check if already saved
    if (savedProperties.some(p => p.id === property.id)) {
      toast.info('Property is already saved');
      return false;
    }
    
    // Add to saved properties
    const updatedSavedProperties = [...savedProperties, property];
    localStorage.setItem(SAVED_PROPERTIES_KEY, JSON.stringify(updatedSavedProperties));
    
    toast.success('Property saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving property:', error);
    toast.error('Failed to save property');
    return false;
  }
};

/**
 * Remove a property from favorites
 */
export const removeProperty = (propertyId: string): boolean => {
  try {
    const savedProperties = getSavedProperties();
    const updatedSavedProperties = savedProperties.filter(p => p.id !== propertyId);
    
    localStorage.setItem(SAVED_PROPERTIES_KEY, JSON.stringify(updatedSavedProperties));
    
    toast.success('Property removed from saved list');
    return true;
  } catch (error) {
    console.error('Error removing property:', error);
    toast.error('Failed to remove property');
    return false;
  }
};

/**
 * Check if a property is saved
 */
export const isPropertySaved = (propertyId: string): boolean => {
  const savedProperties = getSavedProperties();
  return savedProperties.some(p => p.id === propertyId);
}; 