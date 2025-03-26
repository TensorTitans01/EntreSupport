import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/animations';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [typingText, setTypingText] = useState<string>('');
  const wordsRef = useRef<string[]>(['entrepreneurs', 'startups', 'innovators', 'founders']);
  const wordIndexRef = useRef<number>(0);
  const charIndexRef = useRef<number>(0);
  const isDeleting = useRef<boolean>(false);
  const typingSpeed = useRef<number>(100);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const typeWriter = () => {
      const currentWord = wordsRef.current[wordIndexRef.current];
      
      if (isDeleting.current) {
        setTypingText(currentWord.substring(0, charIndexRef.current - 1));
        charIndexRef.current -= 1;
        typingSpeed.current = 50;
      } else {
        setTypingText(currentWord.substring(0, charIndexRef.current + 1));
        charIndexRef.current += 1;
        typingSpeed.current = 100;
      }
      
      if (!isDeleting.current && charIndexRef.current === currentWord.length) {
        isDeleting.current = true;
        typingSpeed.current = 1500; // Pause before deleting
      } else if (isDeleting.current && charIndexRef.current === 0) {
        isDeleting.current = false;
        wordIndexRef.current = (wordIndexRef.current + 1) % wordsRef.current.length;
        typingSpeed.current = 500; // Pause before typing next word
      }
      
      timeout = setTimeout(typeWriter, typingSpeed.current);
    };
    
    timeout = setTimeout(typeWriter, 1000);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section 
      className="relative min-h-[92vh] flex items-center overflow-hidden pt-20"
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      {/* Abstract background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-60 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-[40%] -right-20 w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] bg-indigo-300/10 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]"
      ></div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10 pt-10 md:pt-0">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className={cn(
              "inline-block px-4 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium transition-all duration-700 transform opacity-0",
              isInView && "opacity-100"
            )}
          >
            The Ultimate Platform for Entrepreneurs
          </div>
          
          <h1 
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight mb-6 transition-all duration-700 delay-100 transform opacity-0 translate-y-6",
              isInView && "opacity-100 translate-y-0"
            )}
          >
            Empowering <br className="md:hidden" />
            <span className="text-primary relative">
              {typingText}
              <span className="absolute top-0 ml-1 h-12 w-[2px] bg-primary animate-pulse"></span>
            </span> 
            <br />
            to succeed together
          </h1>
          
          <p 
            className={cn(
              "text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto transition-all duration-700 delay-200 transform opacity-0 translate-y-6",
              isInView && "opacity-100 translate-y-0"
            )}
          >
            Connect with mentors, find collaborators, and access the resources 
            you need through our AI-powered entrepreneurial ecosystem.
          </p>
          
          <div 
            className={cn(
              "transition-all duration-700 delay-300 transform opacity-0 translate-y-6",
              isInView && "opacity-100 translate-y-0"
            )}
          >
            <Link to="/analyze">
              <Button size="lg" className="px-8 gap-2">
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div 
            className={cn(
              "mt-16 flex flex-wrap justify-center gap-6 md:gap-12 transition-all duration-700 delay-400 transform opacity-0 translate-y-6",
              isInView && "opacity-100 translate-y-0"
            )}
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-foreground/90">10K+</span>
              <span className="text-sm text-muted-foreground">Entrepreneurs</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-foreground/90">1.5K+</span>
              <span className="text-sm text-muted-foreground">Mentors</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-foreground/90">92%</span>
              <span className="text-sm text-muted-foreground">Success Rate</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-foreground/90">24/7</span>
              <span className="text-sm text-muted-foreground">Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
