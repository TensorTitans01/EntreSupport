
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Article } from '@/assets/types';
import { useInView } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Clock, Search, BookOpen, Bookmark, ChevronRight, ArrowUpRight, Lightbulb } from 'lucide-react';

const KnowledgeBase = () => {
  const [ref, isInView] = useInView();
  
  // Sample articles data
  const articles: Article[] = [
    {
      id: "1",
      title: "Securing Your First Round of Funding: A Complete Guide",
      category: "Funding",
      author: "Alex Morgan",
      authorRole: "VC Partner",
      date: "Sep 28, 2023",
      readTime: "8 min read",
      summary: "Learn the essential steps to prepare your startup for investment, from crafting the perfect pitch deck to navigating term sheets.",
      imageUrl: "https://images.unsplash.com/photo-1579226905180-636b76d96082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "2",
      title: "Building a Minimum Viable Product That Customers Actually Want",
      category: "Product Development",
      author: "Sophia Lee",
      authorRole: "Product Strategist",
      date: "Oct 5, 2023",
      readTime: "6 min read",
      summary: "Avoid the common pitfalls of MVP development and learn how to create a product that genuinely addresses customer pain points.",
      imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "3",
      title: "The Legal Essentials Every Startup Founder Should Know",
      category: "Legal",
      author: "James Wilson",
      authorRole: "Startup Attorney",
      date: "Oct 10, 2023",
      readTime: "10 min read",
      summary: "Navigate the complex legal landscape of starting a business, from incorporation to intellectual property protection.",
      imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
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
            <Lightbulb className="h-3.5 w-3.5" />
            <span>Curated Insights</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Knowledge Hub</h2>
          <p className="text-muted-foreground text-lg">
            Access expert insights, guides, and resources to help you navigate every stage of your entrepreneurial journey.
          </p>
        </div>

        <div 
          className={cn(
            "flex items-center gap-4 mb-10 max-w-2xl mx-auto transition-all duration-700 delay-100 transform opacity-0 translate-y-8",
            isInView && "opacity-100 translate-y-0"
          )}
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for articles, guides, and resources..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="whitespace-nowrap">
            Advanced Search
          </Button>
        </div>

        <div 
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200",
            isInView && "stagger-children visible"
          )}
        >
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover-lift">
              <div className="h-40 relative">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3">
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background/90 text-foreground">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary/90 hover:bg-primary">{article.category}</Badge>
                </div>
              </div>
              <CardHeader className="pt-5 pb-2">
                <CardTitle className="text-xl line-clamp-2 h-[56px]">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <CardDescription className="flex items-center text-xs gap-1 mb-3">
                  <span className="font-medium">{article.author}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{article.date}</span>
                  <span className="text-muted-foreground">•</span>
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{article.readTime}</span>
                </CardDescription>
                <p className="text-sm text-muted-foreground line-clamp-3">{article.summary}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="text-primary gap-1 p-0 h-auto">
                  <span>Read article</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div 
          className={cn(
            "mt-12 text-center transition-all duration-700 delay-300 transform opacity-0 translate-y-8",
            isInView && "opacity-100 translate-y-0"
          )}
        >
          <Button variant="outline" size="lg" className="gap-2">
            <span>Browse Knowledge Library</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeBase;
