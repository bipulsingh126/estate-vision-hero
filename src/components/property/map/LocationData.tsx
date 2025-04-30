
// Indian cities with their coordinates
export const indianCities = [
  { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { name: "Delhi", lat: 28.6139, lng: 77.2090 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
  { name: "Lucknow", lat: 26.8467, lng: 80.9462 }
];

// Helper function to assign properties to locations
export const assignPropertiesToLocations = (properties: any[]) => {
  return properties.map(property => {
    // Assign each property to a random Indian city
    // Small variation to spread them out a bit within each city
    const randomCity = indianCities[Math.floor(Math.random() * indianCities.length)];
    const lat = randomCity.lat + (Math.random() - 0.5) * 0.05;
    const lng = randomCity.lng + (Math.random() - 0.5) * 0.05;
    
    // For properties that already mention a city, try to match them to the correct coordinates
    if (property.city) {
      const matchedCity = indianCities.find(city => 
        city.name.toLowerCase() === property.city?.toLowerCase()
      );
      
      if (matchedCity) {
        return {
          ...property,
          lat: matchedCity.lat + (Math.random() - 0.5) * 0.03,
          lng: matchedCity.lng + (Math.random() - 0.5) * 0.03,
          cityName: matchedCity.name
        };
      }
    }
    
    return {
      ...property,
      lat,
      lng,
      cityName: randomCity.name
    };
  });
};
