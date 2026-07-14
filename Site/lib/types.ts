export type ImageRecord = {
  file: string;
  path: string;
  work_id: string | null;
  subject: string;
  event: string | null;
  year: string | null;
  credit: string | null;
  source: string | null;
  rights: string | null;
  width: number | null;
  height: number | null;
  long_edge: number | null;
  capture_date: string | null;
  hero: boolean;
  confidence: string | null;
  status: string;
  tags: string[];
  notes: string | null;
};

export type WorkRecord = {
  work_id: string;
  title: string;
  aka: string | null;
  type: string;
  year_start: string | null;
  year_end: string | null;
  status: string;
  materials: string | null;
  dimensions: string | null;
  event: string | null;
  interaction: string | null;
  fire_system: string | null;
  crew_model: string | null;
  ritual: string | null;
  motifs: string[];
  themes: string | null;
  description: string;
  image_count: number;
  hero_images: string[];
  sources: string[];
  confidence: string;
};

export type Manifest = {
  archive: string;
  generated: string;
  stats: {
    total_images: number;
    local_files: number;
    hero_shots: number;
    high_res_2000plus: number;
    works: number;
    rights_breakdown: Record<string, number>;
    top_tags: Record<string, number>;
  };
  works: WorkRecord[];
  images: ImageRecord[];
};
