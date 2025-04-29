import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Calendar, Search, Home, User, Eye, ArrowUpRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Sample activity data
const activities = [
  {
    id: 1,
    type: 'view',
    title: 'Luxury Apartment in Downtown',
    description: 'You viewed property details',
    time: '2 hours ago',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    icon: Eye,
    link: '/properties',
  },
  {
    id: 2,
    type: 'search',
    title: 'Beachfront properties in Miami',
    description: 'You performed this search',
    time: '1 day ago',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    icon: Search,
    link: '/properties',
  },
  {
    id: 3,
    type: 'save',
    title: 'Modern Villa with Ocean View',
    description: 'You saved this property',
    time: '2 days ago',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    icon: Home,
    link: '/properties',
  },
  {
    id: 4,
    type: 'contact',
    title: 'Family House in Suburbs',
    description: 'You contacted agent Sarah Johnson',
    time: '3 days ago',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    icon: User,
    link: '/properties',
  },
  {
    id: 5,
    type: 'view',
    title: 'Penthouse with City Views',
    description: 'You viewed property details',
    time: '4 days ago',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    icon: Eye,
    link: '/properties',
  },
  {
    id: 6,
    type: 'search',
    title: 'Mountain cabins with fireplace',
    description: 'You performed this search',
    time: '5 days ago',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    icon: Search,
    link: '/properties',
  }
];

// Sample searches
const recentSearches = [
  { id: 1, query: 'Beachfront properties', date: '1 day ago', count: 15 },
  { id: 2, query: '3 bedroom apartments', date: '3 days ago', count: 24 },
  { id: 3, query: 'Houses with garden', date: '1 week ago', count: 36 },
  { id: 4, query: 'Modern condos with parking', date: '2 weeks ago', count: 12 },
  { id: 5, query: 'Properties with pool', date: '3 weeks ago', count: 18 },
];

const ActivityCard = ({ activity }: { activity: typeof activities[0] }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardContent className="p-0">
        <div className="flex p-4 items-start gap-3 border-l-2 border-primary">
          <div className="flex-shrink-0 mt-1">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <activity.icon className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium line-clamp-1">{activity.title}</h4>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
              <Badge 
                variant="outline" 
                className={`
                  rounded-full text-xs px-2 
                  ${activity.type === 'view' ? 'bg-blue-50 text-blue-600' : ''}
                  ${activity.type === 'search' ? 'bg-purple-50 text-purple-600' : ''}
                  ${activity.type === 'save' ? 'bg-green-50 text-green-600' : ''}
                  ${activity.type === 'contact' ? 'bg-orange-50 text-orange-600' : ''}
                `}
              >
                {activity.type}
              </Badge>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>{activity.time}</span>
              </div>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" asChild>
                <Link to={activity.link} className="flex items-center gap-1">
                  <span>View</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ActivityHistory = () => {
  const [filterType, setFilterType] = useState<string | null>(null);
  
  const filteredActivities = filterType 
    ? activities.filter(activity => activity.type === filterType)
    : activities;

  return (
    <div className="space-y-8">
      <Tabs defaultValue="activities" className="space-y-6">
        <TabsList>
          <TabsTrigger value="activities" className="gap-2">
            <Clock className="h-4 w-4" />
            <span>Activities</span>
          </TabsTrigger>
          <TabsTrigger value="searches" className="gap-2">
            <Search className="h-4 w-4" />
            <span>Recent Searches</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="activities" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Activity History</h3>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className={`text-xs h-8 gap-1 ${!filterType ? 'bg-primary text-white hover:text-white hover:bg-primary/90' : ''}`}
                onClick={() => setFilterType(null)}
              >
                <Filter className="h-3 w-3" />
                All
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`text-xs h-8 gap-1 ${filterType === 'view' ? 'bg-blue-600 text-white hover:text-white hover:bg-blue-700' : ''}`}
                onClick={() => setFilterType('view')}
              >
                <Eye className="h-3 w-3" />
                Views
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`text-xs h-8 gap-1 ${filterType === 'search' ? 'bg-purple-600 text-white hover:text-white hover:bg-purple-700' : ''}`}
                onClick={() => setFilterType('search')}
              >
                <Search className="h-3 w-3" />
                Searches
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`text-xs h-8 gap-1 ${filterType === 'save' ? 'bg-green-600 text-white hover:text-white hover:bg-green-700' : ''}`}
                onClick={() => setFilterType('save')}
              >
                <Home className="h-3 w-3" />
                Saves
              </Button>
            </div>
          </div>
          
          {filteredActivities.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-muted-foreground">No activities matching the selected filter</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredActivities.map(activity => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="searches" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Recent Searches</h3>
            <Button variant="outline" size="sm" className="text-xs h-8">
              Clear History
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentSearches.map(search => (
                  <div key={search.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <Search className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{search.query}</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{search.date}</span>
                            <span className="mx-2">•</span>
                            <span>{search.count} results</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <Search className="h-3 w-3" />
                          <span>Search Again</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActivityHistory; 