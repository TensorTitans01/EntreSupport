import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useScrollTo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = useCallback((elementId: string) => {
    const scrollToElement = () => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      // Wait for navigation and DOM update
      setTimeout(scrollToElement, 100);
    } else {
      scrollToElement();
    }
  }, [navigate, location.pathname]);

  return scrollTo;
}; 