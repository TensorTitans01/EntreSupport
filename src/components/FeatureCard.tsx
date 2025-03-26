
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/animations';
import { Feature } from '@/assets/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  feature: Feature;
  icon: LucideIcon;
  index: number;
  className?: string;
}

export const FeatureCard = ({ feature, icon: Icon, index, className }: FeatureCardProps) => {
  const [ref, isInView] = useInView();
  
  return (
    <Card 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'border border-border/50 hover:border-primary/20 hover-lift transition-all duration-500 transform opacity-0 translate-y-8',
        isInView && `opacity-100 translate-y-0`,
        className
      )}
      style={{
        transitionDelay: isInView ? `${index * 0.1}s` : '0s'
      }}
    >
      <CardHeader className="pb-2">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{feature.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
      </CardContent>
    </Card>
  );
};
