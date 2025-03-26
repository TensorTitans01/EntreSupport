
// Basic user information
export interface User {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  company?: string;
  industry?: string;
  experience?: number;
  skills?: string[];
  bio?: string;
}

// Mentor specific information
export interface Mentor extends User {
  expertise: string[];
  availability: string;
  rating: number;
  reviews?: number;
}

// Knowledge article information
export interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
  summary: string;
  imageUrl?: string;
}

// Networking event information
export interface NetworkingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  attendees: number;
  category: string;
  imageUrl?: string;
}

// Feature information for feature showcase
export interface Feature {
  title: string;
  description: string;
  icon: string;
}
