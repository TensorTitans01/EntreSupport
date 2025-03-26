import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import PageTransition from './PageTransition';

interface AnimatedLayoutProps {
  children: ReactNode;
}

const AnimatedLayout = ({ children }: AnimatedLayoutProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        {children}
      </PageTransition>
    </AnimatePresence>
  );
};

export default AnimatedLayout; 