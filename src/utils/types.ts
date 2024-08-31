export interface Link {
    id: string;
    original: string;
    short: string;
    created_at: string;
    updated_at: string;
    tags?: { id: string; name: string }[];
  }