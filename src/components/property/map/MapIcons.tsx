
import L from 'leaflet';
import { Property } from '@/types/property';
import { formatCurrency } from '@/lib/utils';

// Fix for the marker icon issue in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Set up default icon once
let defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = defaultIcon;

// Create a custom marker icon
export const createCustomIcon = (property: Property, isSelected: boolean, isFeatured: boolean) => {
  const priceFormatted = formatCurrency(property.price);
  
  let backgroundClass = 'bg-white text-estate-navy border border-estate-gold/30';
  let scaleClass = 'shadow-md hover:scale-110';
  
  if (isSelected) {
    backgroundClass = 'bg-estate-gold text-white';
    scaleClass = 'shadow-lg scale-110';
  } else if (isFeatured) {
    backgroundClass = 'bg-estate-pink text-white';
    scaleClass = 'shadow-md scale-105 hover:scale-110';
  } else if (property.isPremium) {
    backgroundClass = 'bg-estate-navy text-white';
    scaleClass = 'shadow-md hover:scale-110';
  }
  
  const className = `
    flex items-center justify-center font-semibold text-sm px-2 py-1 rounded-full
    ${backgroundClass}
    ${scaleClass}
    transition-all duration-300 z-[500] whitespace-nowrap
  `;
  
  return L.divIcon({
    className: '',
    iconSize: [40, 20],
    iconAnchor: [20, 10],
    html: `<div class="${className}">${priceFormatted}</div>`
  });
};
