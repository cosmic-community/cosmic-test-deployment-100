export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name: string;
    bio?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    twitter?: string;
  };
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
    color?: string;
  };
}

export interface BlogPost extends CosmicObject {
  type: 'blog-posts';
  metadata: {
    content: string;
    excerpt?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    categories?: Category[];
    published_date?: string;
    is_featured?: boolean;
    read_time?: number;
  };
}

// Helper function for error handling
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}