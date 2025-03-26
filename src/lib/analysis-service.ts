import { AnalysisResponse } from '@/types/analysis';

export class AnalysisError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AnalysisError';
  }
}

export async function analyzeStartup(idea: string): Promise<AnalysisResponse> {
  try {
    const response = await fetch('http://localhost:8000/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idea }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new AnalysisError(error.detail || 'Failed to analyze startup idea');
    }

    const data = await response.json();
    return data as AnalysisResponse;
  } catch (error) {
    if (error instanceof AnalysisError) {
      throw error;
    }
    throw new AnalysisError('Failed to connect to analysis service');
  }
} 