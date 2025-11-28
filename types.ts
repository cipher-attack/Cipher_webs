export enum Language {
  EN = 'en',
  AM = 'am'
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export type PageView = 'home' | 'projects' | 'tools';

export interface Vulnerability {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  score: number;
  description: string;
  affected: string;
  date: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
}
