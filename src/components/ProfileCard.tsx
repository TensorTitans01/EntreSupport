
import { User, Mentor } from '@/assets/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MessageSquare, Calendar, Star } from 'lucide-react';
import { useInView } from '@/lib/animations';

interface ProfileCardProps {
  profile: User | Mentor;
  isMentor?: boolean;
  className?: string;
}

export const ProfileCard = ({ profile, isMentor = false, className }: ProfileCardProps) => {
  const [ref, isInView] = useInView();

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'glass-card p-6 hover-lift transition-all duration-500 opacity-0 translate-y-6',
        isInView && 'opacity-100 translate-y-0',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          <img 
            src={profile.avatarUrl} 
            alt={profile.name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-white/50 shadow-md"
            loading="lazy"
          />
          {isMentor && (
            <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
              <Star className="w-3 h-3" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-lg">{profile.name}</h3>
          <p className="text-muted-foreground text-sm">{profile.role}</p>
          {profile.company && (
            <p className="text-sm mt-1">{profile.company}</p>
          )}
          
          {isMentor && 'expertise' in profile && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {(profile as Mentor).expertise.slice(0, 3).map(skill => (
                <Badge key={skill} variant="secondary" className="text-xs px-2 py-0.5">
                  {skill}
                </Badge>
              ))}
              {'expertise' in profile && profile.expertise.length > 3 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="text-xs px-2 py-0.5 cursor-help">
                        +{profile.expertise.length - 3} more
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-xs">
                        {profile.expertise.slice(3).join(', ')}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          )}
          
          {isMentor && 'rating' in profile && (
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "w-3 h-3 mr-0.5",
                      i < Math.floor((profile as Mentor).rating) 
                        ? "text-amber-500 fill-amber-500" 
                        : "text-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs ml-1">
                {(profile as Mentor).rating.toFixed(1)}
                {(profile as Mentor).reviews && (
                  <span className="text-muted-foreground ml-1">
                    ({(profile as Mentor).reviews} reviews)
                  </span>
                )}
              </span>
            </div>
          )}
        </div>
      </div>

      {profile.bio && (
        <p className="mt-4 text-sm line-clamp-2 text-muted-foreground">{profile.bio}</p>
      )}

      <div className="mt-5 flex gap-2">
        <Button size="sm" className="flex-1 gap-1.5">
          <MessageSquare className="w-4 h-4" />
          <span>Connect</span>
        </Button>
        {isMentor && (
          <Button size="sm" variant="outline" className="flex-1 gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Schedule</span>
          </Button>
        )}
      </div>
    </div>
  );
};
