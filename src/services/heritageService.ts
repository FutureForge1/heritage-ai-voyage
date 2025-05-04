
import { HeritageItem, HeritageImage, HeritageRepresentative, HeritageVideo } from "@/types/database";

// Mock data for heritage items
const mockHeritageItems: HeritageItem[] = [
  {
    id: "1",
    title: "京剧",
    subtitle: "中国国粹艺术",
    type: "传统艺术",
    description: "京剧是中国五大戏曲剧种之一，被誉为"国粹"。",
    long_description: "京剧是中国五大戏曲剧种之一，被誉为"国粹"。京剧形成于1840年前后，它融合了西皮、二黄等地方戏曲，经过一代又一代艺术家的努力，不断发展、完善，逐渐成为中国最有影响的戏曲剧种。京剧音乐以西皮、二黄为主，伴奏乐器主要有京胡、月琴、三弦、笛子、唢呐等。京剧表演主要有唱、念、做、打四种功夫，行当有生、旦、净、丑等。",
    cover_image: "https://i.pravatar.cc/600?img=50",
    history: "京剧的前身是流行于中国安徽、湖北一带的徽班。清乾隆五十五年（1790年），著名的三庆、四喜、春台、和春等四大徽班进入北京，与来自湖北的汉调艺人合作，同时吸收了昆曲、秦腔等艺术养分，逐渐形成了京剧。",
    regions: ["北京", "全国"],
    status: "国家级非物质文化遗产",
    created_at: "2025-01-01T00:00:00Z"
  },
  {
    id: "2",
    title: "景泰蓝",
    subtitle: "北京传统工艺",
    type: "传统技艺",
    description: "景泰蓝是中国著名的传统金属工艺品，主要用铜胎掐丝，填充彩釉烧制而成。",
    long_description: "景泰蓝是中国著名的传统金属工艺品，主要用铜胎掐丝，填充彩釉烧制而成。因为在明代景泰年间（1450-1456年）盛行，并且成品以蓝色为主，所以得名"景泰蓝"。它是北京的市花，以其精美的造型、华丽的色彩和精湛的工艺而闻名于世。",
    cover_image: "https://i.pravatar.cc/600?img=51",
    history: "景泰蓝的制作工艺源于元代，成熟于明代，在清代达到鼎盛。明景泰年间，宫廷大规模制作蓝色釉料的珐琅器，因此得名"景泰蓝"。",
    regions: ["北京"],
    status: "国家级非物质文化遗产",
    created_at: "2025-01-02T00:00:00Z"
  },
  {
    id: "3",
    title: "昆曲",
    subtitle: "百戏之祖",
    type: "戏曲",
    description: "昆曲是中国古老的戏曲艺术形式之一，被誉为"百戏之祖"。",
    long_description: "昆曲是中国古老的戏曲艺术形式之一，被誉为"百戏之祖"。它起源于明代中期的江苏昆山，至今已有600多年的历史。昆曲以其细腻婉转的声腔、典雅精致的表演和丰富的文学内涵著称于世。2001年，昆曲被联合国教科文组织列入"人类口述和非物质遗产代表作"名录。",
    cover_image: "https://i.pravatar.cc/600?img=52",
    history: "昆曲起源于元末明初的江苏昆山地区，由魏良辅改良发展而成。明代万历年间，昆曲传入北京宫廷，成为当时最流行的戏曲剧种。",
    regions: ["江苏", "浙江", "全国"],
    status: "世界非物质文化遗产",
    created_at: "2025-01-03T00:00:00Z"
  }
];

// Mock data for heritage images
const mockHeritageImages: Record<string, HeritageImage[]> = {
  "1": [
    {
      id: "img1",
      heritage_id: "1",
      image_url: "https://i.pravatar.cc/600?img=53",
      description: "京剧表演场景",
      created_at: "2025-01-01T00:00:00Z"
    },
    {
      id: "img2",
      heritage_id: "1",
      image_url: "https://i.pravatar.cc/600?img=54",
      description: "京剧演员妆容",
      created_at: "2025-01-01T00:00:00Z"
    }
  ],
  "2": [
    {
      id: "img3",
      heritage_id: "2",
      image_url: "https://i.pravatar.cc/600?img=55",
      description: "景泰蓝工艺品",
      created_at: "2025-01-02T00:00:00Z"
    }
  ],
  "3": [
    {
      id: "img4",
      heritage_id: "3",
      image_url: "https://i.pravatar.cc/600?img=56",
      description: "昆曲表演",
      created_at: "2025-01-03T00:00:00Z"
    }
  ]
};

