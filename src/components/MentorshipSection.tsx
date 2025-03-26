
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ProfileCard } from '@/components/ProfileCard';
import { Mentor } from '@/assets/types';
import { useInView } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { MessageCircle, Sparkles, Filter } from 'lucide-react';

const MentorshipSection = () => {
  const [ref, isInView] = useInView();
  const [industry, setIndustry] = useState<string>("all");
  
  // Sample mentor data
  const mentors: Mentor[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "CEO & Founder",
      company: "GrowthMentor Inc.",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      expertise: ["Business Strategy", "Fundraising", "Marketing"],
      availability: "10 hrs/week",
      rating: 4.9,
      reviews: 124,
      bio: "Former VP at Fortune 500 company with 15+ years of experience helping startups scale and raise capital."
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Tech Advisor",
      company: "TechStars",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      expertise: ["Software Development", "Product Management", "AI"],
      availability: "5 hrs/week",
      rating: 4.7,
      reviews: 98,
      bio: "Ex-Google engineer with deep expertise in AI and machine learning. Helped 20+ startups build scalable products."
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      role: "Marketing Director",
      company: "Growth Hackers",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      expertise: ["Digital Marketing", "Social Media", "SEO", "Content Strategy"],
      availability: "8 hrs/week",
      rating: 4.8,
      reviews: 87,
      bio: "Digital marketing wizard who has helped startups grow from zero to millions in revenue through innovative strategies."
    }
  ];

  return (
    <section 
      className="section bg-gradient-to-b from-transparent to-secondary/30"
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
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI-Powered Matching</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find the Perfect Mentor</h2>
          <p className="text-muted-foreground text-lg">
            Connect with industry experts who can guide you through every step of your entrepreneurial journey.
          </p>
        </div>

        <div 
          className={cn(
            "flex flex-col md:flex-row gap-4 mb-10 transition-all duration-700 delay-100 transform opacity-0 translate-y-8",
            isInView && "opacity-100 translate-y-0"
          )}
        >
          <div className="flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-muted-foreground" />
              </div>
              <Select
                value={industry}
                onValueChange={setIndustry}
              >
                <SelectTrigger className="pl-10 bg-background border border-input">
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="health">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button variant="default" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Get AI Recommendations</span>
          </Button>
        </div>

        <div 
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200",
            isInView && "stagger-children visible"
          )}
        >
          {mentors.map((mentor) => (
            <ProfileCard 
              key={mentor.id} 
              profile={mentor} 
              isMentor={true}
            />
          ))}
        </div>

        <div 
          className={cn(
            "mt-12 text-center transition-all duration-700 delay-300 transform opacity-0 translate-y-8",
            isInView && "opacity-100 translate-y-0"
          )}
        >
          <Button variant="outline" size="lg">
            View All Mentors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MentorshipSection;
