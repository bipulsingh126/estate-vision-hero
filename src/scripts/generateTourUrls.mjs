import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of 3D tour URLs to use randomly
const threeDTourUrls = [
    "https://my.matterport.com/show/?m=SxQL3iGyoDo",
    "https://my.matterport.com/show/?m=NjVisrEVhYu",
    "https://my.matterport.com/show/?m=aSx4eRiauqm",
    "https://my.matterport.com/show/?m=zRFmWKGHDJF",
    "https://my.matterport.com/show/?m=VAjwMvxvCCt",
    "https://my.matterport.com/show/?m=ZFmWKGHDJF",
    "https://my.matterport.com/show/?m=Ajv4oRiauqm",
    "https://my.matterport.com/show/?m=DDkVhYNisrEu",
    "https://my.matterport.com/show/?m=FzRFmWKGHDJ",
    "https://my.matterport.com/show/?m=VAjvCCtwMvx"
];

// List of virtual tour video URLs to use randomly
const virtualTourUrls = [
    "https://www.youtube-nocookie.com/embed/jNQXAC9IVRw",
    "https://www.youtube-nocookie.com/embed/THCEJJgw7ss",
    "https://www.youtube-nocookie.com/embed/EkQYf1Xn_Qo",
    "https://www.youtube-nocookie.com/embed/PTp7FmpGf7s",
    "https://www.youtube-nocookie.com/embed/KV0C6qzxjRY",
    "https://www.youtube-nocookie.com/embed/XhzZZaD1zzo",
    "https://www.youtube-nocookie.com/embed/aIeVWfEFMdw",
    "https://www.youtube-nocookie.com/embed/bh4LQG6ovFI",
    "https://www.youtube-nocookie.com/embed/8PpYlCsYgRY",
    "https://www.youtube-nocookie.com/embed/eMrpWyGBFNM"
];

// Get a random item from an array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Read the file
const filePath = path.resolve(__dirname, '../data/sampleProperties.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Regular expression to match property objects
const propertyRegex = /(\{[\s\S]*?has3DTour: true[\s\S]*?\}|\{[\s\S]*?hasVirtualTour: true[\s\S]*?\})/g;

// Function to process each property match
function processProperty(propertyMatch) {
    // Check if the property already has tour URLs
    if (propertyMatch.includes('tourUrl3D') || propertyMatch.includes('tourUrlVirtual')) {
        return propertyMatch;
    }

    let updatedProperty = propertyMatch;

    // Add 3D tour URL if needed
    if (propertyMatch.includes('has3DTour: true') && !propertyMatch.includes('tourUrl3D')) {
        // Find the last property to insert after
        const lastPropMatch = updatedProperty.match(/(\w+):\s*[^,}]*[,}](?!\s*[^}]*})/);
        if (lastPropMatch) {
            const lastProp = lastPropMatch[0];
            const insertPos = updatedProperty.lastIndexOf(lastProp) + lastProp.length;

            // Insert the tourUrl3D property
            const tourUrl3D = getRandomItem(threeDTourUrls);
            const insertion = lastProp.endsWith('}')
                ? `,\n    tourUrl3D: "${tourUrl3D}"\n  }`
                : `,\n    tourUrl3D: "${tourUrl3D}"`;

            updatedProperty = updatedProperty.substring(0, insertPos) +
                insertion +
                updatedProperty.substring(insertPos + (lastProp.endsWith('}') ? 1 : 0));
        }
    }

    // Add virtual tour URL if needed
    if (propertyMatch.includes('hasVirtualTour: true') && !propertyMatch.includes('tourUrlVirtual')) {
        // Find the last property to insert after
        const lastPropMatch = updatedProperty.match(/(\w+):\s*[^,}]*[,}](?!\s*[^}]*})/);
        if (lastPropMatch) {
            const lastProp = lastPropMatch[0];
            const insertPos = updatedProperty.lastIndexOf(lastProp) + lastProp.length;

            // Insert the tourUrlVirtual property
            const tourUrlVirtual = getRandomItem(virtualTourUrls);
            const insertion = lastProp.endsWith('}')
                ? `,\n    tourUrlVirtual: "${tourUrlVirtual}"\n  }`
                : `,\n    tourUrlVirtual: "${tourUrlVirtual}"`;

            updatedProperty = updatedProperty.substring(0, insertPos) +
                insertion +
                updatedProperty.substring(insertPos + (lastProp.endsWith('}') ? 1 : 0));
        }
    }

    return updatedProperty;
}

// Update all properties with has3DTour or hasVirtualTour set to true
content = content.replace(propertyRegex, processProperty);

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');

console.log('Tour URLs added to properties successfully!'); 