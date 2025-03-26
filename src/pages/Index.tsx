import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import { AIInnovationSection } from '@/components';
import MentorshipSection from '@/components/MentorshipSection';
import NetworkingHub from '@/components/NetworkingHub';
import KnowledgeBase from '@/components/KnowledgeBase';
import { Button } from '@/components/ui/button';
import { FeatureCard } from '@/components/FeatureCard';
import { Feature } from '@/assets/types';
import { cn } from '@/lib/utils';
import { Sparkles, Users, BookOpen, Award, MessageSquare, Calendar, ArrowRight } from 'lucide-react';

const Index = () => {
  // Function to handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.reveal-on-scroll');
      const staggerElements = document.querySelectorAll('.stagger-children');
      
      const isInViewport = (element: Element) => {
        const rect = element.getBoundingClientRect();
        return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
      };
      
      revealElements.forEach((element) => {
        if (isInViewport(element)) {
          element.classList.add('visible');
        }
      });
      
      staggerElements.forEach((element) => {
        if (isInViewport(element)) {
          element.classList.add('visible');
        }
      });
    };
    
    // Initial check
    setTimeout(handleScroll, 100);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Sample features data
  const features: Feature[] = [
    {
      title: "AI-Powered Mentor Matching",
      description: "Our intelligent algorithm matches you with mentors who have the specific expertise you need at your current stage.",
      icon: "sparkles"
    },
    {
      title: "Smart Networking",
      description: "Connect with the right people through our AI-driven recommendation system based on mutual interests and goals.",
      icon: "users"
    },
    {
      title: "Personalized Knowledge",
      description: "Access a curated library of resources tailored to your industry, business stage, and specific challenges.",
      icon: "book"
    },
    {
      title: "Expert Webinars",
      description: "Attend live and on-demand webinars from industry leaders covering the latest trends and strategies.",
      icon: "award"
    },
    {
      title: "Founder Community",
      description: "Join discussions with fellow entrepreneurs to share experiences, get advice, and build lasting relationships.",
      icon: "message"
    },
    {
      title: "Virtual Events",
      description: "Participate in exclusive networking events, pitch competitions, and workshops from anywhere in the world.",
      icon: "calendar"
    }
  ];
  
  // Map icon names to actual icon components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'sparkles': return Sparkles;
      case 'users': return Users;
      case 'book': return BookOpen;
      case 'award': return Award;
      case 'message': return MessageSquare;
      case 'calendar': return Calendar;
      default: return Sparkles;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <Hero />
        
        {/* AI Innovation Section - NEW */}
        <AIInnovationSection />
        
        {/* Features section */}
        <section className="py-8">
          <div className="container-tight">
            <div className="text-center mb-8 max-w-2xl mx-auto reveal-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
              <p className="text-muted-foreground text-lg">
                Our platform brings together all the essential tools and resources entrepreneurs need in one seamless experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={feature.title} 
                  feature={feature} 
                  icon={getIconComponent(feature.icon)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Mentorship section */}
        <section id="mentorship" className="py-8">
          <MentorshipSection />
        </section>
        
        {/* Networking section */}
        <section id="networking" className="py-8">
          <NetworkingHub />
        </section>
        
        {/* Resources section */}
        <section id="resources" className="py-8">
          <KnowledgeBase />
        </section>
        
        {/* Regular CTA section */}
        <section className="py-8 bg-gradient-to-b from-background to-primary/10">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="glass-card p-6 md:p-8 text-center reveal-on-scroll">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Get Started Today
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Ready to Transform Your Entrepreneurial Journey?</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of founders who are accelerating their growth, making valuable connections, and accessing the knowledge they need to succeed.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/analyze">
                  <Button size="lg" className="px-8 gap-2">
                    <span>Analyze Your Startup</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="px-8">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">ES</span>
              </div>
              <span className="font-medium">EntreSupport</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EntreSupport. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
