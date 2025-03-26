import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Menu, 
  MessageSquare, 
  Users, 
  Layers,
  Sparkles 
} from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollTo } from '@/hooks/useScrollTo';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const scrollTo = useScrollTo();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavItems = () => (
    <>
      <Link to="/analyze">
        <Button variant="default" className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Analyze Startup</span>
        </Button>
      </Link>
      <Button 
        variant="ghost" 
        className="flex items-center gap-2"
        onClick={() => scrollTo('mentorship')}
      >
        <MessageSquare className="w-4 h-4" />
        <span>Mentorship</span>
      </Button>
      <Button 
        variant="ghost" 
        className="flex items-center gap-2"
        onClick={() => scrollTo('networking')}
      >
        <Users className="w-4 h-4" />
        <span>Networking</span>
      </Button>
      <Button 
        variant="ghost" 
        className="flex items-center gap-2"
        onClick={() => scrollTo('resources')}
      >
        <Layers className="w-4 h-4" />
        <span>Resources</span>
      </Button>
    </>
  );

  return (
    <AnimatePresence mode="wait">
      <motion.header
        key={location.pathname}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.3
        }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3',
          scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/" className="flex items-center gap-2 font-medium text-xl">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">ES</span>
              </div>
              <span className="hidden md:block">EntreSupport</span>
            </Link>
          </motion.div>

          <motion.div 
            className="hidden md:flex items-center gap-1"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <NavItems />
          </motion.div>

          <motion.div 
            className="flex items-center gap-2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative w-9 h-9 md:w-auto md:h-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search..."
                className="rounded-full bg-secondary/50 border-transparent pl-9 pr-4 h-9 w-9 md:w-[200px] focus:w-[200px] transition-all duration-300 focus:border-primary"
              />
            </div>

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[300px] sm:w-[350px]">
                  <motion.div 
                    className="flex flex-col gap-6 mt-10"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="space-y-3">
                      <SheetClose asChild>
                        <Link to="/analyze">
                          <Button className="w-full gap-2 justify-start" variant="default">
                            <Sparkles className="h-4 w-4" />
                            <span>Analyze Startup</span>
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button 
                          className="w-full gap-2 justify-start" 
                          variant="ghost"
                          onClick={() => scrollTo('mentorship')}
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>Mentorship</span>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button 
                          className="w-full gap-2 justify-start" 
                          variant="ghost"
                          onClick={() => scrollTo('networking')}
                        >
                          <Users className="h-4 w-4" />
                          <span>Networking</span>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button 
                          className="w-full gap-2 justify-start" 
                          variant="ghost"
                          onClick={() => scrollTo('resources')}
                        >
                          <Layers className="h-4 w-4" />
                          <span>Resources</span>
                        </Button>
                      </SheetClose>
                    </div>
                  </motion.div>
                </SheetContent>
              </Sheet>
            </div>
          </motion.div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
};

export default Navbar;
