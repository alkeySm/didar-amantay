export type LangCode =
  | "kk"
  | "en"
  | "fr"
  | "de"
  | "ru"
  | "zh"
  | "ko"
  | "tr"
  | "ka"
  | "mn"
  | "uz"
  | "ar"
  | "sah"
  | "ky";

export type GenreSlug =
  | "angime_novella"
  | "povester"
  | "romandar"
  | "piesalar"
  | "kosemsoz"
  | "esseler"
  | "olender"
  | "kinoscenariyler"
  | "korkem_filmder"
  | "derekti_filmder"
  | "telehabarlar";

export interface BookItem {
  id: number;
  slug: string;
  year: number;
  publisher: string;
  isbn?: string | null;
  pages?: number | null;
  genre: string;
  cover_url?: string | null;
  cover_color: string;
  pdf_url?: string | null;
  is_featured: boolean;
  is_new: boolean;
  available_languages: string[];
  title_kk: string;
  subtitle_kk: string;
  description_kk: string;
  excerpt_kk: string;
  title_ru: string;
  description_ru: string;
  title_en: string;
  description_en: string;
  translations: Record<string, { title?: string; subtitle?: string; description?: string; excerpt?: string }>;
  created_at: string;
}

export interface WorkItem {
  id: number;
  genre: GenreSlug | string;
  year?: number | null;
  is_new: boolean;
  available_languages: string[];
  title_kk: string;
  summary_kk: string;
  content_kk: string;
  title_ru: string;
  summary_ru: string;
  title_en: string;
  summary_en: string;
  translations: Record<string, { title?: string; summary?: string; content?: string }>;
  external_url?: string | null;
  created_at: string;
}

export interface QuoteItem {
  id: number;
  category: "oi" | "metafora";
  text_kk: string;
  text_ru: string;
  text_en: string;
  source_kk: string;
  translations: Record<string, { text?: string; source?: string }>;
}

export interface PodcastItem {
  id: number;
  episode_number: number;
  title_kk: string;
  title_ru: string;
  title_en: string;
  description_kk: string;
  video_url: string;
  duration: string;
  published_date: string;
}

export interface GalleryEntry {
  id: number;
  image_url: string;
  caption_kk: string;
  caption_ru: string;
  caption_en: string;
  year?: string | null;
  category: string;
}

export interface ReviewItem {
  id: number;
  author_name: string;
  author_role?: string | null;
  book_title?: string | null;
  rating: number;
  content: string;
  is_approved: boolean;
  created_at: string;
}

export interface SiteOverview {
  books: BookItem[];
  works: WorkItem[];
  quotes: QuoteItem[];
  podcasts: PodcastItem[];
  gallery: GalleryEntry[];
  reviews: ReviewItem[];
  stats: {
    books_count: number;
    works_count: number;
    languages_count: number;
    genres_count: number;
  };
}
