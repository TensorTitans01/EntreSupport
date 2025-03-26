
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TreeNode {
  id: string;
  title: string;
  content?: string;
  children?: TreeNode[];
}

interface ChatTreeNodeProps {
  node: TreeNode;
  level?: number;
  isExpanded?: boolean;
}

export const ChatTreeNode: React.FC<ChatTreeNodeProps> = ({ 
  node, 
  level = 0,
  isExpanded = false
}) => {
  const [expanded, setExpanded] = useState(isExpanded);
  const hasChildren = node.children && node.children.length > 0;
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="text-sm">
      <div 
        className={cn(
          "flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 cursor-pointer",
          expanded && hasChildren && "bg-muted/30"
        )}
        onClick={toggleExpand}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        {hasChildren ? (
          expanded ? (
            <ChevronDown className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
          )
        ) : (
          <div className="w-4" />
        )}
        
        <div className="flex-1">
          <div className="font-medium">{node.title}</div>
          {(expanded || !hasChildren) && node.content && (
            <div className="mt-1 text-muted-foreground">{node.content}</div>
          )}
        </div>
      </div>
      
      {expanded && hasChildren && (
        <div className="pl-2">
          {node.children?.map((child) => (
            <ChatTreeNode 
              key={child.id} 
              node={child} 
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
