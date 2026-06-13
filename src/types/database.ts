export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type TableDefinition<Row> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
  Relationships: [];
};

export interface ProfileRow {
  id: string;
  created_at: string;
  name: string | null;
  initials: string | null;
  url: string | null;
  location: string | null;
  location_link: string | null;
  descriptions: string | null;
  summary: string | null;
  avatar_url: string | null;
  contact: Json | null;
  skills: string | null;
} 

export interface ProjectRow {
  id: number;
  created_at: string;
  title: string | null;
  active: string | null;
  description: string | null;
  href: string | null;
  dates: string | null;
  technologies: string | null;
  image_url: string | null;
  video_url: string | null;
  links: Json | null;
  profile_id: string | null;
}

export interface WorkExperienceRow {
  id: number;
  created_at: string;
  company: string | null;
  title: string | null;
  location: string | null;
  logo_url: string | null;
  href: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  badge: string | null;
  profile_id: string | null;
}

export interface EducationRow {
  id: number;
  created_at: string;
  school: string | null;
  degree: string | null;
  logo_url: string | null;
  href: string | null;
  start_date: string | null;
  end_date: string | null;
  profile_id: string | null;
}

export interface EventRow {
  id: number;
  created_at: string;
  profile_id: string | null;
  title: string;
  event_type: string | null;
  description: string | null;
  display_date: string | null;
  image_url: string | null;
  sort_order: number | null;
}

export type PortfolioData = {
  profile: ProfileRow;
  projects: ProjectRow[];
  workExperience: WorkExperienceRow[];
  education: EducationRow[];
  events: EventRow[];
};

export interface Database {
  public: {
    Tables: {
      profiles: TableDefinition<ProfileRow>;
      projects: TableDefinition<ProjectRow>;
      work_experience: TableDefinition<WorkExperienceRow>;
      education: TableDefinition<EducationRow>;
      events: TableDefinition<EventRow>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
