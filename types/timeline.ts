export type TimelineType =
  | "education"
  | "experience"
  | "certification"
  | "program"
  | "project";

export interface TimelineItem {
  id: string;

  title: string;
  organization: string;

  type: TimelineType;

  startDate?: string;
  endDate?: string;

  description: string;

  technologies?: string[];
  certificateIds?: string[];

  current?: boolean;
}