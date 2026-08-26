export type ProjectCategory =
  | "Commercial"
  | "Narrative"
  | "Music Video"
  | "Fashion"
  | "Documentary";

export interface Credit {
  role: string;
  name: string;
}

export interface TechnicalSpec {
  camera?: string;
  lenses?: string;
  aspectRatio: string;
  format?: string;
  colorist?: string;
  location?: string;
  fps?: string;
  shutter?: string;
  iso?: string;
}

export interface Still {
  url: string;
  caption: string;
  aspectRatio?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: number;
  duration: string;
  aspectRatio: string; // e.g. "2.39:1", "16:9", "4:3"
  role: string;
  tagline: string;
  synopsis: string;
  story: string;
  heroVideo: string;
  previewVideo: string;
  posterImage: string;
  featured: boolean;
  featuredOrder?: number;
  awards?: string[];
  specs: TechnicalSpec;
  credits: Credit[];
  stills: Still[];
  btsPhotos?: Still[];
}

export interface Award {
  year: number;
  festival: string;
  award: string;
  project: string;
}

export interface Representation {
  region: string;
  agency: string;
  contactName: string;
  email: string;
  location: string;
}

export interface DirectorProfile {
  name: string;
  title: string;
  location: string;
  availability: string;
  showreelUrl: string;
  showreelPoster: string;
  heroStatement: string;
  statement: string;
  longBio: string[];
  portraitUrl: string;
  studioImageUrl: string;
  clients: { name: string; category: string }[];
  awards: Award[];
  representation: Representation[];
  services: string[];
  socials: { name: string; url: string; handle: string }[];
  contactEmail: string;
  phone?: string;
}
