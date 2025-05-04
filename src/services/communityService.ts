
import { supabase } from "@/integrations/supabase/client";
import { CommunityPost, Profile, PostImage, PostTag } from "@/types/database";

// Fetch all community posts with author info and images
export const getAllPosts = async (): Promise<CommunityPost[]> => {
  const { data, error } = await supabase
    .from('community_posts')
    .select(`
      *,
      profiles!author_id(*)
    `);

  if (error) {
    console.error("Error fetching community posts:", error);
    return [];
  }
  
  // Add additional data through separate queries
  const posts = data as unknown as CommunityPost[];

  // Get images for each post
  for (const post of posts) {
    // Get images
    const { data: images } = await supabase
      .from('post_images')
      .select('*')
      .eq('post_id', post.id);
      
    // Get tags
    const { data: tags } = await supabase
      .from('post_tags')
      .select('*')
      .eq('post_id', post.id);
      
    post.images = images as PostImage[];
    post.tags = tags as PostTag[];
  }

  return posts;
}

// Fetch posts by type
export const getPostsByType = async (type: string): Promise<CommunityPost[]> => {
  const { data, error } = await supabase
    .from('community_posts')
    .select(`
      *,
      profiles!author_id(*)
    `)
    .eq('type', type);

  if (error) {
    console.error(`Error fetching ${type} posts:`, error);
    return [];
  }
  
  // Add additional data through separate queries
  const posts = data as unknown as CommunityPost[];

  // Get images for each post
  for (const post of posts) {
    // Get images
    const { data: images } = await supabase
      .from('post_images')
      .select('*')
      .eq('post_id', post.id);
      
    // Get tags
    const { data: tags } = await supabase
      .from('post_tags')
      .select('*')
      .eq('post_id', post.id);
      
    post.images = images as PostImage[];
    post.tags = tags as PostTag[];
  }

  return posts;
}

// Fetch a single post by ID
export const getPostById = async (id: string): Promise<CommunityPost | null> => {
  const { data, error } = await supabase
    .from('community_posts')
    .select(`
      *,
      profiles!author_id(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }
  
  const post = data as unknown as CommunityPost;
  
  // Get images
  const { data: images } = await supabase
    .from('post_images')
    .select('*')
    .eq('post_id', post.id);
  
  // Get tags
  const { data: tags } = await supabase
    .from('post_tags')
    .select('*')
    .eq('post_id', post.id);
  
  post.images = images as PostImage[];
  post.tags = tags as PostTag[];

  return post;
}

// Get user profile by ID
export const getUserProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return data as Profile;
}
