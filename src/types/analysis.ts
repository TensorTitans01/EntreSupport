import { ReactNode } from 'react';

export interface MarketResearch {
  competitors: Array<{
    name: string;
    description: string;
    strengths: string[];
  }>;
  trends: string[];
  marketSize: {
    value: string;
    year: number;
    cagr: string;
  };
  sources: string[];
}

export interface TeamResource {
  role: string;
  description: string;
  keySkills: string[];
  estimatedSalary: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface AnalysisResponse {
  marketResearch: MarketResearch;
  teamResources: TeamResource[];
  swotAnalysis: SwotAnalysis;
}

export interface Message {
  id: string;
  type: 'user' | 'system' | 'agent' | 'error';
  content: ReactNode;
  timestamp: Date;
  status: 'loading' | 'complete' | 'error';
} 