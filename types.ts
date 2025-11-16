
export interface ReportData {
  title: string;
  subtitle: string;
  dateRange: string;
  introduction: Section;
  days: Day[];
  conclusion: SectionWithPoints;
  recommendations: SectionWithPoints;
}

export interface Section {
  title: string;
  paragraphs: string[];
}

export interface Day {
  dayNumber: string;
  date: string;
  title: string;
  activities: Activity[];
}

export interface Activity {
  title: string;
  description: string;
  points?: string[];
  subsections?: Subsection[];
}

export interface Subsection {
  title: string;
  points: string[];
}

export interface SectionWithPoints {
  title: string;
  points: string[];
}
