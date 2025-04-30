import L from 'leaflet';
import { Property } from '@/types/property';
import { formatCurrency } from '@/lib/utils';

// Fix for the marker icon issue in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix the default icon issue - this is crucial for react-leaflet to work
function fixLeafletIcon() {
  // @ts-ignore - Known issue with TS and leaflet
  delete L.Icon.Default.prototype._getIconUrl;
  
  L.Icon.Default.mergeOptions({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
}

// Run the fix immediately
fixLeafletIcon();

// Create a custom marker icon
export const createCustomIcon = (property: Property, isSelected: boolean, isFeatured: boolean) => {
  const priceFormatted = formatCurrency(property.price);
  
  // Define classes based on property status
  let bgColor = 'white';
  let textColor = 'black';
  let borderColor = '#FFD700';
  let scale = 1;
  
  if (isSelected) {
    bgColor = '#FFD700'; // estate-gold
    textColor = 'white';
    borderColor = '#FFD700';
    scale = 1.1;
  } else if (isFeatured) {
    bgColor = '#FF69B4'; // estate-pink
    textColor = 'white';
    borderColor = '#FF69B4';
    scale = 1.05;
  } else if (property.isPremium) {
    bgColor = '#000080'; // estate-navy
    textColor = 'white';
    borderColor = '#000080';
  }
  
  // Create the HTML for the custom marker
  const html = `
    <div 
      style="
        background-color: ${bgColor}; 
        color: ${textColor}; 
        border: 1px solid ${borderColor};
        padding: 2px 8px;
        border-radius: 9999px;
        font-size: 12px;
        font-weight: 500;
        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        transform: scale(${scale});
        transition: transform 0.3s;
        white-space: nowrap;
      "
    >
      ${priceFormatted}
    </div>
  `;
  
  return L.divIcon({
    className: '',
    iconSize: [80, 30],
    iconAnchor: [40, 15],
    popupAnchor: [0, -15],
    html: html
  });
};
