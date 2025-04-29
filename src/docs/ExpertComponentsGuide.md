# Expert Components Guide

This guide explains how to use the expert components in the Estate Vision application.

## Available Components

### 1. ExpertProfile

A standalone card component for displaying agent/expert profiles.

```jsx
import ExpertProfile from "@/components/agent/ExpertProfile";

// Usage
<ExpertProfile agent={agent} featured={true} />
```

Props:
- `agent`: Agent object with details
- `featured`: (optional) Boolean to show featured styling

### 2. ExpertTemplate

A flexible template that can display expert information in various formats.

```jsx
import ExpertTemplate from "@/components/templates/ExpertTemplate";

// Usage
<ExpertTemplate 
  agent={agent} 
  variant="card" // or "list", "featured", "compact"
  showActions={true}
  className="custom-class"
/>
```

Props:
- `agent`: Agent object with details
- `variant`: Display style - "card" (default), "list", "featured", "compact"
- `showActions`: Whether to show action buttons
- `className`: Additional CSS classes

### 3. ExpertStats

A component to display expert statistics and featured experts.

```jsx
import ExpertStats from "@/components/expert/ExpertStats";

// Usage
<ExpertStats 
  variant="default" // or "compact", "full"
  expertCount={20}
  totalExperience={165}
  featuredExpertIds={["1", "4", "7"]}
  className="custom-class"
/>
```

Props:
- `variant`: Display style - "default", "compact", "full"
- `expertCount`: Number of experts to display
- `totalExperience`: Total years of experience across all experts
- `featuredExpertIds`: IDs of experts to feature
- `className`: Additional CSS classes

### 4. MeetExperts Page

A full page dedicated to showcasing experts with filtering capabilities.

```jsx
// Add to your router
<Route path="/meet-experts" element={<MeetExperts />} />
```

## Agent Data Structure

The components expect agents to follow this structure:

```typescript
interface Agent {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  imageUrl: string;
  bio: string;
  specialties: string[];
  experience: number;
  listings: string[];
}
```

## Examples

### Adding Featured Experts to Homepage

```jsx
import ExpertStats from "@/components/expert/ExpertStats";

function HomePage() {
  return (
    <div>
      {/* Other homepage content */}
      <ExpertStats variant="compact" className="my-12" />
      {/* More homepage content */}
    </div>
  );
}
```

### Creating an Expert Listing

```jsx
import ExpertTemplate from "@/components/templates/ExpertTemplate";
import { sampleAgents } from "@/data/expertData";

function ExpertListing() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sampleAgents.map(agent => (
        <ExpertTemplate 
          key={agent.id} 
          agent={agent} 
          variant="list"
        />
      ))}
    </div>
  );
}
```

## Handling Image Errors

All expert components use the `EnhancedAvatar` component which has built-in error handling for images. If an image fails to load, it will display the expert's initials instead.

## Customization

The components use CSS variables from your theme and can be further customized using the `className` prop. 