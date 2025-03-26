
import { useEffect, useRef, useState } from 'react';

// Hook to detect when an element is in viewport
export const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.1,
      ...options
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView] as const;
};

// Hook to create staggered animations
export const useStaggeredAnimation = (itemCount: number, staggerDelay = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const items = Array.from({ length: itemCount }).map((_, i) => ({
    style: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.5s ease-out ${i * staggerDelay}s, transform 0.5s ease-out ${i * staggerDelay}s`
    }
  }));

  return [ref, items] as const;
};
