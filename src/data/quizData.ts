
import { QuizQuestion, QuizMode, LeaderboardUser, Achievement } from "@/types/quiz";
import { Award, Clock3, Trophy, Star } from "lucide-react";

// Sample quiz questions
export const questions: QuizQuestion[] = [
  {
    id: "q1",
    question: "中国剪纸被列入联合国教科文组织的哪一项名录？",
    options: ["世界文化遗产", "人类非物质文化遗产代表作名录", "濒危语言名录", "世界记忆名录"],
    correctAnswer: 1,
    explanation: "中国剪纸于2009年被列入联合国教科文组织\"人类非物质文化遗产代表作名录\"。",
    difficulty: "easy",
    category: "crafts"
  },
  {
    id: "q2",
    question: "下列哪个不是京剧的\"四大名旦\"之一？",
    options: ["梅兰芳", "程砚秋", "尚小云", "李玉茹"],
    correctAnswer: 3,
    explanation: "京剧四大名旦是指梅兰芳、荀慧生、程砚秋和尚小云。李玉茹不在其中。",
    difficulty: "medium",
    category: "opera"
  },
  {
    id: "q3",
    question: "中国古代\"四大发明\"不包括以下哪一项？",
    options: ["指南针", "火药", "造纸术", "丝绸"],
    correctAnswer: 3,
    explanation: "中国古代四大发明是指造纸术、印刷术、火药和指南针，不包括丝绸。",
    difficulty: "easy",
    category: "general"
  },
  {
    id: "q4",
    question: "苏州园林与北京园林的主要风格差异是什么？",
    options: ["大小不同", "南方讲究精致雅致，北方讲究宏伟气势", "建筑材料不同", "历史长短不同"],
    correctAnswer: 1,
    explanation: "苏州园林属于江南园林，讲究精致雅致；北京园林属于北方园林，讲究宏伟气势。",
    difficulty: "medium",
    category: "traditional"
  },
  {
    id: "q5",
    question: "昆曲被称为什么？",
    options: ["百戏之祖", "戏曲之花", "国粹", "东方芭蕾"],
    correctAnswer: 0,
    explanation: "昆曲被誉为\"百戏之祖\"，是中国最古老的戏曲剧种之一。",
    difficulty: "medium",
    category: "opera"
  },
  {
    id: "q6",
    question: "端午节最初是为了纪念哪位历史人物？",
    options: ["孔子", "屈原", "岳飞", "关羽"],
    correctAnswer: 1,
    explanation: "端午节最初是为了纪念战国时期楚国诗人屈原。",
    difficulty: "easy",
    category: "festival"
  },
  {
    id: "q7",
    question: "中国四大名绣不包括以下哪一种？",
    options: ["苏绣", "湘绣", "粤绣", "蜀绣"],
    correctAnswer: 2,
    explanation: "中国四大名绣是指苏绣（江苏）、湘绣（湖南）、蜀绣（四川）和京绣（北京），不包括粤绣。",
    difficulty: "hard",
    category: "crafts"
  },
  {
    id: "q8",
    question: "五代十国时期的南唐后主是谁？",
    options: ["李煜", "李白", "李清照", "李世民"],
    correctAnswer: 0,
    explanation: "李煜是五代十国时期南唐的后主，也是著名的词人。",
    difficulty: "hard",
    category: "general"
  },
  {
    id: "q9",
    question: "中国传统乐器二胡的共鸣箱通常使用什么材料制作？",
    options: ["木材", "竹子", "蟒蛇皮", "牛角"],
    correctAnswer: 2,
    explanation: "传统二胡的共鸣箱通常使用蟒蛇皮蒙面，这赋予了二胡特有的音色。",
    difficulty: "medium",
    category: "traditional"
  },
  {
    id: "q10",
    question: "\"梁祝\"是哪种乐器的代表性曲目？",
    options: ["古筝", "二胡", "笛子", "琵琶"],
    correctAnswer: 1,
    explanation: "\"梁祝\"小提琴协奏曲是由中国作曲家何占豪、陈钢根据民间传说《梁山伯与祝英台》创作的，是二胡的代表性曲目之一。",
    difficulty: "medium",
    category: "traditional"
  }
];

// Quiz modes
export const quizModes: QuizMode[] = [
  {
    id: "daily",
    name: "每日挑战",
    description: "每天5题，测试你的非遗知识",
    icon: Award,
    questionCount: 5,
    timeLimit: 30,
    difficulty: "mixed",
    rewards: {
      points: 100,
      badges: ["日常学习者"]
    }
  },
  {
    id: "quick",
    name: "闪电问答",
    description: "10题快速回答，时间有限",
    icon: Clock3,
    questionCount: 10,
    timeLimit: 15,
    difficulty: "easy",
    rewards: {
      points: 150,
      badges: ["反应迅速"]
    }
  },
  {
    id: "master",
    name: "非遗大师赛",
    description: "15道高难度题目，考验专业知识",
    icon: Trophy,
    questionCount: 15,
    timeLimit: 45,
    difficulty: "hard",
    rewards: {
      points: 300,
      badges: ["非遗专家"],
      special: "大师徽章"
    }
  },
  {
    id: "season",
    name: "文化之星季赛",
    description: "参与季度挑战，争夺文化之星称号",
    icon: Star,
    questionCount: 20,
    timeLimit: 30,
    difficulty: "mixed",
    rewards: {
      points: 500,
      special: "季度奖杯"
    }
  }
];

export const leaderboard: LeaderboardUser[] = [
  {
    rank: 1,
    name: "文化小达人",
    avatar: "/lovable-uploads/e6dab9a5-cae6-4e3b-ba66-e09d7f040f5b.png",
    score: 980,
    badges: ["非遗达人", "知识王", "传统音乐"]
  },
  {
    rank: 2,
    name: "非遗爱好者",
    avatar: "/lovable-uploads/872d313c-206d-42ef-9521-8793ba6f5366.png",
    score: 920,
    badges: ["戏曲专家", "书法大师"]
  },
  {
    rank: 3,
    name: "文化保护者",
    avatar: "/lovable-uploads/b2ecc6f9-f820-4bf5-866e-07ea8f1f90a5.png",
    score: 850,
    badges: ["季度冠军"]
  },
  {
    rank: 4,
    name: "剪纸艺术家",
    score: 780,
    badges: ["工艺达人"]
  },
  {
    rank: 5,
    name: "戏曲爱好者",
    score: 750,
    badges: ["京剧迷"]
  }
];

export const achievements: Achievement[] = [
  {
    id: "ach1",
    name: "初学者",
    description: "完成第一次竞答",
    icon: "🌱",
    progress: 1,
    total: 1,
    unlocked: true
  },
  {
    id: "ach2",
    name: "知识积累者",
    description: "完成10次竞答",
    icon: "📚",
    progress: 4,
    total: 10,
    unlocked: false
  },
  {
    id: "ach3",
    name: "连胜达人",
    description: "获得5题连续正确",
    icon: "🔥",
    progress: 3,
    total: 5,
    unlocked: false
  },
  {
    id: "ach4",
    name: "非遗专家",
    description: "在大师赛中获得90%以上的正确率",
    icon: "🏆",
    progress: 0,
    total: 1,
    unlocked: false
  },
  {
    id: "ach5",
    name: "全能文化大使",
    description: "在所有类别中至少完成一次满分",
    icon: "👑",
    progress: 2,
    total: 5,
    unlocked: false
  }
];
