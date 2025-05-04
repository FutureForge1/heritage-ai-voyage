
import { supabase } from "@/integrations/supabase/client";
import { HeritageItem, HeritageImage, HeritageRepresentative, HeritageVideo } from "@/types/database";

// Fetch all heritage items
export const getAllHeritageItems = async (): Promise<HeritageItem[]> => {
  const { data, error } = await supabase
    .from('heritage_items')
    .select('*');

  if (error) {
    console.error("Error fetching heritage items:", error);
    return [];
  }

  return data as HeritageItem[];
}

// Fetch a single heritage item by ID with all related data
export const getHeritageItemById = async (id: string): Promise<{
  item: HeritageItem | null;
  images: HeritageImage[];
  representatives: HeritageRepresentative[];
  videos: HeritageVideo[];
}> => {
  // Fetch the main item
  const { data: item, error: itemError } = await supabase
    .from('heritage_items')
    .select('*')
    .eq('id', id)
    .single();

  if (itemError) {
    console.error("Error fetching heritage item:", itemError);
    return { item: null, images: [], representatives: [], videos: [] };
  }

  // Fetch related images
  const { data: images, error: imagesError } = await supabase
    .from('heritage_images')
    .select('*')
    .eq('heritage_id', id);

  if (imagesError) {
    console.error("Error fetching heritage images:", imagesError);
  }

  // Fetch related representatives
  const { data: representatives, error: representativesError } = await supabase
    .from('heritage_representatives')
    .select('*')
    .eq('heritage_id', id);

  if (representativesError) {
    console.error("Error fetching heritage representatives:", representativesError);
  }

  // Fetch related videos
  const { data: videos, error: videosError } = await supabase
    .from('heritage_videos')
    .select('*')
    .eq('heritage_id', id);

  if (videosError) {
    console.error("Error fetching heritage videos:", videosError);
  }

  return {
    item: item as HeritageItem,
    images: images as HeritageImage[] || [],
    representatives: representatives as HeritageRepresentative[] || [],
    videos: videos as HeritageVideo[] || []
  };
}

// Get heritage items by type
export const getHeritageItemsByType = async (type: string): Promise<HeritageItem[]> => {
  const { data, error } = await supabase
    .from('heritage_items')
    .select('*')
    .eq('type', type);

  if (error) {
    console.error(`Error fetching heritage items of type ${type}:`, error);
    return [];
  }

  return data as HeritageItem[];
}

// Search heritage items
export const searchHeritageItems = async (query: string): Promise<HeritageItem[]> => {
  const { data, error } = await supabase
    .from('heritage_items')
    .select('*')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`);

  if (error) {
    console.error(`Error searching heritage items:`, error);
    return [];
  }

  return data as HeritageItem[];
}
