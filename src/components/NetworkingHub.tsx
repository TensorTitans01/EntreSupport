
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileCard } from '@/components/ProfileCard';
import { User, NetworkingEvent } from '@/assets/types';
import { useInView } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Calendar, Users, Clock, MapPin, Briefcase, Network } from 'lucide-react';

const NetworkingHub = () => {
  const [ref, isInView] = useInView();
  const [activeTab, setActiveTab] = useState<string>("people");
  
  // Sample connection data
  const connections: User[] = [
    {
      id: "1",
      name: "David Park",
      role: "Startup Founder",
      company: "InnovateTech",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      industry: "SaaS",
      skills: ["Project Management", "Team Leadership", "Business Development"],
      bio: "Building the next generation of project management tools. Looking to connect with fellow founders and potential investors."
    },
    {
      id: "2",
      name: "Jessica Wong",
      role: "Angel Investor",
      company: "Horizon Ventures",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      industry: "Fintech",
      skills: ["Investment Strategy", "Financial Analysis", "Business Scaling"],
      bio: "Angel investor looking for promising early-stage startups in fintech and health tech spaces. Previously founded and sold two successful companies."
    }
  ];
  
  // Sample events data
  const events: NetworkingEvent[] = [
    {
      id: "1",
      title: "Startup Pitch Night",
      date: "Oct 15, 2023",
      time: "6:00 PM - 9:00 PM",
      description: "Present your startup idea to a panel of investors and get valuable feedback. Network with fellow entrepreneurs.",
      attendees: 120,
      category: "Pitch",
      imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
    },
    {
      id: "2",
      title: "Tech Founders Meetup",
      date: "Oct 22, 2023",
      time: "5:30 PM - 7:30 PM",
      description: "Monthly gathering of tech founders to share experiences, challenges and opportunities in the industry.",
      attendees: 85,
      category: "Meetup",
      imageUrl: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
    }
  ];

  return (
    <section 
      className="section"
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div className="container-tight">
        <div 
          className={cn(
            "text-center mb-16 max-w-2xl mx-auto transition-all duration-700 transform opacity-0 translate-y-8",
            isInView && "opacity-100 translate-y-0"
          )}
        >
          <div className="inline-flex items-center mb-3 gap-2 text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            <Network className="h-3.5 w-3.5" />
            <span>Smart Networking</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect with the Right People</h2>
          <p className="text-muted-foreground text-lg">
            Discover potential collaborators, investors, and fellow entrepreneurs who align with your goals and vision.
          </p>
        </div>

        <Tabs 
          defaultValue="people" 
          className={cn(
            "transition-all duration-700 delay-100 transform opacity-0 translate-y-8",
            isInView && "opacity-100 translate-y-0"
          )}
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="people" className="gap-2">
                <Users className="h-4 w-4" />
                <span>People</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="gap-2">
                <Calendar className="h-4 w-4" />
                <span>Events</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="people" className="space-y-6 mt-4">
            <div 
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-6",
                activeTab === "people" && "stagger-children visible"
              )}
            >
              {connections.map((connection) => (
                <ProfileCard 
                  key={connection.id} 
                  profile={connection}
                />
              ))}
              
              <Card className="border border-dashed border-border/80 bg-background/50 hover:bg-background/80 transition-all hover-lift cursor-pointer flex flex-col items-center justify-center py-10">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Discover More Connections</h3>
                <p className="text-sm text-muted-foreground text-center max-w-[250px] mb-4">
                  Find the perfect business partners, advisors, and peers
                </p>
                <Button variant="outline" size="sm">Explore Network</Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-6 mt-4">
            <div 
              className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-6",
                activeTab === "events" && "stagger-children visible"
              )}
            >
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden hover-lift">
                  <div className="h-48 relative">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary/90 hover:bg-primary">{event.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{event.date}</span>
                      <span className="text-muted-foreground">•</span>
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{event.time}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    <div className="mt-4 flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-3">
                    <Button variant="outline" size="sm">Learn More</Button>
                    <Button size="sm">Register</Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="border border-dashed border-border/80 bg-background/50 hover:bg-background/80 transition-all hover-lift cursor-pointer flex flex-col items-center justify-center py-10">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Find More Events</h3>
                <p className="text-sm text-muted-foreground text-center max-w-[250px] mb-4">
                  Discover conferences, meetups, and workshops in your industry
                </p>
                <Button variant="outline" size="sm">Browse Events</Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default NetworkingHub;
