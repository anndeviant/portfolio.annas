import type {
  EducationRow,
  EventRow,
  PortfolioData,
  ProfileRow,
  ProjectRow,
  WorkExperienceRow,
} from "../types/database";

export const fallbackProfile: ProfileRow = {
  id: "00000000-0000-0000-0000-000000000001",
  created_at: "2026-06-11T00:00:00.000000+00:00",
  name: "Fallback Profile",
  initials: "FB",
  url: null,
  location: "Fallback Location",
  location_link: null,
  descriptions: "Fallback Hero Data",
  summary:
    "This hero content is fallback data because Supabase credentials are missing, the request failed, or the profiles table returned no row.",
  avatar_url: null,
  contact: {
    email: "fallback@example.com",
  },
  skills: "Fallback,No Supabase,Demo Data",
};

export const fallbackProjects: ProjectRow[] = [
  {
    id: 1,
    created_at: "2026-06-11T00:00:00.000000+00:00",
    title: "Fallback Project",
    active: "true",
    description:
      "This single project card is fallback data. If Supabase projects are fetched successfully, this card should disappear.",
    href: null,
    dates: "Fallback",
    technologies: "Fallback,Project,Demo",
    image_url: null,
    video_url: null,
    links: null,
    profile_id: fallbackProfile.id,
  },
];

export const fallbackWorkExperience: WorkExperienceRow[] = [
  {
    id: 1,
    created_at: "2026-06-11T00:00:00.000000+00:00",
    company: "Fallback Work Experience",
    title: "Fallback Timeline Role",
    location: "Fallback",
    logo_url: null,
    href: null,
    start_date: "Fallback",
    end_date: "Now",
    description:
      "- This work item is fallback data because Supabase work_experience returned no usable rows.\n- Replace or fix Supabase data to make this item disappear.",
    badge: "Fallback",
    profile_id: fallbackProfile.id,
  },
];

export const fallbackEducation: EducationRow[] = [
  {
    id: 1,
    created_at: "2026-06-11T00:00:00.000000+00:00",
    school: "Fallback Education",
    degree: "Fallback Degree",
    logo_url: null,
    href: null,
    start_date: "Fallback",
    end_date: "Now",
    profile_id: fallbackProfile.id,
  },
];

export const fallbackEvents: EventRow[] = [
  {
    id: 1,
    created_at: "2026-06-11T00:00:00.000000+00:00",
    profile_id: fallbackProfile.id,
    title: "Fallback Event",
    event_type: "Fallback",
    description:
      "This single event card is fallback data. If Supabase events are fetched successfully, this card should disappear.",
    display_date: "Fallback",
    image_url: null,
    sort_order: 1,
  },
];

export const fallbackPortfolioData: PortfolioData = {
  profile: fallbackProfile,
  projects: fallbackProjects,
  workExperience: fallbackWorkExperience,
  education: fallbackEducation,
  events: fallbackEvents,
};
