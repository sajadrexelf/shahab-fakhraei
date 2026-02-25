import { openDB, DBSchema, IDBPDatabase } from 'idb';

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  pillar: string;
  tags: string[];
  author: string;
  publishedAt: number;
  status: 'draft' | 'published';
  featuredImage: string;
  seoTitle: string;
  seoDescription: string;
}

export interface Podcast {
  id: string;
  title: string;
  slug: string;
  description: string;
  audioUrl: string;
  duration: string;
  publishedAt: number;
  status: 'draft' | 'published';
  featuredImage: string;
}

export interface Video {
  id: string;
  title: string;
  slug: string;
  description: string;
  videoUrl: string;
  publishedAt: number;
  status: 'draft' | 'published';
  featuredImage: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  createdAt: number;
}

export interface SiteSettings {
  id: string; // 'global'
  primaryColor: string;
  fontFamily: string;
  heroTitle: string;
  heroSubtitle: string;
  showTestimonials: boolean;
  showFAQ: boolean;
}

interface AcademyDB extends DBSchema {
  articles: {
    key: string;
    value: Article;
    indexes: { 'by-slug': string; 'by-pillar': string; 'by-status': string };
  };
  podcasts: {
    key: string;
    value: Podcast;
    indexes: { 'by-slug': string; 'by-status': string };
  };
  videos: {
    key: string;
    value: Video;
    indexes: { 'by-slug': string; 'by-status': string };
  };
  leads: {
    key: string;
    value: Lead;
  };
  settings: {
    key: string;
    value: SiteSettings;
  };
}

let dbPromise: Promise<IDBPDatabase<AcademyDB>>;

export async function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<AcademyDB>('academy-db', 1, {
      upgrade(db) {
        const articleStore = db.createObjectStore('articles', { keyPath: 'id' });
        articleStore.createIndex('by-slug', 'slug', { unique: true });
        articleStore.createIndex('by-pillar', 'pillar');
        articleStore.createIndex('by-status', 'status');

        const podcastStore = db.createObjectStore('podcasts', { keyPath: 'id' });
        podcastStore.createIndex('by-slug', 'slug', { unique: true });
        podcastStore.createIndex('by-status', 'status');

        const videoStore = db.createObjectStore('videos', { keyPath: 'id' });
        videoStore.createIndex('by-slug', 'slug', { unique: true });
        videoStore.createIndex('by-status', 'status');

        db.createObjectStore('leads', { keyPath: 'id' });
        db.createObjectStore('settings', { keyPath: 'id' });
      },
    });
  }
  return dbPromise;
}
