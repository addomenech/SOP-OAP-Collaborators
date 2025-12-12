import { LucideIcon } from 'lucide-react';

export enum PhaseType {
  STANDARD = 'STANDARD',
  TRANSVERSAL = 'TRANSVERSAL',
  MONTHLY = 'MONTHLY'
}

export interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
  details?: string[];
  templates?: string[];
}

export interface Step {
  id: string;
  title: string;
  trigger?: string;
  description?: string;
  actionItems: Task[];
  outputs: string[];
}

export interface Phase {
  id: string;
  number: string;
  title: string;
  type: PhaseType;
  icon: LucideIcon;
  color: string;
  steps: Step[];
}

export type ViewMode = 'DASHBOARD' | 'DETAILS';