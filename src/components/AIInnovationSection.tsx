
import { useInView } from '@/lib/animations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Database, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AIInnovationSection = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section className="section bg-gradient-to-b from-background to-primary/5 py-20">
      <div className="container-tight">
        <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center mb-16">
          <span
            className={cn(
              "inline-block px-4 py-1 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium transition-opacity duration-700",
              isInView ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "100ms" }}
          >
            AI-Powered Innovation
          </span>
          <h2 
            className={cn(
              "text-3xl md:text-4xl font-bold mb-4 transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            Revolutionizing Entrepreneurial Support
          </h2>
          <p 
            className={cn(
              "text-lg text-muted-foreground max-w-3xl mx-auto transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: "300ms" }}
          >
            Our finalized prototype represents a significant evolution in streamlining the entrepreneurial journey, using AI Agents and RAG with ChromaDB to connect you with the right resources at the right time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* AI Matching Card */}
          <Card 
            className={cn(
              "border border-border/50 hover:border-primary/20 hover-lift transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: isInView ? "400ms" : "0s" }}
          >
            <CardHeader className="pb-2">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">AI-Powered Matching System</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground mb-4">
                Leverage CrewAI and LangChain for intelligent matching that connects entrepreneurs with the most relevant mentors, investors, and legal advisors based on specific business needs.
              </CardDescription>
              <Link to="/chat">
                <Button variant="ghost" size="sm" className="gap-1 p-0 h-auto">
                  <span>Chat with AI</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Data Management Card */}
          <Card 
            className={cn(
              "border border-border/50 hover:border-primary/20 hover-lift transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: isInView ? "500ms" : "0s" }}
          >
            <CardHeader className="pb-2">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Real-Time Data Aggregation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground mb-4">
                Powered by ChromaDB, our RAG system stores and retrieves up-to-date, curated information scraped from reputable websites, ensuring access to the latest insights and expert details.
              </CardDescription>
              <Link to="/chat">
                <Button variant="ghost" size="sm" className="gap-1 p-0 h-auto">
                  <span>Explore Data</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Expert Information Card */}
          <Card 
            className={cn(
              "border border-border/50 hover:border-primary/20 hover-lift transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: isInView ? "600ms" : "0s" }}
          >
            <CardHeader className="pb-2">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Dynamic Expert Information</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground mb-4">
                Continuous data collection via FireCrawl ensures our platform remains a dynamic and reliable resource by constantly updating details on mentors, investors, and legal advisors.
              </CardDescription>
              <Link to="/chat">
                <Button variant="ghost" size="sm" className="gap-1 p-0 h-auto">
                  <span>Find Experts</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div 
          className={cn(
            "mt-16 text-center transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: isInView ? "700ms" : "0s" }}
        >
          <Link to="/chat">
            <Button size="lg" className="px-8 gap-2">
              <span>Experience AI-Powered Support</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AIInnovationSection;
