
// Custom type definitions for our database tables
// These complement the types in src/integrations/supabase/types.ts

export type HeritageItem = {
  id: string;
  title: string;
  subtitle?: string;
  type: string;
  description: string;
  long_description?: string;
  cover_image?: string;
  history?: string;
  regions?: string[];
  status?: string;
  created_at?: string;
}

export type HeritageImage = {
  id: string;
  heritage_id: string;
  image_url: string;
  description?: string;
  created_at?: string;
}

export type HeritageRepresentative = {
  id: string;
  heritage_id: string;
  name: string;
  title?: string;
  description?: string;
  image_url?: string;
  created_at?: string;
}

export type HeritageVideo = {
  id: string;
  heritage_id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
  created_at?: string;
}

export type Profile = {
  id: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  created_at?: string;
}

export type CommunityPost = {
  id: string;
  author_id: string;
  content: string;
  type: string;
  likes_count?: number;
  comments_count?: number;
  created_at?: string;
  author?: Profile; // Join with profiles
  images?: PostImage[]; // Join with post_images
  tags?: PostTag[]; // Join with post_tags
}

export type PostImage = {
  id: string;
  post_id: string;
  image_url: string;
  created_at?: string;
}

export type PostTag = {
  id: string;
  post_id: string;
  tag: string;
  created_at?: string;
}
