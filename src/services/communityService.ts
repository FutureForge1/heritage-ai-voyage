
import { supabase } from "@/integrations/supabase/client";
import { CommunityPost, Profile, PostImage, PostTag } from "@/types/database";

// Fetch all community posts with author info and images
export const getAllPosts = async (): Promise<CommunityPost[]> => {
  const { data, error } = await supabase
    .from('community_posts')
    .select(`
      *,
      author:profiles(*),
      images:post_images(*),
      tags:post_tags(*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching community posts:", error);
    return [];
  }

  return data as unknown as CommunityPost[];
}

// Fetch posts by type
export const getPostsByType = async (type: string): Promise<CommunityPost[]> => {
  const { data, error } = await supabase
    .from('community_posts')
    .select(`
      *,
      author:profiles(*),
      images:post_images(*),
      tags:post_tags(*)
    `)
    .eq('type', type)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching ${type} posts:`, error);
    return [];
  }

  return data as unknown as CommunityPost[];
}

// Fetch a single post by ID
export const getPostById = async (id: string): Promise<CommunityPost | null> => {
  const { data, error } = await supabase
    .from('community_posts')
    .select(`
      *,
      author:profiles(*),
      images:post_images(*),
      tags:post_tags(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  return data as unknown as CommunityPost;
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
