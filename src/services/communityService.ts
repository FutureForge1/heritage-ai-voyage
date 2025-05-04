
import { CommunityPost, Profile, PostImage, PostTag } from "@/types/database";

// Mock data for community posts
const mockPosts: CommunityPost[] = [
  {
    id: "1",
    author_id: "user1",
    content: "分享了一个关于京剧的故事，感谢大家的支持和喜爱！",
    type: "heritage",
    likes_count: 24,
    comments_count: 5,
    created_at: "2025-05-01T10:30:00Z",
    author: {
      id: "user1",
      username: "文化爱好者",
      avatar_url: "https://i.pravatar.cc/150?img=1",
      bio: "热爱传统文化"
    },
    images: [
      {
        id: "img1",
        post_id: "1",
        image_url: "https://i.pravatar.cc/300?img=20",
        created_at: "2025-05-01T10:30:00Z"
      }
    ],
    tags: [
      {
        id: "tag1",
        post_id: "1",
        tag: "京剧",
        created_at: "2025-05-01T10:30:00Z"
      },
      {
        id: "tag2",
        post_id: "1",
        tag: "传统文化",
        created_at: "2025-05-01T10:30:00Z"
      }
    ]
  },
  {
    id: "2",
    author_id: "user2",
    content: "今天完成了一幅传统山水画，灵感来自于黄山的云海。",
    type: "art",
    likes_count: 42,
    comments_count: 12,
    created_at: "2025-05-02T15:20:00Z",
    author: {
      id: "user2",
      username: "山水画家",
      avatar_url: "https://i.pravatar.cc/150?img=2", 
      bio: "专注传统山水画创作"
    },
    images: [
      {
        id: "img2",
        post_id: "2",
        image_url: "https://i.pravatar.cc/300?img=30",
        created_at: "2025-05-02T15:20:00Z"
      },
      {
        id: "img3",
        post_id: "2",
        image_url: "https://i.pravatar.cc/300?img=31",
        created_at: "2025-05-02T15:20:00Z"
      }
    ],
    tags: [
      {
        id: "tag3",
        post_id: "2",
        tag: "山水画",
        created_at: "2025-05-02T15:20:00Z"
      }
    ]
  },
  {
    id: "3",
    author_id: "user3",
    content: "非遗文化节即将在下周举行，有兴趣参加的朋友们可以报名啦！",
    type: "discussion",
    likes_count: 18,
    comments_count: 7,
    created_at: "2025-05-03T09:45:00Z",
    author: {
      id: "user3",
      username: "文化活动组织者",
      avatar_url: "https://i.pravatar.cc/150?img=3",
      bio: "致力于传统文化推广"
    },
    images: [],
    tags: [
      {
        id: "tag4",
        post_id: "3",
        tag: "活动",
        created_at: "2025-05-03T09:45:00Z"
      },
      {
        id: "tag5",
        post_id: "3",
        tag: "非遗文化",
        created_at: "2025-05-03T09:45:00Z"
      }
    ]
  }
];

// Fetch all community posts with author info and images
export const getAllPosts = async (): Promise<CommunityPost[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPosts;
}

// Fetch posts by type
export const getPostsByType = async (type: string): Promise<CommunityPost[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPosts.filter(post => post.type === type);
}

// Fetch a single post by ID
export const getPostById = async (id: string): Promise<CommunityPost | null> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const post = mockPosts.find(post => post.id === id);
  return post || null;
}

// Get user profile by ID
export const getUserProfile = async (userId: string): Promise<Profile | null> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const post = mockPosts.find(post => post.author_id === userId);
  return post?.author || null;
}
