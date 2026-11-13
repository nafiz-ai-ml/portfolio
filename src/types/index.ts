export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string;
  isExternal: boolean;
}

export interface ProjectIconConfig {
  type: 'image' | 'monogram';
  imageSrc?: string;
  monogramText?: string;
  bgVariant: 'off-white' | 'dark' | 'brand';
  alt: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  communityContext?: string;
  status: 'live' | 'in-development' | 'agency';
  statusLabel: string;
  url?: string;
  isExternal: boolean;
  tags: string[];
  images: string[];
  icon: ProjectIconConfig;
}

export interface JourneyMilestone {
  phase: string;
  title: string;
  status: 'solidified' | 'active' | 'in-progress' | 'roadmap';
  statusLabel: string;
  description: string;
  technologies: string[];
}

export interface FactItem {
  label: string;
  value: string;
  source: string;
}

export interface SiteConfig {
  name: string;
  nameBengali: string;
  title: string;
  tagline: string;
  subTagline: string;
  location: string;
  domain: string;
  socials: SocialLink[];
  stats: Array<{ value: string; label: string; detail: string }>;
  techStack: string[];
  projects: ProjectItem[];
  journey: {
    introStatement: string;
    milestones: JourneyMilestone[];
  };
  about: {
    bio: string;
    statement: string;
    facts: FactItem[];
  };
}

