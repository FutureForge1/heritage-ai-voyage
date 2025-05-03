
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  category: "traditional" | "opera" | "crafts" | "festival" | "general";
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