// Mock data for heritage representatives
const mockHeritageRepresentatives: Record<string, HeritageRepresentative[]> = {
  "1": [
    {
      id: "rep1",
      heritage_id: "1",
      name: "梅兰芳",
      title: "京剧大师",
      description: "京剧旦角表演艺术家，中国京剧表演艺术的一代宗师。",
      image_url: "https://i.pravatar.cc/300?img=60",
      created_at: "2025-01-01T00:00:00Z"
    },
    {
      id: "rep2",
      heritage_id: "1",
      name: "程砚秋",
      title: "四大名旦之一",
      description: "中国京剧旦角表演艺术家，"四大名旦"之一。",
      image_url: "https://i.pravatar.cc/300?img=61",
      created_at: "2025-01-01T00:00:00Z"
    }
  ],
  "2": [
    {
      id: "rep3",
      heritage_id: "2",
      name: "张世林",
      title: "景泰蓝非遗传承人",
      description: "国家级非物质文化遗产景泰蓝制作技艺代表性传承人。",
      image_url: "https://i.pravatar.cc/300?img=62",
      created_at: "2025-01-02T00:00:00Z"
    }
  ],
  "3": [
    {
      id: "rep4",
      heritage_id: "3",
      name: "张继青",
      title: "昆曲艺术家",
      description: "著名昆曲表演艺术家，国家级非物质文化遗产昆曲代表性传承人。",
      image_url: "https://i.pravatar.cc/300?img=63",
      created_at: "2025-01-03T00:00:00Z"
    }
  ]
};

// Mock data for heritage videos
const mockHeritageVideos: Record<string, HeritageVideo[]> = {
  "1": [
    {
      id: "vid1",
      heritage_id: "1",
      title: "京剧《贵妃醉酒》选段",
      description: "梅兰芳先生演绎的经典京剧片段。",
      url: "https://example.com/video1.mp4",
      thumbnail: "https://i.pravatar.cc/600?img=70",
      created_at: "2025-01-01T00:00:00Z"
    }
  ],
  "2": [
    {
      id: "vid2",
      heritage_id: "2",
      title: "景泰蓝制作工艺",
      description: "传统景泰蓝制作工艺完整展示。",
      url: "https://example.com/video2.mp4",
      thumbnail: "https://i.pravatar.cc/600?img=71",
      created_at: "2025-01-02T00:00:00Z"
    }
  ],
  "3": [
    {
      id: "vid3",
      heritage_id: "3",
      title: "昆曲《牡丹亭》",
      description: "经典昆曲《牡丹亭》选段表演。",
      url: "https://example.com/video3.mp4",
      thumbnail: "https://i.pravatar.cc/600?img=72",
      created_at: "2025-01-03T00:00:00Z"
    }
  ]
};

// Fetch all heritage items
export const getAllHeritageItems = async (): Promise<HeritageItem[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockHeritageItems;
}

// Fetch a single heritage item by ID with all related data
export const getHeritageItemById = async (id: string): Promise<{
  item: HeritageItem | null;
  images: HeritageImage[];
  representatives: HeritageRepresentative[];
  videos: HeritageVideo[];
}> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const item = mockHeritageItems.find(item => item.id === id) || null;
  const images = mockHeritageImages[id] || [];
  const representatives = mockHeritageRepresentatives[id] || [];
  const videos = mockHeritageVideos[id] || [];
  
  return { item, images, representatives, videos };
}

// Get heritage items by type
export const getHeritageItemsByType = async (type: string): Promise<HeritageItem[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockHeritageItems.filter(item => item.type === type);
}

// Search heritage items
export const searchHeritageItems = async (query: string): Promise<HeritageItem[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const lowerQuery = query.toLowerCase();
  return mockHeritageItems.filter(item => 
    item.title.toLowerCase().includes(lowerQuery) || 
    item.description.toLowerCase().includes(lowerQuery)
  );
}
