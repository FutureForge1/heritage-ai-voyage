
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  category: "traditional" | "opera" | "crafts" | "festival" | "general";
  relatedQuestions?: string[]; // IDs of related questions
  knowledgePoints?: string[]; // Related knowledge points
  learningResources?: {
    title: string;
    type: "article" | "video" | "image";
    url: string;
  }[];
}

export interface QuizMode {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  questionCount: number;
  timeLimit: number;
  difficulty: "easy" | "medium" | "hard" | "mixed";
  rewards: {
    points: number;
    badges?: string[];
    special?: string;
  };
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar?: string;
  score: number;
  badges: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  unlocked: boolean;
}

export interface KnowledgeNode {
  id: string;
  title: string;
  category: string;
  description: string;
  connections: string[]; // IDs of connected knowledge nodes
  imageUrl?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  nodes: string[]; // IDs of knowledge nodes in this path
  difficulty: "beginner" | "intermediate" | "advanced";
}
